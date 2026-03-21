import AppLogoIcon from "../../components/AppLogoIcon";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-100 flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-3 grayscale opacity-50 font-bold text-slate-600">
        <AppLogoIcon className="w-5 h-5" color="#94a3b8" />
        <span>© 2026 Easy PC</span>
      </div>
      <div className="flex items-center gap-3 grayscale opacity-50 font-bold text-slate-600">
        <span>Hecho con ❤️ para pequeños ingenieros</span>
      </div>
    </footer>
  );
}
