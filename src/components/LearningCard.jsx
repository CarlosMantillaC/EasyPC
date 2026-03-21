import AppLogoIcon from "./AppLogoIcon";

export default function LearningCard({
  title,
  description,
  borderColor,
  softColor,
  buttonColor,
  buttonLabel,
  locked = false,
  onClick,
}) {
  return (
    <article
      className={`relative w-full max-w-75 h-116 rounded-[48px] border-4 bg-white p-8 flex flex-col items-center transition-all duration-300 shadow-sm 
        ${locked ? "opacity-90" : "cursor-pointer hover:-translate-y-2 hover:shadow-xl active:scale-95"}`}
      style={{ borderColor }}
      onClick={!locked ? onClick : undefined}
    >
      <div
        className="w-48 h-48 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: softColor }}
      >
        <AppLogoIcon className="w-20 h-20" color={borderColor} />
      </div>

      <h3 className="mt-6 text-4xl leading-9 font-extrabold text-slate-900 text-center">{title}</h3>
      <p className="mt-2 text-base leading-6 font-medium text-slate-500 text-center max-w-55">
        {description}
      </p>

      <button
        className="mt-8 h-13 px-8 rounded-full text-lg font-bold transition-colors"
        style={{ 
          backgroundColor: buttonColor, 
          color: buttonColor === "#FFD93D" ? "#0F172A" : "#FFFFFF" 
        }}
      >
        {buttonLabel}
      </button>

      {locked ? (
        <div className="absolute inset-1 rounded-[44px] bg-slate-900/80 flex flex-col items-center justify-center px-6 backdrop-blur-[2px]">
          <div className="w-15 h-18 flex items-center justify-center text-white text-5xl animate-pulse">🔒</div>
          <p className="mt-4 text-white text-lg leading-5.5 font-bold text-center max-w-57">
            Completa la sección de Piezas para desbloquear este nivel
          </p>
        </div>
      ) : null}
    </article>
  );
}
