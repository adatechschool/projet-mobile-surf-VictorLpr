import mapboxgl from "mapbox-gl";
import { Bloc } from "@/types";
import { getLevelColorHex } from "@/utils";

export const createPopupHTML = (bloc: Bloc): string => {
  return `
    <div style="text-align: center; padding: 8px; cursor: pointer;" data-bloc-id="${
      bloc.id
    }">
      <h3 style="color: black; margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${
        bloc.name
      }</h3>
      <p style="color: #666; margin: 0 0 4px 0; font-size: 12px;">${
        bloc.area_name
      }</p>
      <span style="background: ${getLevelColorHex(
        bloc.level
      )}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold;">${
    bloc.level
  }</span>
      <p style="color: #444; margin: 4px 0 0 0; font-size: 11px;">Cliquez pour voir les détails</p>
    </div>
  `;
};

export const createBlocPopup = (bloc: Bloc): mapboxgl.Popup => {
  const popupHTML = createPopupHTML(bloc);

  return new mapboxgl.Popup({
    offset: 25,
    closeButton: true,
  }).setHTML(popupHTML);
};

export const createBlocMarker = (
  bloc: Bloc,
  map: mapboxgl.Map,
  onBlocClick: (bloc: Bloc) => void
): mapboxgl.Marker => {
  const popup = createBlocPopup(bloc);

  const marker = new mapboxgl.Marker({
    color: getLevelColorHex(bloc.level),
  })
    .setLngLat([bloc.lng, bloc.lat])
    .setPopup(popup)
    .addTo(map);

  popup.on('open', () => {
    setTimeout(() => {
      const popupElement = document.querySelector(`[data-bloc-id="${bloc.id}"]`);
      if (popupElement) {
        popupElement.addEventListener('click', () => {
          console.log("Popup cliquée:", bloc.name);
          onBlocClick(bloc);
          popup.remove();
        });
      }
    }, 100);
  });

  return marker;
};

export const addBlocMarkers = (
  blocs: Bloc[],
  map: mapboxgl.Map,
  onBlocClick: (bloc: Bloc) => void
): mapboxgl.Marker[] => {
  return blocs.map((bloc) => createBlocMarker(bloc, map, onBlocClick));
};

export const addMapControls = (map: mapboxgl.Map): void => {
  map.addControl(new mapboxgl.NavigationControl(), "top-right");

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }),
    "top-right"
  );
};
