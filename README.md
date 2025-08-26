[![npm](https://img.shields.io/npm/v/lynx-haversine-geolocation)](https://www.npmjs.com/package/lynx-haversine-geolocation) ![downloads](https://img.shields.io/npm/dt/lynx-haversine-geolocation?color=blue&logo=npm&logoColor=blue)

# Lynx-haversine-geolocation

![lynx-haversine-geolocation demo](demo/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f656d6470726f2f696d6167652f75706c6f61642f76313636313234353234392f64656d6f5f62636d7a6d652e676966.gif)

A **ReactLynx** hook (React18/19) to manage a geolocation history, using the **Haversine formula** to filter out nearby points and optimize tracking.  
Works in **LynxJS apps** (iOS/Android/Web) and regular React projects.

---

## 🚀 Installation

```bash
npm install lynx-haversine-geolocation
```

or with yarn:

```bash
yarn add lynx-haversine-geolocation
```

---

### ✨ Features

- 📍 Calculate distances in meters using the ***Haversine formula***

- 🔄 Manage a geolocation history 

- 🎯 Automatically filter out points that are too close to the previous one

- 🪶 Compatible with React 18+ and @lynx-js/react

---

### 🔧 Example Usage (ReactLynx)

```tsx
import { useCallback, useEffect, useState } from '@lynx-js/react';
import {
  useGeolocationManager,
  type TLocation,
  type TLocationHistory,
} from 'lynx-haversine-geolocation';

import './App.css';
import arrow from './assets/arrow.png';
import lynxLogo from './assets/lynx-logo.png';
import reactLynxLogo from './assets/react-logo.png';

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);
  const [latitude, setLatitude] = useState(48.8566);
  const [longitude, setLongitude] = useState(2.3522);

  const STORAGE_KEY = 'geolocations';

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
    console.info('Hello, ReactLynx');
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTapLogo = useCallback(() => {
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  const handleAdd = () => {
    const newLocation: TLocation = {
      coords: {
        latitude,
        longitude,
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
    <page>
      <view className="Background" />
      <view className="App">
        {/* Banner avec logo */}
        <view className="Banner">
          <view className="Logo" bindtap={onTapLogo}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">React</text>
          <text className="Subtitle">on Lynx</text>
        </view>

        {/* Contenu principal */}
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">Tap the logo and have fun!</text>

          {/* Formulaire de géolocalisation */}
          <view
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#222',
              borderRadius: '8px',
              zIndex: 9,
            }}
          >
            <text
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px',
              }}
            >
              Geolocation History: {history.locations.length} positions
            </text>

            <view
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <text>Latitude: {latitude}</text>
              <view
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '12px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <view
                  bindtap={() => setLatitude((lat) => lat + 0.01)}
                  style={{
                    padding: '4px',
                    backgroundColor: '#333',
                    marginRight: '4px',
                  }}
                >
                  <text style={{ color: '#fff' }}>+0.01</text>
                </view>
                <view
                  bindtap={() => setLatitude((lat) => lat - 0.01)}
                  style={{ padding: '4px', backgroundColor: '#333' }}
                >
                  <text style={{ color: '#fff' }}>-0.01</text>
                </view>
              </view>
              <view
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '12px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <view
                  bindtap={() => setLatitude((lat) => lat + 0.0001)}
                  style={{
                    padding: '4px',
                    backgroundColor: '#333',
                    marginRight: '4px',
                  }}
                >
                  <text style={{ color: '#fff' }}>+0.0001</text>
                </view>
                <view
                  bindtap={() => setLatitude((lat) => lat - 0.0001)}
                  style={{ padding: '4px', backgroundColor: '#333' }}
                >
                  <text style={{ color: '#fff' }}>-0.0001</text>
                </view>
              </view>
              <text>Longitude: {longitude}</text>
              <view
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '12px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <view
                  bindtap={() => setLongitude((lon) => lon + 0.01)}
                  style={{
                    padding: '4px',
                    backgroundColor: '#333',
                    marginRight: '4px',
                  }}
                >
                  <text style={{ color: '#fff' }}>+0.01</text>
                </view>
                <view
                  bindtap={() => setLongitude((lon) => lon - 0.01)}
                  style={{ padding: '4px', backgroundColor: '#333' }}
                >
                  <text style={{ color: '#fff' }}>-0.01</text>
                </view>
              </view>
              <view
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '12px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <view
                  bindtap={() => setLongitude((lon) => lon + 0.0001)}
                  style={{
                    padding: '4px',
                    backgroundColor: '#333',
                    marginRight: '4px',
                  }}
                >
                  <text style={{ color: '#fff' }}>+0.0001</text>
                </view>
                <view
                  bindtap={() => setLongitude((lon) => lon - 0.0001)}
                  style={{ padding: '4px', backgroundColor: '#333' }}
                >
                  <text style={{ color: '#fff' }}>-0.0001</text>
                </view>
              </view>
              <view
                bindtap={handleAdd}
                style={{
                  padding: '8px',
                  backgroundColor: '#4CAF50',
                  borderRadius: '4px',
                }}
              >
                <text style={{ color: 'white' }}>Add New Position</text>
              </view>
            </view>

            <view>
              {history.locations.map((loc, idx) => (
                <text key={idx}>
                  Lat: {loc.coords.latitude}, Lon: {loc.coords.longitude}, Time:{' '}
                  {new Date(loc.timestamp).toLocaleTimeString()}
                </text>
              ))}
            </view>
          </view>
        </view>

        <view style={{ flex: 1 }} />
      </view>
    </page>
  );
}

```
---

## 📖 API

### `useGeolocationManager(options)`

#### Options

- `distanceThreshold?: number` → Threshold in meters to consider two positions the same (default: `100`)
- `loadHistory: () => Promise<TLocationHistory | null>` → Function to load the geolocation history
- `saveHistory: (history: TLocationHistory) => Promise<void>` → Function to save the history

#### Returns

- `history: TLocationHistory` → List of stored positions
- `init: () => Promise<void>` → Initialize/load history
- `addLocation: (location: TLocation) => Promise<void>` → Add a new position with Haversine filtering

---

## 🧩 Types

The following TypeScript types are used in `react-haversine-geolocation`:

---

### TLocation

```tsx
export type TLocation = {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  timestamp: number;
};
```

- coords: GPS coordinates and related data.

- mocked: whether the location is mocked or real.

- timestamp: the time the location was recorded (milliseconds since epoch).

---

### TLocationHistory

```tsx
export type TLocationHistory = {
  locations: TLocation[];
};
```

- locations: an array of TLocation objects, representing the recorded history.

---

### GeolocationOptions

```tsx
export type GeolocationOptions = {
  distanceThreshold?: number; // threshold in meters to consider two positions identical
  loadHistory: () => Promise<TLocationHistory | null>; // function to load saved history
  saveHistory: (history: TLocationHistory) => Promise<void>; // function to save history
};
```

- distanceThreshold (optional): meters to consider two positions the same (default: 100).

- loadHistory: function that returns the saved history or null.

- saveHistory: function that saves the history (can be localStorage, AsyncStorage, SQLite, etc.).

---

## 📐 Distance Calculation (Haversine)

The distance between two GPS points is calculated using the Haversine formula, which determines the great-circle distance between two points on a sphere using their latitude and longitude.

![Haversine formula](demo/e1e45776-aa40-4806-820e-b5c5b8050f4b_SP-687-The-haversine-formula.jpg)

This formula is useful for:

Filtering out GPS points that are too close to each other.

Reducing noise in location tracking.

Optimizing storage and performance by avoiding redundant points.

Function signature:

```ts
getDistanceInMeters(lat1, lon1, lat2, lon2): number
```

- Parameters:

  - lat1, lon1 – latitude and longitude of the first point in decimal degrees.

  - lat2, lon2 – latitude and longitude of the second point in decimal degrees.

- Returns: distance in meters.

### Example

```ts
import { getDistanceInMeters } from "lynx-haversine-geolocation";

const distance = getDistanceInMeters(48.8566, 2.3522, 40.7128, -74.006);
console.log(`Distance: ${distance.toFixed(2)} meters`);
```

---

## 📜 License

MIT

# Lynx-haversine-geolocation
