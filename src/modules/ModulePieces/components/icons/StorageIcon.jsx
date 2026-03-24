export default function StorageIcon({ className, color = "#0D7FF2" }) {
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
        d="M8 16C8 13.8 8.78333 11.9167 10.35 10.35C11.9167 8.78333 13.8 8 16 8H56C58.2 8 60.0833 8.78333 61.65 10.35C63.2167 11.9167 64 13.8 64 16V24H8V16ZM8 32V56C8 58.2 8.78333 60.0833 10.35 61.65C11.9167 63.2167 13.8 64 16 64H56C58.2 64 60.0833 63.2167 61.65 61.65C63.2167 60.0833 64 58.2 64 56V32H8ZM16 40H32V48H16V40ZM40 40H56V48H40V40Z" 
        fill={color}
      />
    </svg>
  );
}
