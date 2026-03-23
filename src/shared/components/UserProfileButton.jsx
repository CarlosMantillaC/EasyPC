import GoogleProfileImage from "./GoogleProfileImage";

export default function UserProfileButton({ 
  user, 
  size = "medium", 
  showBorder = true,
  onClick,
  className = "",
  fallbackType = "initial"
}) {
  // Configuración de tamaños
  const sizeConfig = {
    small: {
      container: "w-8 h-8",
      image: "w-6 h-6",
      border: showBorder ? "border border-blue-100" : ""
    },
    medium: {
      container: "w-10 h-10",
      image: "w-8 h-8", 
      border: showBorder ? "border border-blue-100" : ""
    },
    large: {
      container: "w-12 h-12",
      image: "w-full h-full",
      border: showBorder ? "border-2 border-blue-100" : ""
    }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  return (
    <button
      className={`
        ${config.container} 
        rounded-full 
        bg-[#0D7FF2]/10 
        flex items-center justify-center 
        overflow-hidden 
        ${config.border}
        shadow-sm
        hover:shadow-md
        transition-all
        duration-200
        ${className}
      `}
      type="button"
      onClick={onClick}
      aria-label="Perfil de usuario"
    >
      <GoogleProfileImage 
        user={user}
        className={`${config.image} rounded-full object-cover`}
        fallbackType={fallbackType}
      />
    </button>
  );
}
