import { useEffect } from 'react';
import {
  useGeolocationManager,
  type TLocation,
  type TLocationHistory,
} from 'lynx-haversine-geolocation';

const STORAGE_KEY = 'geolocations';

export default function AppTest() {
  const { history, init, addLocation } = useGeolocationManager({
    distanceThreshold: 100,
    loadHistory: async () => {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as TLocationHistory) : null;
    },
    saveHistory: async (history: TLocationHistory) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    },
  });

  useEffect(() => {
    init();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const handleAdd = () => {
    const newLocation: TLocation = {
      coords: {
        latitude: 48.8566,
        longitude: 2.3522,
        accuracy: 5,
        altitude: 35,
        altitudeAccuracy: 1,
        heading: 0,
        speed: 0,
      },
      mocked: false,
      timestamp: Date.now(),
    };
    addLocation(newLocation);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Nombre de positions : {history.locations.length}</h1>
      <button style={{ color: 'blue' }} onClick={handleAdd}>
        Ajouter une position
      </button>
    </div>
  );
}
