"use client";

import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import BlocDetailModal from "@/components/BlocDetailModal";
import PageHeader from "@/components/PageHeader";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Bloc } from "@/types";
import { useBlocs } from "@/hooks/useBlocs";
import { useMapbox } from "@/hooks/useMapbox";

const MAP_CONFIG = {
  lng: 2.6722,
  lat: 48.4199,
  zoom: 12,
};

export default function MapPage() {
  const [selectedBlocId, setSelectedBlocId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { blocs, isLoading: isBlocsLoading, error: blocsError } = useBlocs();

  const handleBlocClick = (bloc: Bloc) => {
    console.log("Bloc cliqué:", bloc);

    setSelectedBlocId(bloc.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlocId(null);
  };

  const {
    mapContainer,
    isLoading: isMapLoading,
    error: mapError,
  } = useMapbox({
    initialLng: MAP_CONFIG.lng,
    initialLat: MAP_CONFIG.lat,
    initialZoom: MAP_CONFIG.zoom,
    blocs: blocs,
    onBlocClick: handleBlocClick,
    shouldLoad: !isBlocsLoading && !blocsError,
  });

  const isLoading = isBlocsLoading || (isMapLoading && !blocsError);
  const error = blocsError || mapError;

  return (
    <div className="h-screen flex flex-col bg-[var(--background)] pb-20">
      <PageHeader title="Carte de Fontainebleau" />

      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-[var(--background)] z-10">
            <LoadingState
              message={
                isBlocsLoading
                  ? "Chargement des blocs..."
                  : "Chargement de la carte..."
              }
            />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-[var(--background)] z-10">
            <ErrorState
              message={error}
              details={
                blocsError
                  ? "Vérifiez que le serveur backend est démarré sur le port 8000"
                  : undefined
              }
              onRetry={() => window.location.reload()}
            />
          </div>
        )}

        <div ref={mapContainer} className="w-full h-full" />
      </div>

      <BlocDetailModal
        blocId={selectedBlocId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
