"use client";

import { useState } from "react";
import BlocDetailModal from "@/components/BlocDetailModal";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import UserBlocCard from "@/components/UserBlocCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserBlocs } from "@/hooks/useUserBlocs";

interface UserBlocData {
  id: number;
  name: string;
  level: string;
  area: string;
  img_url: string;
}

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

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] pb-20">
          <PageHeader title="Mes Blocs" />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--thirdcolor)] mx-auto mb-4"></div>
              <p className="text-[var(--foreground)]">Chargement des blocs...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !userBlocs) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] pb-20">
          <PageHeader title="Mes Blocs" />
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
              <p className="text-[var(--foreground)] opacity-50 text-sm mt-2">
                Vérifiez que le serveur backend est démarré sur le port 8000
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[var(--thirdcolor)] text-[var(--background)] rounded-lg hover:opacity-80 transition-opacity"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] pb-20 scrollbar-hide">
        <PageHeader title="Mes Blocs" />

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


        <BlocDetailModal
          blocId={selectedBlocId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ProtectedRoute>
  );
}
