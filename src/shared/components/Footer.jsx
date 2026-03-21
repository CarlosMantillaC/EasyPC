import AppLogoIcon from "../../components/AppLogoIcon";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3 grayscale opacity-50 font-bold text-slate-600">
        <AppLogoIcon className="w-5 h-5" color="#94a3b8" />
        <span>© 2026 Easy PC</span>
      </div>
      <div className="flex gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
        <a href="#" className="hover:text-blue-500 transition-colors">Ayuda</a>
        <a href="#" className="hover:text-blue-500 transition-colors">Privacidad</a>
        <a href="#" className="hover:text-blue-500 transition-colors">Términos</a>
      </div>
    </footer>
  );
}
