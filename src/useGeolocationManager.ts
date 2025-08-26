import { useState, useCallback } from 'react';
import { GeolocationOptions, TLocation, TLocationHistory } from './types';
import { getDistanceInMeters } from './utils';

export function useGeolocationManager({
  distanceThreshold = 100,
  loadHistory,
  saveHistory,
}: GeolocationOptions) {
  const [history, setHistory] = useState<TLocationHistory>({ locations: [] });

  // Charger l'historique au montage
  const init = useCallback(async () => {
    const existing = await loadHistory();
    if (existing) {
      setHistory(existing);
    }
  }, [loadHistory]);

  // Ajouter une nouvelle location
  const addLocation = useCallback(
    async (newLocation: TLocation) => {
      const updatedHistory: TLocationHistory = { ...history };

      const lastLocation = updatedHistory.locations.at(-1);

      let isSameCoords = false;

      if (lastLocation) {
        const distance = getDistanceInMeters(
          lastLocation.coords.latitude,
          lastLocation.coords.longitude,
          newLocation.coords.latitude,
          newLocation.coords.longitude,
        );

        isSameCoords = distance < distanceThreshold;
      }

      if (isSameCoords && lastLocation) {
        // juste mettre à jour le timestamp
        lastLocation.timestamp = newLocation.timestamp;
      } else {
        updatedHistory.locations.push(newLocation);
      }

      setHistory(updatedHistory);
      await saveHistory(updatedHistory);
    },
    [history, distanceThreshold, saveHistory],
  );

  return {
    history,
    init,
    addLocation,
  };
}
