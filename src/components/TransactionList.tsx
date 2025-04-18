import { formatAddress, formatBalance } from "../utils/format-utils";
import CopyButton from "../elements/copy-button";
import { formatDistanceToNow } from 'date-fns';

function TransactionList({transactions}) {

    if (!transactions) return null;

    return (
        <>
            <div className="w-full my-4">
                {transactions.length == 0 ? 
                    <div className="flex items-center justify-center pb-4">
                        <span>No Transactions found.</span> 
                    </div>
                : 
                    <table className="w-full table-auto max-w-full">
                        <thead>
                            <tr>
                                <th className="text-sm text-left pl-4">Hash</th>
                                <th className="text-sm text-left pl-4">Age</th>
                                <th className="text-sm text-left pl-4">From</th>
                                <th className="text-sm text-left pl-4">To</th>
                                <th className="text-sm text-left pl-4">Value</th> 
                                <th className="text-sm text-left pl-4">Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => {
                                return(
                                    <tr key={t.hash} className="border-t border-collapse border-accent-border py-4 hover:bg-button-black">
                                        <td className="text-left p-4 max-w-28">
                                            <div className="flex items-center gap-2">
                                                <p className="truncate">{t.hash}</p>
                                                <CopyButton value={t.hash} />
                                            </div>
                                        </td>
                                        <td className="text-left truncate p-4 max-w-28">{formatDistanceToNow(t.block_timestamp)}</td>
                                        <td className="text-left p-4 max-w-28 ">
                                            <div className="flex items-center gap-2">
                                                <p className="truncate">{t.from_address_label || t.from_address}</p>
                                                <CopyButton value={t.from_address} />
                                            </div>
                                        </td>
                                        <td className="text-left p-4  max-w-28 ">
                                            <div className="flex items-center gap-2">
                                                <p className="truncate">{t.to_address_label || t.to_address}</p>
                                                <CopyButton value={t.from_address} />
                                            </div>
                                        </td>
                                        <td className="text-left truncate p-4">{formatBalance(t.value)}ETH</td>
                                        <td className="text-left truncate p-4">{formatBalance(t.transaction_fee, 10)}ETH</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )

}

export default TransactionList;