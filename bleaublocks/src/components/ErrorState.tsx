"use client";

interface ErrorStateProps {
  message: string;
  details?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorState({ 
  message, 
  details, 
  onRetry,
  fullScreen = false 
}: ErrorStateProps) {
  const containerClass = fullScreen 
    ? "min-h-screen flex items-center justify-center bg-[var(--background)]"
    : "flex-1 flex items-center justify-center";

  return (
    <div className={containerClass}>
      <div className="text-center p-6 max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          Erreur de chargement
        </h3>
        <p className="text-[var(--foreground)] opacity-70 mb-2">{message}</p>
        {details && (
          <p className="text-[var(--foreground)] opacity-50 text-sm mb-4">
            {details}
          </p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[var(--thirdcolor)] text-[var(--background)] rounded-lg hover:opacity-80 transition-opacity"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
