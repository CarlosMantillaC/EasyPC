import AppLogoIcon from "../../components/AppLogoIcon";
import LogoutIcon from "../../components/LogoutIcon";
import mascotMirador from "../../assets/images/Mascota/mirador.png";
import { useState } from "react";
import UserProfileButton from "./UserProfileButton";

export default function Header({ user, onLogout }) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };
  return (
    <>
    <header className="h-24 flex items-center justify-between border-b border-slate-100 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0D7FF2] flex items-center justify-center shadow-lg shadow-blue-200">
          <AppLogoIcon className="w-6 h-6" color="white" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">Easy PC</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* FOTO DE PERFIL DEL USUARIO */}
        <div className="flex items-center gap-3">
          <UserProfileButton 
            user={user}
            size="large"
            showBorder={true}
            fallbackType="initial"
          />
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors shadow-sm"
            onClick={handleLogoutClick}
            title="Cerrar sesión"
          >
            <LogoutIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>

    {/* DIÁLOGO DE CONFIRMACIÓN PARA CERRAR SESIÓN */}
    {showLogoutDialog && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl border-2 border-slate-100">
          <div className="text-center relative">
            <h3 className="text-2xl font-black text-slate-900 mb-6">¿Ya te vas?</h3>
            
            {/* Globo de texto */}
            <div className="relative bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 mb-4 shadow-sm">
              <p className="text-slate-700 font-bold text-lg leading-tight">
                ¿Estás seguro que quieres salir de tu cuenta?
              </p>
              {/* Colita del globo */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-50 border-r-2 border-b-2 border-slate-200 rotate-45"></div>
            </div>

            {/* Mascota */}
            <div className="w-40 h-40 mx-auto relative z-10 -mb-2">
              <img 
                src={mascotMirador} 
                alt="Mascota EasyPC" 
                className="w-full h-full object-contain drop-shadow-xl"
                onError={(e) => {
                  e.target.src = "https://api.dicebear.com/9.x/bottts/svg?seed=EasyPC";
                }}
              />
            </div>
          </div>
          
          {/* Botones en horizontal */}
          <div className="flex gap-3 relative z-20 mt-4">
            <button
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-all duration-200 text-sm"
              onClick={handleCancelLogout}
            >
              No, me quedo
            </button>
            <button
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-md text-sm"
              onClick={handleConfirmLogout}
            >
              Sí, quiero salir
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
