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
