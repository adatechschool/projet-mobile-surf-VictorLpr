"use client";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-[var(--thirdcolor)] text-[var(--background)] shadow-sm flex-shrink-0">
      <button
        onClick={onClose}
        className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Retour</span>
      </button>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="w-20"></div>
    </div>
  );
}

interface ModalLoadingProps {
  onClose: () => void;
}

export function ModalLoading({ onClose }: ModalLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <ModalHeader title="Chargement..." onClose={onClose} />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--thirdcolor)] mx-auto mb-4"></div>
          <p className="text-[var(--foreground)]">Chargement des détails...</p>
        </div>
      </div>
    </div>
  );
}

interface ModalErrorProps {
  onClose: () => void;
  error: string;
}

export function ModalError({ onClose, error }: ModalErrorProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      <ModalHeader title="Erreur" onClose={onClose} />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-6">
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
          <p className="text-[var(--foreground)] opacity-70">{error}</p>
        </div>
      </div>
    </div>
  );
}

export { ModalHeader };
