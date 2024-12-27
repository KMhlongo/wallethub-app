import { useState } from "react";
import { formatDollarBalance } from "../utils/format-utils";
import TokenDetail from "./TokenDetail";


function TokenItem({token}) {

    const [detailOpened, setDetailOpened] = useState<boolean>(false);
    const [tokenDetailsData, setTokenDetailsData] = useState({});

    const handleOpenTokenDetail = () => {
        setDetailOpened(!detailOpened);
    }

    const fetchTokenDetails = () => {
        setTokenDetailsData({volume: 'some random value',            
            performance: 'some performance data'})
    }

    return(
        <>
            <div className="border">
                <div className="flex flex-row p-4 items-center hover:cursor-pointer" onClick={handleOpenTokenDetail}>
                    <img src={token.logo} className="w-8 h-8"></img>
                    <div className="flex flex-row ml-4 items-stretch">
                        <p className="w-48 text-left truncate">{token.name}</p>
                        <p className="w-96 text-left truncate" >{token.token_address}</p>
                        <p className="w-24 text-left truncate">{token.balance_formatted}</p>
                        <p className="w-24 text-left truncate">${formatDollarBalance(token.usd_value)}</p>
                    </div>
                    <div className="ml-auto">
                        <svg data-accordion-icon className={`w-3 h-3  shrink-0 ${!detailOpened ? `rotate-180` : ``}`} aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                        </svg>
                    </div>
                </div>
                {detailOpened ? 
                    <TokenDetail tokenDetailsData={tokenDetailsData} />
                    : ''}
            </div>
        </>
    )

}

export default TokenItem;