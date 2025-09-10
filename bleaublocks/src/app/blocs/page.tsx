"use client";

import { useState } from "react";
import BlocDetailModal from "@/components/BlocDetailModal";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import UserBlocCard from "@/components/UserBlocCard";
import TabContent from "@/components/TabContent";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useUserBlocs } from "@/hooks/useUserBlocs";
import { UserBlocData } from "@/types";

type TabType = 'completed' | 'progress';



export default function BlocsPage() {
  const [selectedBlocId, setSelectedBlocId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('completed');
  
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
                <StatCard 
                  value={userBlocs.stats.blocs_completed_count} 
                  label="Blocs réalisés"
                  isActive={activeTab === 'completed'}
                  onClick={() => setActiveTab('completed')}
                />
                <StatCard 
                  value={userBlocs.stats.blocs_in_progress_count} 
                  label="En projet"
                  isActive={activeTab === 'progress'}
                  onClick={() => setActiveTab('progress')}
                />
              </div>

              {activeTab === 'completed' && (
                <TabContent
                  blocs={userBlocs.blocs_completed}
                  title="Blocs réalisés"
                  emptyMessage="Aucun bloc réalisé pour le moment"
                  emptySubMessage="Explorez la carte pour découvrir de nouveaux blocs !"
                  onBlocClick={handleBlocClick}
                />
              )}

              {activeTab === 'progress' && (
                <TabContent
                  blocs={userBlocs.blocs_in_progress}
                  title="Projets en cours"
                  emptyMessage="Aucun projet en cours"
                  emptySubMessage="Ajoutez des blocs à vos projets depuis la carte !"
                  onBlocClick={handleBlocClick}
                />
              )}
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
