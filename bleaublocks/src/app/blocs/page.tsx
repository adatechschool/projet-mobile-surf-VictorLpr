"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import BlocDetailModal from "@/components/BlocDetailModal";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import BlocCard from "@/components/BlocCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Bloc } from "@/types";
import { useBlocs } from "@/hooks/useBlocs";

export default function BlocsPage() {
  const [selectedBlocId, setSelectedBlocId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { blocs, isLoading, error } = useBlocs();

  const handleBlocClick = (bloc: Bloc) => {
    setSelectedBlocId(bloc.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlocId(null);
  };

  const completedBlocs = blocs.filter((bloc) => bloc.user_completion_status === 'complété');
  const pendingBlocs = blocs.filter((bloc) => bloc.user_completion_status === 'en projet');

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
          <Navbar />
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
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
          <Navbar />
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
              <StatCard value={completedBlocs.length} label="Blocs réalisés" />
              <StatCard value={pendingBlocs.length} label="En projet" />
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-[var(--thirdcolor)]">
                Blocs réalisés
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedBlocs.map((bloc) => (
                  <BlocCard
                    key={bloc.id}
                    bloc={bloc}
                    onClick={handleBlocClick}
                    showCompletionDate={true}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-[var(--fourthcolor)]">
                Projets en cours
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingBlocs.map((bloc) => (
                  <BlocCard
                    key={bloc.id}
                    bloc={bloc}
                    onClick={handleBlocClick}
                    showCompletionDate={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        <Navbar />

        <BlocDetailModal
          blocId={selectedBlocId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ProtectedRoute>
  );
}
