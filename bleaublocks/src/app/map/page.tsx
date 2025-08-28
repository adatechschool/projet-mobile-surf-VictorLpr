"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navbar from "../../components/Navbar";
import BlocDetailModal from "../../components/BlocDetailModal";
import PageHeader from "../../components/PageHeader";
import { Bloc } from "../../types";
import { mockBlocs } from "../../data/mockBlocs";
import { getLevelColorHex } from "../../utils";

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [lng, setLng] = useState(2.6722);
  const [lat, setLat] = useState(48.4199);
  const [zoom, setZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (!mapContainer.current) return;

    try {
      setIsLoading(true);
      setError(null);

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on("load", () => {
        console.log("Carte chargée avec succès");
        setIsLoading(false);
      });

      map.current.on("error", (e) => {
        console.error("Erreur Mapbox:", e);
        setError("Erreur lors du chargement de la carte");
        setIsLoading(false);
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "top-right"
      );

      mockBlocs.forEach((bloc) => {
        const popupHTML = `
          <div style="text-align: center; padding: 8px; cursor: pointer;" data-bloc-id="${
            bloc.id
          }">
            <h3 style="color: black; margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${
              bloc.name
            }</h3>
            <p style="color: #666; margin: 0 0 4px 0; font-size: 12px;">${
              bloc.location.area
            }</p>
            <span style="background: ${getLevelColorHex(
              bloc.level
            )}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">${
          bloc.level
        }</span>
            <p style="color: #444; margin: 4px 0 0 0; font-size: 11px;">Cliquez pour voir les détails</p>
          </div>
        `;

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
        }).setHTML(popupHTML);

        const marker = new mapboxgl.Marker({
          color: getLevelColorHex(bloc.level),
        })
          .setLngLat([bloc.location.lng, bloc.location.lat])
          .setPopup(popup)
          .addTo(map.current!);

        marker.getElement().addEventListener("click", () => {
          setTimeout(() => {
            const popupElement = document.querySelector(
              `[data-bloc-id="${bloc.id}"]`
            );
            if (popupElement) {
              popupElement.addEventListener("click", () => {
                handleBlocClick(bloc);
              });
            }
          }, 100);
        });
      });

      map.current.on("move", () => {
        if (map.current) {
          const newLng = parseFloat(map.current.getCenter().lng.toFixed(4));
          const newLat = parseFloat(map.current.getCenter().lat.toFixed(4));
          const newZoom = parseFloat(map.current.getZoom().toFixed(2));

          setLng(newLng);
          setLat(newLat);
          setZoom(newZoom);
        }
      });
    } catch (err) {
      console.error("Erreur lors de l'initialisation de la carte:", err);
      setError("Impossible d'initialiser la carte");
      setIsLoading(false);
    }

    return () => {
      if (map.current) {
        try {
          map.current.remove();
        } catch (e) {
          console.warn(
            "Nettoyage final de la carte:",
            e instanceof Error ? e.message : "Erreur inconnue"
          );
        }
        map.current = null;
      }
    };
  }, []);

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
