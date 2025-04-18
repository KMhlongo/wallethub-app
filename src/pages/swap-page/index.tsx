import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { useWallet } from "../../context/wallet-context";
import SwapIcon from "../../elements/swap-icon";
import { SwapApi } from "../../api/swap-service";
import TokenSelect from "../../components/token-select";

function SwapPage() {

    const { address } = useWallet();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [swapRequest, setSwapRequest] = useState<any>();
    const [supportedTokens, setSupportedTokens] = useState([]);
    const wallet = useWallet();

    const handleInputToken = (token) => {
        console.log(`handleinputtoken called with token ${JSON.stringify(token)}`);
        setSwapRequest((prev) => ({...prev, 'inputToken': token}));
    }

    const handleOutputToken = (token) => {
        console.log(`handleoutputtoken called with token ${JSON.stringify(token)}`);
        setSwapRequest((prev) => ({...prev, 'outputToken': token}));
    }

    const handleAmountChange = (e) => {
        setSwapRequest((prev) => ({...prev, 'amount': e.target.value}));
    }

    const handleSwapPressed = async() => {
        console.log(`swap request: ${JSON.stringify(swapRequest)}`);
        try {
            const res = await SwapApi.swapTokens(swapRequest);
            console.log(JSON.stringify(res));
        } catch (error) {
            console.log(error);
        }
    }

    const getCommonTokens = async () => {
        try {
            const commonTokens = await SwapApi.getCommonTokens();
            setSupportedTokens(commonTokens);
            console.log('logging res from getCommonTokens on swap page');
            console.log(commonTokens);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getCommonTokens();
    }, [])

    return(
        <div className="flex flex-col min-h-screen">
             <Navbar />
            <div className="flex flex-col flex-grow items-center pt-24">
                <div>
                    <div className="">
                        <div className="flex p-6 border border-accent-border rounded-lg mb-1 min-h-28 items-center">
                            <input
                                type="text" 
                                inputMode="decimal"
                                placeholder="0"
                                className="focus-visible:outline-none bg-transparent text-3xl"
                                onChange={handleAmountChange}
                            />
                            <TokenSelect selectedToken={swapRequest?.inputToken} onTokenSelect={handleInputToken} supportedTokens={supportedTokens}/>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded-lg p-4 border-accent-border bg-dark-bg">
                            <SwapIcon />
                        </div>
                        <div className="flex p-6 border border-accent-border rounded-lg min-h-28 items-center">
                            <input
                                type="text" 
                                inputMode="decimal"
                                placeholder="0"
                                className="focus-visible:outline-none bg-transparent text-3xl"
                            />
                            <TokenSelect selectedToken={swapRequest?.outputToken} onTokenSelect={handleOutputToken} supportedTokens={supportedTokens}/>
                        </div>
                    
                    </div>
                    <div className="mt-4 border-accent-border border p-4 rounded-lg bg-button-black text-center opacity-60 hover:opacity-100 hover:cursor-pointer"
                        onClick={() => {handleSwapPressed();}}>
                        Swap
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SwapPage;