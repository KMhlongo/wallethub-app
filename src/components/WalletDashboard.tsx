import { useState } from "react";
import TokenList from "./TokenList";
import { WalletInfo } from "../types/walletInfo"
import TransactionList from "./TransactionList";

function WalletDashboard({walletInfo, changeSelectedChain} : {walletInfo?: WalletInfo, changeSelectedChain: any}) {

    const [activeList, setActiveList] = useState<'tokens'|'transactions'>('tokens');
    const [filterString, setFilterString] = useState<string>('');

    if (!walletInfo) return null;

    return (
        <>
            <div className="flex py-2">
                {walletInfo.activeChains?.length === 0 ? 
                    <select disabled className="mr-2 px-2 pr-4 rounded-lg  text-sm">
                        <option>No Active Chains</option>
                    </select> 
                    : 
                    <select title="Chain" className="mr-2 px-2 pr-4 rounded-lg  text-sm" onChange={(e) => changeSelectedChain(e)}>
                        {walletInfo.activeChains && walletInfo.activeChains.map((chain) => {
                            return (
                                <option key={chain.chain_id} value={chain.chain_id} className="text-sm">{chain.chain.toLocaleUpperCase()}</option>
                            )
                        })}
                    </select>
                    }
                
                <button className={`text-sm mr-2 ${activeList === 'tokens' ? 'border-accent-blue' : ''}`}
                    onClick={() => setActiveList('tokens')}>Tokens</button>
                <button className={`text-sm mr-2 ${activeList === 'transactions' ? 'border-accent-blue' : ''}`}
                    onClick={() => setActiveList('transactions')}>Transactions</button>
                {activeList === "tokens" &&
                    <input placeholder='Token Name / Token Address' className='border rounded-full py-1 px-4 text-sm w-1/3' 
                    autoComplete='false' spellCheck='false' value={filterString} onChange={e => setFilterString(e.target.value)}/>}
            </div>
            {activeList === "tokens" ? 
                <TokenList tokens={walletInfo?.tokens} filterString={filterString}/>
            :   <TransactionList transactions={walletInfo?.transactions} filterString={filterString}/>}
        </>
    )

}

export default WalletDashboard;