interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Chargement..." }: LoadingStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--thirdcolor)] mx-auto mb-4"></div>
        <p className="text-[var(--foreground)]">{message}</p>
      </div>
    </div>
  );
}
