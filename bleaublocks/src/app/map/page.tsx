"use client";

import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from "@/components/Navbar";
import BlocDetailModal from "@/components/BlocDetailModal";
import PageHeader from "@/components/PageHeader";
import { Bloc } from "@/types";
import { mockBlocs } from "@/data/mockBlocs";
import { useMapbox } from "@/hooks/useMapbox";

const MAP_CONFIG = {
  lng: 2.6722,
  lat: 48.4199,
  zoom: 12,
};

export default function MapPage() {
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

  const { mapContainer, isLoading, error } = useMapbox({
    initialLng: MAP_CONFIG.lng,
    initialLat: MAP_CONFIG.lat,
    initialZoom: MAP_CONFIG.zoom,
    blocs: mockBlocs,
    onBlocClick: handleBlocClick,
  });

  return (
    <div className="h-screen flex flex-col bg-[var(--background)] pb-20">
      <PageHeader title="Carte de Fontainebleau" />

      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)] z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--thirdcolor)] mx-auto mb-4"></div>
              <p className="text-[var(--foreground)]">
                Chargement de la carte...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)] z-10">
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
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[var(--thirdcolor)] text-[var(--background)] rounded-lg hover:opacity-80 transition-opacity"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        <div ref={mapContainer} className="w-full h-full" />
      </div>

      <Navbar />

      <BlocDetailModal
        bloc={selectedBloc}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
