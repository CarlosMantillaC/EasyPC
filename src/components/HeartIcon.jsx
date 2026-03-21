export default function HeartIcon({ className, color = "#0D7FF2" }) {
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
        d="M36 64C36 64 8 48 8 28C8 20 14 12 22 12C28 12 33 16 36 20C39 16 44 12 50 12C58 12 64 20 64 28C64 48 36 64 36 64Z" 
        fill={color}
      />
    </svg>
  );
}
