"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import BlocDetailModal from "../components/BlocDetailModal";
import { Bloc } from "../types";
import { mockBlocs } from "../data/mockBlocs";
import { getLevelColor } from "../utils";

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
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="shadow-sm p-6 text-center bg-[var(--thirdcolor)] text-[var(--background)]">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold">Mes Blocs</h1>
        </div>
      </header>

      <main className="flex-1 p-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[var(--fourthcolor)]">
                {completedBlocs.length}
              </div>
              <div className="text-sm">Blocs réalisés</div>
            </div>
            <div className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[var(--fourthcolor)]">
                {pendingBlocs.length}
              </div>
              <div className="text-sm">En projet</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-[var(--thirdcolor)]">
              Blocs réalisés
            </h2>
            <div className="space-y-3">
              {completedBlocs.map((bloc) => (
                <div
                  key={bloc.id}
                  onClick={() => handleBlocClick(bloc)}
                  className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {bloc.location.area} - {bloc.name}
                      </h3>
                      <p className="text-sm opacity-70">
                        Niveau: {bloc.level} • Réalisé le {bloc.completedDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-bold ${getLevelColor(
                          bloc.level
                        )}`}
                      >
                        {bloc.level}
                      </span>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-[var(--fourthcolor)]">
              Projets en cours
            </h2>
            <div className="space-y-3">
              {pendingBlocs.map((bloc) => (
                <div
                  key={bloc.id}
                  onClick={() => handleBlocClick(bloc)}
                  className="bg-[var(--foreground)] text-[var(--background)] rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {bloc.location.area} - {bloc.name}
                      </h3>
                      <p className="text-sm opacity-70">Niveau: {bloc.level}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-bold ${getLevelColor(
                          bloc.level
                        )}`}
                      >
                        {bloc.level}
                      </span>
                      <div className="w-8 h-8 bg-[var(--fourthcolor)] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
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
