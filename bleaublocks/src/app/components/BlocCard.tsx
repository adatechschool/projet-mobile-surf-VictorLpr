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
          src={bloc.image}
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
            {bloc.completed && (
              <span className="text-green-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
        <p className="text-[var(--foreground)] text-sm mb-2">
          {bloc.location.area}
        </p>
        {showCompletionDate && bloc.completed && bloc.completedDate && (
          <p className="text-green-600 text-xs">
            Complété le {bloc.completedDate}
          </p>
        )}
      </div>
    </div>
  );
}
