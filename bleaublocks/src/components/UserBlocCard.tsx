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
      className="p-4 rounded-lg border border-[var(--thirdcolor)] bg-[var(--fifthcolor)] hover:bg-opacity-80 transition-all cursor-pointer group"
    >
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
          <p className="text-sm text-[var(--background)] opacity-70 mb-1">
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
