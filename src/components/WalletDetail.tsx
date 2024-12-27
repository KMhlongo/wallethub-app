import { WalletInfo } from "../types/walletInfo";

function WalletDetail({walletAddress, walletInfo} : {walletAddress: string, walletInfo?: WalletInfo}) {

    if (!walletInfo) return null;

    return(
        <div className="p-2">
            <h2 className="font-semibold text-left">Overview</h2>
            <div className="flex py-2">
                <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Wallet Address</span>
                    <span className="text-sm">{walletAddress}</span>
                </div>
                <div className="flex flex-col ml-6 items-start">
                    <span className="text-sm font-medium">Balance</span>
                    <span className="text-sm">{walletInfo?.balance}</span>
                </div>
            </div>
        </div>
    )

}

export default WalletDetail;