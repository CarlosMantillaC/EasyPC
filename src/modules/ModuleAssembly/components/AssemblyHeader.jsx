import React from "react";
import UserProfileButton from "../../../shared/components/UserProfileButton";
import StarRating from "../../../shared/components/StarRating";

export default function AssemblyHeader({ onBack, icon: Icon, title, subtitle, user, levelNumber }) {
  return (
    <header className="shrink-0 mb-4 lg:mb-6">
      <div className="py-2 lg:py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={onBack} 
            className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center border-2 border-slate-100 shadow-md hover:border-[#0D7FF2] transition-all active:scale-95 mr-1 lg:mr-2 shrink-0"
          >
            <span className="text-lg lg:text-xl">←</span>
          </button>
          {Icon && <Icon className="w-7 h-9 lg:w-9 lg:h-11 shrink-0" color="#0D7FF2" />}
          <div className="flex flex-col min-w-0">
            <h2 className="text-base lg:text-2xl font-bold text-slate-900 tracking-tight uppercase truncate">{title}</h2>
            <p className="text-xs lg:text-sm text-slate-600">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <StarRating user={user} levelNumber={levelNumber} />
          <UserProfileButton user={user} size="small" showBorder={false} fallbackType="icon" />
        </div>
      </div>
    </header>
  );
}
