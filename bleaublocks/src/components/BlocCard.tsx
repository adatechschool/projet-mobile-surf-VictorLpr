"use client";

import { Bloc } from "../types";
import { getLevelColor } from "../utils";

interface BlocCardProps {
  bloc: Bloc;
  onClick: (bloc: Bloc) => void;
  showCompletionDate?: boolean;
}

export default function BlocCard({
  bloc,
  onClick,
  showCompletionDate = false,
}: BlocCardProps) {
  return (
    <div
      key={bloc.id}
      className="rounded-lg shadow-md overflow-hidden bg-[var(--background)] border border-gray-200 cursor-pointer"
      onClick={() => onClick(bloc)}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={bloc.img_url}
          alt={bloc.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            {bloc.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${getLevelColor(
                bloc.level
              )}`}
            >
              {bloc.level}
            </span>
            
          </div>
        </div>
        <p className="text-[var(--foreground)] text-sm mb-2">
          {bloc.area_name}
        </p>
        
      </div>
    </div>
  );
}
