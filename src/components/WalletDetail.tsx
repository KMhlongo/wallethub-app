import { WalletInfo } from "../types/walletInfo";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CopyButton from "../elements/copy-button";
import { formatAddress } from "../utils/format-utils";

function WalletDetail({walletInfo, isLoading} : {walletInfo?: WalletInfo, isLoading: boolean}) {

    if (isLoading) {
        return <></>;
    }

    return(        
        <div>
            <div className="flex py-2 items-center">
                <div className="flex flex-col items-start p-4 rounded">
                    <span className="text-md font-medium opacity-60">Wallet Address</span>
                    {walletInfo &&
                        <div className="flex items-center">
                            <span className="text-lg mr-2">{formatAddress(walletInfo?.address)}</span>
                            {walletInfo?.address &&
                                <CopyButton value={walletInfo?.address} />
                            }
                        </div>
                    }
                </div>
                <div className="flex flex-col ml-6 items-start p-2">
                    <span className="text-md font-medium opacity-60">Balance</span>
                    <span className="text-lg">{walletInfo?.balance}</span>
                </div>
                <div className="flex flex-col ml-6 items-start p-2">
                    <span className="text-md font-medium opacity-60">Net Worth</span>
                    <span className="text-lg">${walletInfo?.netWorth}</span>
                </div>
            </div>
        </div>
    )

}

export default WalletDetail;