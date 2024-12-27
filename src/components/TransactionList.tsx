import { formatBalance } from "../utils/format-utils";

function TransactionList({transactions, filterString}) {

    if (!transactions) return null;


    const filteredTransactions = filterString.trim().length === 0 ? transactions :
        transactions.filter(t => t.hash.toLocaleLowerCase().search(filterString.trim().toLocaleLowerCase()) > -1);

    return (
        <>
            <div className="w-full my-4">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th>Hash</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(t => {
                            return(
                                <tr key={t.hash} className="border-t border-collapse">
                                    <td className="text-left truncate p-2">{t.hash}</td>
                                    <td className="text-left truncate p-2">{t.from_address}</td>
                                    <td className="text-left truncate p-2">{t.to_address}</td>
                                    <td className="text-left truncate p-2">{formatBalance(t.value)}ETH</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default TransactionList;