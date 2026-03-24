export default function ComponentsIcon({ className, color = "#6BCB77" }) {
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
        d="M24 48V24H48V48H24ZM32 40H40V32H32V40ZM24 72V64H16C13.8 64 11.9167 63.2167 10.35 61.65C8.78333 60.0833 8 58.2 8 56V48H0V40H8V32H0V24H8V16C8 13.8 8.78333 11.9167 10.35 10.35C11.9167 8.78333 13.8 8 16 8H24V0H32V8H40V0H48V8H56C58.2 8 60.0833 8.78333 61.65 10.35C63.2167 11.9167 64 13.8 64 16V24H72V32H64V40H72V48H64V56C64 58.2 63.2167 60.0833 61.65 61.65C60.0833 63.2167 58.2 64 56 64H48V72H40V64H32V72H24ZM56 56V16H16V56H56Z" 
        fill={color}
      />
    </svg>
  );
}
