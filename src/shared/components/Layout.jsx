import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#ffffff] p-4 md:p-10 font-['Lexend'] text-slate-900">
      <div className="w-full max-w-7xl mx-auto bg-white flex flex-col">
        {user && <Header user={user} onLogout={onLogout} />}
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
