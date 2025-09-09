import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Bloc } from "@/types";
import { addBlocMarkers, addMapControls } from "../utils/mapUtils";

interface UseMapboxOptions {
  initialLng: number;
  initialLat: number;
  initialZoom: number;
  blocs: Bloc[];
  onBlocClick: (bloc: Bloc) => void;
  shouldLoad?: boolean; 
}

export const useMapbox = ({
  initialLng,
  initialLat,
  initialZoom,
  blocs,
  onBlocClick,
  shouldLoad = true,
}: UseMapboxOptions) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldLoad) {
      setIsLoading(true);
    }
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (!mapContainer.current) return;

    try {
      setIsLoading(true);
      setError(null);

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [initialLng, initialLat],
        zoom: initialZoom,
      });

      map.current.on("load", () => {
        console.log("Carte chargée avec succès");
        setIsLoading(false);
      });

      map.current.on("error", (e) => {
        console.error("Erreur Mapbox:", e);
        setError("Erreur lors du chargement de la carte: " + e.error.message);
        setIsLoading(false);
      });

      addMapControls(map.current);
    } catch (err) {
      console.error("Erreur lors de l'initialisation de la carte:", err);
      setError("Impossible d'initialiser la carte");
      setIsLoading(false);
    }

    return () => {
      if (map.current) {
        try {
          console.log("Nettoyage de la carte");
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
  }, [initialLng, initialLat, initialZoom, shouldLoad]);

  useEffect(() => {
    if (!map.current || isLoading) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (blocs && blocs.length > 0) {
      markersRef.current = addBlocMarkers(blocs, map.current, onBlocClick);
    }
  }, [blocs, onBlocClick, isLoading]);

  return {
    mapContainer,
    isLoading,
    error,
  };
};
