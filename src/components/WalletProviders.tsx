import { useState } from "react"
import { useSyncProviders } from "../hooks/useSyncProviders";

export const WalletProviders = ({setProviderWalletAddress}) => {

    const providers = useSyncProviders();

    const handleConnect = async(providerWithInfo: EIP6963ProviderDetail) => {
        try {
            const accounts = await providerWithInfo.provider.request({
                method: "eth_requestAccounts"
            }) as string[];
            setProviderWalletAddress(accounts?.[0])
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="mt-12">
            {providers.length > 0 && 
                <>
                    <div>
                        connect to wallet providers
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        {providers?.map((provider: EIP6963ProviderDetail) => (
                            <div key={provider.info.uuid} 
                                    onClick={() => {handleConnect(provider)}}
                                    className={`flex flex-col justify-center items-center mx-2 p-4 rounded-full opacity-60 cursor-pointer hover:opacity-100`}
                                    title={provider.info.name}>
                                        <img src={provider.info.icon}
                                            alt={provider.info.name}
                                            className="h-12 w-12"/>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )

}