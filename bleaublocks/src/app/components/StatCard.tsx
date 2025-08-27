"use client";

interface StatCardProps {
  value: number;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 text-center">
      <div className="text-2xl font-bold text-[var(--fourthcolor)]">
        {value}
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
}
