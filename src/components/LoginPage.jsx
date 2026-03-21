import AppLogoIcon from "./AppLogoIcon";

export default function LoginPage({ onLogin, status }) {
  return (
    <div className="w-full max-w-120 flex flex-col items-center mx-auto py-10">
      <div className="relative w-80 h-80 rounded-full border-8 border-[#0D7FF20D] bg-white shadow-[0_20px_25px_-5px_rgba(13,127,242,0.10),0_8px_10px_-6px_rgba(13,127,242,0.10)] flex items-center justify-center">
        <AppLogoIcon className="w-48 h-48" color="#0D7FF2" />
        <span className="absolute right-10 top-10 text-yellow-400 text-xl">✦</span>
        <span className="absolute left-8 bottom-24 text-blue-300 text-sm">✧</span>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
          <span className="w-3 h-3 rounded-full bg-pink-300" />
          <span className="w-3 h-3 rounded-full bg-pink-300" />
        </div>
      </div>

      <h1 className="mt-10 text-4xl leading-10 font-bold text-center text-slate-900">
        ¡Hola! Vamos a aprender
      </h1>
      <p className="mt-4 text-lg leading-7 text-center text-slate-600">
        Pulsa el botón azul para comenzar tu aventura
      </p>

      <button
        className="mt-10 w-full max-w-96 h-16 rounded-full bg-[#0D7FF2] text-white font-bold text-xl tracking-[0.5px] shadow-[0_10px_15px_-3px_rgba(13,127,242,0.30),0_4px_6px_-4px_rgba(13,127,242,0.30)] hover:bg-[#0b70d6] transition flex items-center justify-center gap-4"
        onClick={onLogin}
      >
        <span className="w-9 h-9 rounded-full bg-white text-[#4285F4] flex items-center justify-center font-bold">
          G
        </span>
        Entrar con Google
      </button>

      <div className="mt-12 rounded-full bg-[#0D7FF21A] px-6 py-2 flex items-center gap-2">
         <div className="w-5 h-5">
          <AppLogoIcon className="w-full h-full" color="#0D7FF2" />
        </div>
        <span className="text-[#0D7FF2] text-base font-medium">Toca el botón para jugar</span>
      </div>

      <p className="mt-6 text-sm text-center text-slate-500">Estado: {status}</p>
    </div>
  );
}
