import AppLogoIcon from "../../components/AppLogoIcon";

export default function Header({ user, onLogout }) {
  return (
    <header className="h-24 flex items-center justify-between border-b border-slate-100 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0D7FF2] flex items-center justify-center shadow-lg shadow-blue-200">
          <AppLogoIcon className="w-6 h-6" color="white" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">Easy PC</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center text-xl">⚙️</button>
        
        {/* FOTO DE PERFIL DEL USUARIO */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
          <img 
            src={user?.photoURL || "https://api.dicebear.com/9.x/adventurer/svg?seed=Explorer"} 
            alt="Perfil" 
            className="w-12 h-12 rounded-full border-2 border-blue-100 shadow-sm"
          />
          <button
            className="w-12 h-12 rounded-full bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center justify-center shadow-sm"
            onClick={onLogout}
            title="Cerrar sesión"
          >
            ⎋
          </button>
        </div>
      </div>
    </header>
  );
}
