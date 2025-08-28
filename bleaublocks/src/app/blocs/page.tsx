"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import BlocDetailModal from "../../components/BlocDetailModal";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import BlocCard from "../../components/BlocCard";
import { Bloc } from "../../types";
import { mockBlocs } from "../data/mockBlocs";

export default function BlocsPage() {
  const [selectedBloc, setSelectedBloc] = useState<Bloc | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBlocClick = (bloc: Bloc) => {
    setSelectedBloc(bloc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBloc(null);
  };

  const completedBlocs = mockBlocs.filter((bloc) => bloc.completed);
  const pendingBlocs = mockBlocs.filter((bloc) => !bloc.completed);

  return (
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
        bloc={selectedBloc}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
