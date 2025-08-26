// src/useGeolocationManager.ts
import { useState, useCallback } from "react";

// src/utils.ts
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (v) => v * Math.PI / 180;
  const \u03C61 = toRad(lat1);
  const \u03C62 = toRad(lat2);
  const \u0394\u03C6 = toRad(lat2 - lat1);
  const \u0394\u03BB = toRad(lon2 - lon1);
  const a = Math.sin(\u0394\u03C6 / 2) * Math.sin(\u0394\u03C6 / 2) + Math.cos(\u03C61) * Math.cos(\u03C62) * Math.sin(\u0394\u03BB / 2) * Math.sin(\u0394\u03BB / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// src/useGeolocationManager.ts
function useGeolocationManager({
  distanceThreshold = 100,
  loadHistory,
  saveHistory
}) {
  const [history, setHistory] = useState({ locations: [] });
  const init = useCallback(async () => {
    const existing = await loadHistory();
    if (existing) {
      setHistory(existing);
    }
  }, [loadHistory]);
  const addLocation = useCallback(
    async (newLocation) => {
      const updatedHistory = { ...history };
      const lastLocation = updatedHistory.locations.at(-1);
      let isSameCoords = false;
      if (lastLocation) {
        const distance = getDistanceInMeters(
          lastLocation.coords.latitude,
          lastLocation.coords.longitude,
          newLocation.coords.latitude,
          newLocation.coords.longitude
        );
        isSameCoords = distance < distanceThreshold;
      }
      if (isSameCoords && lastLocation) {
        lastLocation.timestamp = newLocation.timestamp;
      } else {
        updatedHistory.locations.push(newLocation);
      }
      setHistory(updatedHistory);
      await saveHistory(updatedHistory);
    },
    [history, distanceThreshold, saveHistory]
  );
  return {
    history,
    init,
    addLocation
  };
}
export {
  useGeolocationManager
};
