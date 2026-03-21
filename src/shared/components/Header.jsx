import AppLogoIcon from "../../components/AppLogoIcon";
import LogoutIcon from "../../components/LogoutIcon";
import { useState } from "react";

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
          <img 
            src={user?.photoURL || "https://api.dicebear.com/9.x/adventurer/svg?seed=Explorer"} 
            alt="Perfil" 
            className="w-12 h-12 rounded-full border-2 border-blue-100 shadow-sm"
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogoutIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">¿Cerrar sesión?</h3>
            <p className="text-slate-600 text-base">¿Estás seguro que quieres salir de tu cuenta?</p>
          </div>
          
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 px-4 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-300 hover:text-slate-900 hover:shadow-md hover:scale-105 transition-all duration-200"
              onClick={handleCancelLogout}
            >
              No, quiero quedarme
            </button>
            <button
              className="flex-1 py-3 px-4 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 hover:shadow-md hover:scale-105 transition-all duration-200"
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
