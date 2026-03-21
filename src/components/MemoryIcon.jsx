export default function MemoryIcon({ className, color = "#0D7FF2" }) {
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
        d="M8 8V64H64V8H8ZM16 16H56V56H16V16ZM24 24V32H32V24H24ZM40 24V32H48V24H40ZM24 40V48H32V40H24ZM40 40V48H48V40H40Z" 
        fill={color}
      />
    </svg>
  );
}
