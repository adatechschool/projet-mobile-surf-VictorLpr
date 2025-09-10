import UserBlocCard from "./UserBlocCard";

interface TabContentProps {
  blocs: any[];
  title: string;
  emptyMessage: string;
  emptySubMessage: string;
  onBlocClick: (bloc: any) => void;
}

export default function TabContent({ 
  blocs, 
  title, 
  emptyMessage, 
  emptySubMessage, 
  onBlocClick 
}: TabContentProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 text-[var(--thirdcolor)]">
        {title} ({blocs.length})
      </h2>
      {blocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blocs.map((bloc, index) => (
            <UserBlocCard
              key={`bloc-${index}`}
              bloc={bloc}
              onClick={onBlocClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-[var(--fifthcolor)] rounded-lg">
          <p className="text-[var(--background)] opacity-70">
            {emptyMessage}
          </p>
          <p className="text-sm text-[var(--background)] opacity-50 mt-1">
            {emptySubMessage}
          </p>
        </div>
      )}
    </div>
  );
}
