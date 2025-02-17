import { useNavigate } from "react-router";
import AnimatedBackground from "../../components/animatedBackground";
import { Logo } from "../../components/Logo";
import { FormEvent, FormEventHandler, useState } from "react";
import { WalletProviders } from "../../components/WalletProviders";
import Navbar from "../../components/navbar";

function LandingPage() {

    const [inputAddress, setInputAddress] = useState<string>('');
    const navigate = useNavigate();

    const setProviderWalletAddress = (address: string) => {
        navigate(`/dashboard?walletAddress=${address}`)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const address = formData.get("walletAddress");
        console.log(`wallet address = ${address}`);
        navigate(`/dashboard?walletAddress=${address}`)
    } 

    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <AnimatedBackground />
            <div className="flex flex-col items-stretch justify-center pt-36">
                <div className="flex items-center justify-center">
                    <div className="text-2xl mt-12 w-1/2 text-center opacity-90">
                        Explore your crypto portfolio across multiple chains 
                        with a comprehensive view of all your tokens and transactions in one place
                    </div>
                </div>
                <div className="mt-12">
                    <div>
                        <form onSubmit={handleSubmit} className="flex w-full justify-center items-center">
                            <input type="text" 
                                    name="walletAddress"
                                    placeholder="Search For Wallet Address" 
                                    autoComplete='false'
                                    spellCheck='false'
                                    className={`w-1/2 rounded-lg border py-2 px-6 text-lg focus-visible:outline-none border-accent-border`}
                                    value={inputAddress}
                                    onChange={(e) => {setInputAddress(e.target.value)}}
                            />
                            <button type="submit" className="rounded-full flex ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.3-4.3"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    {/* <WalletProviders setProviderWalletAddress={setProviderWalletAddress}/> */}
                </div>
            </div>
        </div>  
    )
}

export default LandingPage;