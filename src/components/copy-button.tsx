import { useState } from "react";

function CopyButton({value}: {value: string}) {

    const [showCopied, setShowCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 2000);
    }

    return(
        <div className="hover:cursor-pointer relative">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1.75" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                className="lucide lucide-clipboard stroke-white transition-colors opacity-40 hover:opacity-100"
                onClick={handleCopy}
            >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            </svg>
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-button-black rounded-md px-2 py-1 text-sm text-white 
                                transition-all duration-600 ease-in-out ${showCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    Copied!
                </div>
        </div>
    )
}

export default CopyButton;