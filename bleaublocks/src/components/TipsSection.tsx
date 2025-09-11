interface TipsSectionProps {
  title: string;
  tips: string[];
}

export default function TipsSection({ title, tips }: TipsSectionProps) {
  return (
    <div className="bg-[var(--thirdcolor)] bg-opacity-20 rounded-lg p-4">
      <h4 className="font-semibold mb-2 text-[var(--background)]">💡 {title}</h4>
      <ul className="text-lm text-[var(--background)] space-y-1">
        {tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
}
