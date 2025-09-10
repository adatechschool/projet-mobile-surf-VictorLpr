"use client";

import { useState } from "react";
import BlocDetailModal from "@/components/BlocDetailModal";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import UserBlocCard from "@/components/UserBlocCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useUserBlocs } from "@/hooks/useUserBlocs";
import { UserBlocData } from "@/types";



export default function BlocsPage() {
  const [selectedBlocId, setSelectedBlocId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { userBlocs, isLoading, error, refetch } = useUserBlocs();

  const handleBlocClick = (bloc: UserBlocData) => {
    setSelectedBlocId(bloc.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlocId(null);
    refetch();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] pb-20 scrollbar-hide">
        <PageHeader title="Mes Blocs" />
        
        {isLoading && <LoadingState message="Chargement des blocs..." />}

        {(error || !userBlocs) && !isLoading && (
          <ErrorState 
            message={error || "Données non disponibles"}
            details="Vérifiez que le serveur backend est démarré sur le port 8000"
            onRetry={() => window.location.reload()}
          />
        )}

        {!isLoading && !error && userBlocs && (
          <main className="flex-1 p-6 scrollbar-hide">
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard value={userBlocs.stats.blocs_completed_count} label="Blocs réalisés" />
                <StatCard value={userBlocs.stats.blocs_in_progress_count} label="En projet" />
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-[var(--thirdcolor)]">
                  Blocs réalisés ({userBlocs.blocs_completed.length})
                </h2>
                {userBlocs.blocs_completed.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userBlocs.blocs_completed.map((bloc, index) => (
                      <UserBlocCard
                        key={`completed-${index}`}
                        bloc={bloc}
                        onClick={handleBlocClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-[var(--fifthcolor)] rounded-lg">
                    <p className="text-[var(--background)] opacity-70">
                      Aucun bloc réalisé pour le moment
                    </p>
                    <p className="text-sm text-[var(--background)] opacity-50 mt-1">
                      Explorez la carte pour découvrir de nouveaux blocs !
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 text-[var(--fourthcolor)]">
                  Projets en cours ({userBlocs.blocs_in_progress.length})
                </h2>
                {userBlocs.blocs_in_progress.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userBlocs.blocs_in_progress.map((bloc, index) => (
                      <UserBlocCard
                        key={`progress-${index}`}
                        bloc={bloc}
                        onClick={handleBlocClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-[var(--fifthcolor)] rounded-lg">
                    <p className="text-[var(--background)] opacity-70">
                      Aucun projet en cours
                    </p>
                    <p className="text-sm text-[var(--background)] opacity-50 mt-1">
                      Ajoutez des blocs à vos projets depuis la carte !
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        )}

        <BlocDetailModal
          blocId={selectedBlocId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ProtectedRoute>
  );
}
