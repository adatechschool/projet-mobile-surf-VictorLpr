"use client";

interface StatCardProps {
  value: number;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function StatCard({ value, label, isActive = false, onClick }: StatCardProps) {
  const baseClasses = "rounded-lg p-4 text-center transition-all duration-200";
  const interactiveClasses = onClick ? "cursor-pointer hover:opacity-80" : "";
  const activeClasses = isActive 
    ? "bg-[var(--thirdcolor)] text-[var(--background)] shadow-lg" 
    : "bg-[var(--foreground)] text-[var(--background)]";

  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${activeClasses}`}
      onClick={onClick}
    >
      <div className="text-2xl font-bold text-[var(--fourthcolor)]">
        {value}
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
}
