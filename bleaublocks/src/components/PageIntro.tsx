interface PageIntroProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export default function PageIntro({ title, subtitle, icon }: PageIntroProps) {
  const defaultIcon = (
    <svg
      className="w-10 h-10 text-[var(--background)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );

  return (
    <div className="text-center mb-6">
      <div className="w-20 h-20 mx-auto mb-4 bg-[var(--thirdcolor)] rounded-full flex items-center justify-center">
        {icon || defaultIcon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-lm ">{subtitle}</p>
    </div>
  );
}
