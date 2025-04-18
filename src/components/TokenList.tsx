import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { formatAddress, formatDollarBalance } from "../utils/format-utils";
import CopyButton from "../elements/copy-button";

function TokenList({tokens, filterString, isLoading} : {tokens: any, filterString: string, isLoading: boolean}) {
 
    if (!tokens) return null;

    const filteredTokens = filterString?.trim().length === 0 ? 
        tokens : tokens.filter(token => token.name.toLocaleLowerCase().search(filterString.trim().toLocaleLowerCase()) > -1);

    if (filteredTokens.length == 0 || filteredTokens.length == 1 && tokens[0].usd_value == 0) {
        return(
            <div className="flex items-center justify-center pb-4 mb-4">
                <span>No Tokens found.</span> 
            </div>
        )
    }

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
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? 
                            <Skeleton height={20} width='100%' className="my-2 w-full"
                                count={8}/> : 
                            filteredTokens.map(token => {
                                return (
                                    <tr key={token.token_address} className="border-t border-collapse border-accent-border">
                                        <td><img src={token.logo} className="w-6 h-6 ml-auto mr-auto"></img></td>
                                        <td className="text-left truncate w-[15%] py-4">{token.name}</td>
                                        <td className="text-left truncate px-4 w-[35%]">
                                            <div className="flex items-center gap-2">
                                                <span>{formatAddress(token.token_address)}</span>
                                                <CopyButton value={token.token_address} />
                                            </div>
                                        </td>
                                        <td className="text-left truncate px-4 w-[20%]">${token.usd_price}</td>
                                        <td className="text-left truncate px-4 w-[20%]">{token.balance_formatted}</td>
                                        <td className="text-left truncate px-4 w-[20%]">${token.usd_value}</td>
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