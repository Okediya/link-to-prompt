/**
 * Logo.tsx — Futuristic robot-hand / human-hand SVG logo
 *
 * A minimalist vector reinterpretation of Michelangelo's Creation of Adam:
 * a metallic robot hand (left) and a human hand (right) with index fingers
 * nearly touching. Silver lines and highlights on a transparent background.
 */

export default function Logo({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 120 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Link to Prompt logo — robot hand and human hand with fingers nearly touching"
        >
            {/* Metallic gradient definitions */}
            <defs>
                <linearGradient id="silver-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8E8E8" />
                    <stop offset="50%" stopColor="#C0C0C0" />
                    <stop offset="100%" stopColor="#888888" />
                </linearGradient>
                <linearGradient id="robot-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A0A0A0" />
                    <stop offset="40%" stopColor="#D0D0D0" />
                    <stop offset="100%" stopColor="#909090" />
                </linearGradient>
                <linearGradient id="human-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#B0B0B0" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#C8C8C8" />
                </linearGradient>
                {/* Glow effect for the spark between fingers */}
                <radialGradient id="spark-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#C0C0C0" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#808080" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* === ROBOT HAND (left side) === */}
            <g strokeLinecap="round" strokeLinejoin="round">
                {/* Robot forearm — segmented mechanical look */}
                <rect x="4" y="28" width="22" height="10" rx="2" fill="url(#robot-gradient)" stroke="#888" strokeWidth="0.8" />
                <line x1="12" y1="28" x2="12" y2="38" stroke="#777" strokeWidth="0.5" />
                <line x1="18" y1="28" x2="18" y2="38" stroke="#777" strokeWidth="0.5" />

                {/* Robot palm — angular mechanical plate */}
                <path
                    d="M26 26 L38 24 L42 28 L42 38 L38 42 L26 40 Z"
                    fill="url(#robot-gradient)"
                    stroke="#999"
                    strokeWidth="0.8"
                />
                {/* Mechanical joint circles */}
                <circle cx="30" cy="33" r="1.5" fill="#666" stroke="#AAA" strokeWidth="0.5" />
                <circle cx="36" cy="33" r="1.2" fill="#666" stroke="#AAA" strokeWidth="0.5" />

                {/* Robot pinky */}
                <path d="M28 40 L27 46 L29 47" fill="none" stroke="url(#silver-gradient)" strokeWidth="1.4" />
                {/* Robot ring finger */}
                <path d="M32 41 L31 48 L33 49" fill="none" stroke="url(#silver-gradient)" strokeWidth="1.4" />
                {/* Robot middle finger */}
                <path d="M36 41.5 L36 49 L38 49.5" fill="none" stroke="url(#silver-gradient)" strokeWidth="1.4" />

                {/* Robot index finger — extended, reaching right */}
                <path
                    d="M42 28 L49 25 L54 24.5"
                    fill="none"
                    stroke="url(#silver-gradient)"
                    strokeWidth="1.6"
                />
                {/* Mechanical joint dots on index finger */}
                <circle cx="46" cy="26.2" r="0.9" fill="#AAA" stroke="#777" strokeWidth="0.4" />
                <circle cx="51" cy="24.8" r="0.7" fill="#AAA" stroke="#777" strokeWidth="0.4" />

                {/* Robot thumb */}
                <path d="M27 26 L23 22 L22 20" fill="none" stroke="url(#silver-gradient)" strokeWidth="1.2" />
            </g>

            {/* === SPARK / GAP between fingers === */}
            <circle cx="60" cy="24" r="4" fill="url(#spark-glow)" />
            <line x1="56" y1="24" x2="58" y2="24" stroke="#FFF" strokeWidth="0.6" strokeOpacity="0.7" />
            <line x1="62" y1="24" x2="64" y2="24" stroke="#FFF" strokeWidth="0.6" strokeOpacity="0.7" />
            <line x1="60" y1="20.5" x2="60" y2="22" stroke="#FFF" strokeWidth="0.4" strokeOpacity="0.5" />
            <line x1="60" y1="26" x2="60" y2="27.5" stroke="#FFF" strokeWidth="0.4" strokeOpacity="0.5" />

            {/* === HUMAN HAND (right side) === */}
            <g strokeLinecap="round" strokeLinejoin="round">
                {/* Human forearm */}
                <path
                    d="M96 28 L116 30 L116 38 L96 40 Z"
                    fill="url(#human-gradient)"
                    stroke="#AAA"
                    strokeWidth="0.6"
                    opacity="0.8"
                />

                {/* Human palm — softer, organic curves */}
                <path
                    d="M80 25 L96 24 L98 28 L98 38 L96 42 L80 42 Z"
                    fill="url(#human-gradient)"
                    stroke="#BBB"
                    strokeWidth="0.7"
                    opacity="0.85"
                />

                {/* Human pinky */}
                <path d="M94 42 L95 47 L93 48" fill="none" stroke="#CCC" strokeWidth="1.3" />
                {/* Human ring finger */}
                <path d="M90 42.5 L90 49 L88 49.5" fill="none" stroke="#CCC" strokeWidth="1.3" />
                {/* Human middle finger */}
                <path d="M86 42.5 L85 50 L83 50" fill="none" stroke="#CCC" strokeWidth="1.3" />

                {/* Human index finger — extended, reaching left */}
                <path
                    d="M80 25 L73 24 L66 23.5"
                    fill="none"
                    stroke="url(#human-gradient)"
                    strokeWidth="1.6"
                />

                {/* Human thumb */}
                <path d="M95 25 L99 21 L100 19" fill="none" stroke="#CCC" strokeWidth="1.2" />
            </g>
        </svg>
    );
}
