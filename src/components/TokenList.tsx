import { useState } from "react";

function TokenList({tokens, filterString} : {tokens: any, filterString: string}) {
    const [tokenDetailOpened, toggleTokenDetail] = useState<boolean>(false); 

    if (!tokens) return null;

    const filteredTokens = filterString?.trim().length === 0 ? 
        tokens : tokens.filter(token => token.name.toLocaleLowerCase().search(filterString.trim().toLocaleLowerCase()) > -1);

    return(
        <>
            <div className="w-full my-4">
               <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="w-[4%] text-sm"></th>
                            <th className="text-left w-[10%] text-sm">Name</th>
                            <th className="text-left px-4 w-[35%] text-sm">Address</th>
                            <th className="text-left px-4 w-[15%] text-sm">Price</th>
                            <th className="text-left px-4 w-[15%] text-sm">Holding</th>
                            <th className="text-left px-4 w-[15%] text-sm">Balance</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTokens.map(token => {
                            return (
                                <tr key={token.token_address} className="border-t border-collapse">
                                    <td><img src={token.logo} className="w-6 h-6 ml-auto mr-auto"></img></td>
                                    <td className="text-left truncate w-[15%] py-4">{token.name}</td>
                                    <td className="text-left truncate px-4 w-[35%]">{token.token_address}</td>
                                    <td className="text-left truncate px-4 w-[20%]">${token.usd_price}</td>
                                    <td className="text-left truncate px-4 w-[20%]">{token.balance_formatted}</td>
                                    <td className="text-left truncate px-4 w-[20%]">${token.usd_value}</td>
                                    <td className="relative">
                                        <button className="border w-fit h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full">
                                            <svg data-accordion-icon className={`w-3 h-3 shrink-0 
                                                 ${!tokenDetailOpened ? `rotate-180` : ``}`} 
                                                aria-hidden="true" 
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
            </div>
        </>
    )

}

export default TokenList;