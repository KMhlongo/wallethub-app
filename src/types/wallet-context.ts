export interface WalletContextType {  
    selectedWallet?: EIP6963ProviderDetail;
    address?: string;
    setSelectedWallet: (wallet: EIP6963ProviderDetail | undefined) => void;
    setAddress: (address: string | undefined) => void;
    connect: (provider: EIP6963ProviderDetail) => Promise<string | undefined>;
}