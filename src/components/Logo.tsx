

export const Logo = ({isDarkMode = false}) => {

    const stroke: string = "#213547";

    return(
        <>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 300 300">
                <ellipse rx="130" ry="130" transform="translate(150 150)" fill="none" stroke={stroke} strokeWidth="6"/>
                <line x1="0" y1="-114.651639" x2="0" y2="114.65164" transform="matrix(1 0 0 0.872207 150 150)" fill="none" stroke={stroke} strokeWidth="6"/>
                <line x1="0" y1="-114.651639" x2="0" y2="114.65164" transform="matrix(-1 0 0 0.611257 121.106557 150)" fill="none" stroke={stroke} strokeWidth="6"/>
                <line x1="0" y1="-114.651639" x2="0" y2="114.65164" transform="matrix(-1 0 0 0.611257 178.278688 150)" fill="none" stroke={stroke} strokeWidth="6"/>
                <line x1="0" y1="-114.651639" x2="0" y2="114.65164" transform="matrix(-1 0 0 0.359246 90.983606 150.000035)" fill="none" stroke={stroke} strokeWidth="6"/>
                <line x1="0" y1="-114.651639" x2="0" y2="114.65164" transform="matrix(-1 0 0 0.359246 210.245901 150.000035)" fill="none" stroke={stroke} strokeWidth="6"/>
            </svg>
        </>
    )

}