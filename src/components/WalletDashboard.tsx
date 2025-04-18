import { useState } from "react";
import TokenList from "./TokenList";
import { WalletInfo } from "../types/walletInfo"
import TransactionList from "./TransactionList";
import LoadingSpinner from "../elements/loading-spinner";

function WalletDashboard({walletInfo, changeSelectedChain, isLoading} : {walletInfo?: WalletInfo, changeSelectedChain: any, isLoading: boolean}) {

    const [activeList, setActiveList] = useState<'tokens'|'transactions'>('tokens');
    const [filterString, setFilterString] = useState<string>('');

    if (!walletInfo) return null;

    console.log(`isLoading is set to ${isLoading}`);

    if (isLoading) 
        return <LoadingSpinner />

    return (
        <div className="border border-accent-border rounded-md">
            <div className="flex p-4 mb-4">
                {walletInfo.activeChains?.length === 0 ? 
                    <select disabled className="mr-2 px-2 pr-4 rounded-lg  text-sm">
                        <option>No Active Chains</option>
                    </select> 
                    : 
                    <div className="select-wrapper mr-2 p-2 rounded-lg">
                        <select title="Chain" 
                                className="text-sm focus-visible:outline-none" 
                                onChange={(e) => changeSelectedChain(e)}>
                            {walletInfo.activeChains && walletInfo.activeChains.map((chain) => {
                                return (
                                    <option key={chain.chain_id} 
                                            value={chain.chain_id} 
                                            className="text-sm">
                                        {chain.chain.toLocaleUpperCase()}</option>
                                )
                            })}
                        </select>
                    </div>
                    }
                <button className={`${activeList === 'tokens' ? 
                                        'border-white opacity-100' : 
                                        'opacity-60'
                                    }
                                    text-sm mr-2  hover:opacity-100`
                                    }
                    onClick={() => setActiveList('tokens')}>Tokens</button>
                <button className={`${activeList === 'transactions' ? 
                                        'border-white opacity-100' : 
                                        'opacity-60'
                                    }
                                    text-sm mr-2 hover:opacity-100`
                                }
                    onClick={() => setActiveList('transactions')}>Transactions</button>
                {activeList === "tokens" &&
                    <input placeholder='Token Name / Token Address' 
                            className='border border-accent-border rounded-md py-1 px-4 text-sm w-1/3 ml-auto focus-visible:outline-none' 
                            autoComplete='false'   
                            spellCheck='false' 
                            value={filterString} 
                            onChange={e => setFilterString(e.target.value)}/>}
            </div>
            {activeList === "tokens" ? 
                <TokenList tokens={walletInfo?.tokens} filterString={filterString} isLoading={isLoading}/>
            :   <TransactionList transactions={walletInfo?.transactions}/>}
        </div>
    )

}

export default WalletDashboard;