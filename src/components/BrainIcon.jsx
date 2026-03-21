export default function BrainIcon({ className, color = "#0D7FF2" }) {
  return (
    <svg 
      width="72" 
      height="72" 
      viewBox="0 0 72 72" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M36 12C30.2 12 25.5 16.7 25.5 22.5V24C24.2 23.4 22.8 23 21.3 23C16.1 23 12 27.1 12 32.3C12 35.4 13.5 38.2 15.8 39.9C14.7 41.6 14 43.6 14 45.8C14 51.9 18.9 56.8 25 56.8H30.5C33.5 56.8 36 54.3 36 51.3V12Z"
        fill={color}
      />
      <path
        d="M36 12C41.8 12 46.5 16.7 46.5 22.5V24C47.8 23.4 49.2 23 50.7 23C55.9 23 60 27.1 60 32.3C60 35.4 58.5 38.2 56.2 39.9C57.3 41.6 58 43.6 58 45.8C58 51.9 53.1 56.8 47 56.8H41.5C38.5 56.8 36 54.3 36 51.3V12Z"
        fill={color}
      />
      <path
        d="M36 20V49"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M27 27C29.5 27 31.5 29 31.5 31.5C31.5 34 29.5 36 27 36"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M45 27C42.5 27 40.5 29 40.5 31.5C40.5 34 42.5 36 45 36"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M26.5 43C29 43 31 45 31 47.5C31 50 29 52 26.5 52"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M45.5 43C43 43 41 45 41 47.5C41 50 43 52 45.5 52"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}
