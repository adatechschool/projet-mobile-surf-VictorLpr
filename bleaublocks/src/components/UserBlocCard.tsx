"use client";

import { UserBlocData } from "@/types";



interface UserBlocCardProps {
  bloc: UserBlocData;
  onClick?: (bloc: UserBlocData) => void;
}

export default function UserBlocCard({ 
  bloc, 
  onClick, 
}: UserBlocCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(bloc);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 rounded-lg border border-[var(--thirdcolor)] bg-[var(--fifthcolor)] hover:bg-opacity-80 transition-all cursor-pointer group relative"
    >
      <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-5 h-5 text-[var(--background)] group-hover:text-[var(--fourthcolor)] transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>

      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={bloc.img_url}
              alt={bloc.name}
              className="w-full h-full object-cover"
            />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--background)] group-hover:text-[var(--fourthcolor)] transition-colors truncate">
            {bloc.name}
          </h3>
          <p className="text-sm text-[var(--background)] mb-1">
            {bloc.area}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-[var(--fourthcolor)] text-[var(--foreground)] px-2 py-1 rounded">
              {bloc.level}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
