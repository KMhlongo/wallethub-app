import { useState } from "react";
import { useSyncProviders } from "../hooks/useSyncProviders";

export const DiscoverWalletProviders = ({handleDetectedWallet}: {handleDetectedWallet: (wallet: string) => void}) => {
    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
    const providers = useSyncProviders();

    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        try {
            const accounts = await providerWithInfo.provider.request({
                method: "eth_requestAccounts"
              }) as string[];
            // console.log(`user account is: ${accounts?.[0]}`)
            // console.log(`providerWithInfo: ${providerWithInfo.info.name}`)
              setSelectedWallet(providerWithInfo)
              handleDetectedWallet(accounts?.[0])
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
          <div>
            {
              providers.length > 0 ? 
              <div className="flex items-center">
              <p className="text-sm p-2">Connect using Wallet Providers</p>
                {providers?.map((provider: EIP6963ProviderDetail) => (
                <button key={provider.info.uuid} onClick={() => handleConnect(provider)} 
                  className={`p-4 rounded-full w-16 h-16`}>
                  <img src={provider.info.icon} alt={provider.info.name} />
                </button>
                ))}
              </div>
               :
                <div className="border py-2 px-4 rounded-full text-sm">
                  No Wallet Providers Connected
                </div>
            }
          </div>
        </>
      )
}