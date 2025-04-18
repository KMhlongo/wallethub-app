import { useState } from "react";
import { Logo } from '../../elements/Logo';
import { useSyncProviders } from "../../hooks/useSyncProviders";
import { CloseButton } from "../../elements/close-button";
import { useWallet, WalletContext } from "../../context/wallet-context"
import { formatAddress } from "../../utils/format-utils";
import { useLocation, useNavigate } from "react-router";
import NavBarLink from "../../elements/navlink";

function Navbar() {

    const {address, connect} = useWallet();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    // const [selectedWallet, setSelectedWallet] = useState<EIP1193ProviderDetail>();
    // const [address, setAddress] = useState<String>();
    const providers = useSyncProviders();
    const navigate = useNavigate();
    const location = useLocation();

    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        const newAddress = await connect(providerWithInfo);
        navigate(`/dashboard?walletAddress=${newAddress}`);
    }

    return(
        <div className="px-4 py-6 flex items-center ">
            <div className="w-12 h-12 mr-2">
                <Logo />
            </div>
            <span className="text-2xl ">wallethub</span>
            <div className="flex pl-20">
                <NavBarLink destination="/home" 
                            isActive={location.pathname === "/home"}>
                    home
                </NavBarLink>
                <NavBarLink destination="/dashboard" 
                            isActive={location.pathname === "/dashboard"}
                            srch={address ? `?walletAddress=${address}` : ''}>
                    dashboard
                </NavBarLink>
                <NavBarLink destination="/swap" 
                            isActive={location.pathname === "/swap"}>
                    swap
                </NavBarLink>
            </div>
            <div className="ml-auto">
                <button onClick={() => {setModalOpen(true)}}
                        className="opacity-60 hover:opacity-100">
                    {address ? formatAddress(address) : "Connect"}
                </button>
                {isModalOpen && 
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
                        onClick={() => {setModalOpen(false)}}>
                        <div className="bg-black p-4 rounded-lg shadow-lg flex flex-col max-w-sm w-full" 
                            onClick={(e) => {e.stopPropagation()}}>
                            <div className="flex">
                                <span className="text-lg mb-6">
                                    Connect Detected Wallet
                                </span>
                                <div className="ml-auto opacity-60 hover:opacity-100 hover:cursor-pointer"
                                    onClick={() => {setModalOpen(false)}}> 
                                    <CloseButton />
                                </div>
                            </div>
                            {providers?.map((provider: EIP6963ProviderDetail) => (
                                <div key={provider.info.uuid} className="flex items-center rounded-lg bg-button-black opacity-60 hover:opacity-100 hover:cursor-pointer mb-2"
                                    onClick={() => {handleConnect(provider); setModalOpen(false);}}>
                                    <div className="h-16 w-16 flex items-center justify-center">
                                        <img className="h-8 w-8" src={provider.info.icon} alt={provider.info.name}/>
                                    </div>
                                    <h2>{provider.info.name}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;