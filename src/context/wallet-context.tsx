import { createContext, useContext, useState } from "react";
import { WalletContextType } from "../types/wallet-context";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children } : {children: ReactNode}) {

    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
    const [address, setAddress] = useState<string>();

    const connect = async (providerWithInfo: EIP6963ProviderDetail) => {
        try {
            const accounts = await providerWithInfo.provider.request({
                method: "eth_requestAccounts"
            }) as string[];
            setSelectedWallet(providerWithInfo);
            setAddress(accounts?.[0]);
            return accounts?.[0];
        } catch(error) {
            console.log(error);
            return undefined;
        }
    };
    
    return(
        <WalletContext.Provider value={{
            selectedWallet,
            address,
            setSelectedWallet,
            setAddress,
            connect
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        return new Error("useWallet not used inside WalletProvider");
    }
    return context;
}