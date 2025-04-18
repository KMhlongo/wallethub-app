import { useSearchParams } from "react-router";
import WalletDetail from "../../components/WalletDetail";
import { useEffect, useState } from "react";
import { WalletInfo } from "../../types/walletInfo";
import { WalletApi } from "../../api/wallet-hub-service";
import { formatEthersBalance } from "../../utils/format-utils";
import WalletDashboard from "../../components/WalletDashboard";
import Navbar from "../../components/navbar";
import LoadingSpinner from "../../elements/loading-spinner";

function DashBoardPage() {

    const [searchParams] = useSearchParams();
    const [walletAddress, setProviderWalletAddress] = useState<string>('');
    const [walletInfo, setWalletInfo] = useState<WalletInfo>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function changeSelectedChain(e: any) {
        console.log(`selected chain ${e.target.value}`);
        setWalletInfo(prev => prev ? {...prev, selectedChain: e.target.value} : undefined);
        const chain_id = e.target.value;
        if (walletInfo?.address) {
            try {
                const [
                    balanceResponse,
                    tokensResponse,
                    transactionsResponse,
                    netWorthResponse,
                ] = await Promise.all([
                    WalletApi.getWalletBalance(walletInfo.address, chain_id),
                    WalletApi.getWalletTokens(walletInfo.address, chain_id),
                    WalletApi.getWalletTransactions(walletInfo.address, chain_id),
                    WalletApi.getWalletNetWorth(walletInfo.address, chain_id),
                ])
                setWalletInfo(prev => prev ? {
                    ...prev,
                    balance: formatEthersBalance(balanceResponse.balance),
                    tokens: tokensResponse.result,
                    transactions: transactionsResponse.result,
                    netWorth: netWorthResponse.chains[0].networth_usd,
                }: undefined)
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function getWalletInfo() {
        setIsLoading(true);
        const address = searchParams.get("walletAddress") as string;
        try {
            const [
                balanceResponse,
                tokenResponse,
                transactionsResponse,
                activeChainsResponse,
                netWorthResponse,
            ] = await Promise.all([
                WalletApi.getWalletBalance(address),
                WalletApi.getWalletTokens(address),
                WalletApi.getWalletTransactions(address),
                WalletApi.getActiveChains(address),
                WalletApi.getWalletNetWorth(address),
            ]);
            setWalletInfo({
                address: address,
                tokens: tokenResponse.result, 
                transactions: transactionsResponse.result, 
                balance: formatEthersBalance(balanceResponse.balance),
                activeChains: activeChainsResponse,
                netWorth: netWorthResponse.chains[0].networth_usd,
            })
        } catch (error) {
            console.log(error);
            setWalletInfo(undefined);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
            getWalletInfo()
        }, 
        [searchParams]
    )

    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {isLoading ?  
                <LoadingSpinner /> :
                <div className="">
                    <div className="p-2 py-4"> 
                        <input type="text" 
                                name="walletAddress"
                                placeholder="Search for Wallet Address" 
                                autoComplete='false'
                                spellCheck='false'
                                className={`w-1/3 rounded-md border border-accent-border py-1 px-4 text-md focus-visible:outline-none`}
                                // value={inputAddress}
                                // onChange={(e) => {setInputAddress(e.target.value)}}
                                    />
                    </div>
                    <div className="">
                        <WalletDetail walletInfo={walletInfo} isLoading={isLoading}/>
                    </div>
                    <div className="p-2 mt-2">
                        <WalletDashboard walletInfo={walletInfo} changeSelectedChain={changeSelectedChain} isLoading={isLoading}/>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default DashBoardPage;