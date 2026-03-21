export default function LogoutIcon({ className, color = "currentColor" }) {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L21 13L17 9V7Z" 
        fill={color}
      />
      <path 
        d="M5 5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H12V19H5V5Z" 
        fill={color}
      />
    </svg>
  );
}
