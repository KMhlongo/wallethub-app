import './animatedBackground.css'

export default function AnimatedBackground() {
    return(
        <div className="fixed top-0 left-0 w-full h-full blur-3xl opacity-70 z-0" style={{ zIndex: -1 }}>
            <div className="blob"></div>
            <div className="blob"></div>
            <div className="blob"></div>
        </div>
    )
}