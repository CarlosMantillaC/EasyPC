import React from "react";
import TrophyIcon from "../../../shared/components/TrophyIcon";
import ProgressBar from "../../../shared/components/ProgressBar";

export default function AssemblyProgress({ progress, progressMessage }) {
  return (
    <section className="shrink-0 mb-6 lg:mb-12">
      <div className="flex items-center justify-between mb-2 lg:mb-4">
        <div className="flex items-center gap-2">
          <TrophyIcon width={14} height={14} color="#0D7FF2" />
          <p className="text-sm lg:text-base font-semibold text-slate-900">Progreso</p>
        </div>
        <p className="text-sm lg:text-base font-semibold text-blue-600 uppercase">
          {progressMessage || `${progress}% Completado`}
        </p>
      </div>
      <ProgressBar progress={progress} />
    </section>
  );
}
