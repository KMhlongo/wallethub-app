import { useState } from "react";
import ChevronDown from "../elements/chevron-down";
import { CloseButton } from "../elements/close-button";
import { formatAddress } from "../utils/format-utils";

function TokenSelect({selectedToken ,onTokenSelect, supportedTokens}) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    return(
        <>
            <div onClick={() => {setModalOpen(true)}}
                className="flex p-2 px-4 border border-accent-border rounded-xl 
                    opacity-60 hover:opacity-100 hover:cursor-pointer max-h-fit">
                <span className="mr-2">
                    {selectedToken?.symbol || 'Select Token'}
                </span>
                <ChevronDown />
            </div>
            {isModalOpen && 
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center rounded-lg" 
                onClick={() => {setModalOpen(false)}}>
                <div className="bg-black rounded-lg shadow-lg flex flex-col max-w-sm w-full"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="flex px-4 pt-4">
                        <span className="text-lg mb-4">
                            Select Token
                        </span>
                        <div className="ml-auto opacity-60 hover:opacity-100 hover:cursor-pointer"
                            onClick={() => {setModalOpen(false)}}> 
                            <CloseButton />
                        </div>
                    </div>
                    {supportedTokens?.map((token) => (
                        <div key={token.name} className="flex flex-col opacity-60 hover:opacity-100 p-4 hover:bg-button-black hover:bg-opacity-60"
                            onClick={() => {
                                onTokenSelect(token);
                                setModalOpen(false);
                            }}>
                            <span className="text-lg">{token.name}</span>
                            <div>
                                <span className="mr-2">{token.symbol}</span>
                                <span>{formatAddress(token.address)}</span>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
            }
        </>
    )

}

export default TokenSelect;