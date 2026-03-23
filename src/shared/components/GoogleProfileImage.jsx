import { useState, useEffect } from 'react';

export default function GoogleProfileImage({ 
  user, 
  className = "w-12 h-12", 
  showFallback = true,
  fallbackType = "initial" // "initial" | "avatar" | "icon"
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL);
      setAttempt(0);
    }
  }, [user]);

  const handleImageError = (e) => {
    console.log(`Intento ${attempt + 1} fallido para la imagen de Google`);
    
    if (attempt === 0) {
      // Intento 1: URL directa con timestamp
      const timestamp = Date.now();
      const urlWithTimestamp = `${user.photoURL}?t=${timestamp}`;
      setImageUrl(urlWithTimestamp);
      setAttempt(1);
    } else if (attempt === 1) {
      // Intento 2: URL con diferentes parámetros
      const altUrl = `${user.photoURL.split('?')[0]}?sz=200&size=200`;
      setImageUrl(altUrl);
      setAttempt(2);
    } else if (attempt === 2) {
      // Intento 3: URL de Google Photos directa
      const directUrl = user.photoURL.replace(/=s\d+-c/, '=s200-c');
      setImageUrl(directUrl);
      setAttempt(3);
    } else {
      // Último recurso: según el tipo de fallback
      console.log("Todos los intentos fallaron, usando fallback");
      if (fallbackType === "avatar") {
        setImageUrl("https://api.dicebear.com/9.x/adventurer/svg?seed=Explorer");
      } else {
        setImageUrl(null); // Mostrará el fallback personalizado
      }
    }
  };

  // Si no hay usuario o photoURL, mostrar fallback
  if (!user?.photoURL && showFallback) {
    if (fallbackType === "initial") {
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <span className="text-blue-600 font-bold">
            {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
      );
    } else if (fallbackType === "avatar") {
      return (
        <img
          src="https://api.dicebear.com/9.x/adventurer/svg?seed=Explorer"
          alt="Perfil"
          className={className}
        />
      );
    } else if (fallbackType === "icon") {
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 21a8 8 0 0 0-16 0"
              stroke="#0D7FF2"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="12" cy="8" r="4" stroke="#0D7FF2" strokeWidth="1.6" />
          </svg>
        </div>
      );
    }
  }

  if (!user?.photoURL) {
    return null;
  }

  return (
    <img
      src={imageUrl}
      alt="Perfil"
      className={className}
      onError={handleImageError}
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
}
