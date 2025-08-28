"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function PageHeader({
  title,
  subtitle,
  showBackButton = false,
  onBackClick,
}: PageHeaderProps) {
  return (
    <header className="shadow-sm p-6 text-center bg-[var(--thirdcolor)] text-[var(--background)]">
      <div className="flex items-center justify-center relative">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="absolute left-0 flex items-center space-x-2 hover:opacity-70 transition-opacity"
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
        )}

        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm opacity-80 mt-1">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}
