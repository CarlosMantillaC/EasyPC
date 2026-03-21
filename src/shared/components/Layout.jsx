import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, user, onLogout, showHeader = true, showFooter = true }) {
  return (
    <div className="min-h-screen bg-[#ffffff] p-4 md:p-10 font-['Lexend'] text-slate-900">
      <div className="app-max-width bg-white flex flex-col">
        {user && showHeader && <Header user={user} onLogout={onLogout} />}
        <main className="flex-1">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}
