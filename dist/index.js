"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useGeolocationManager: () => useGeolocationManager
});
module.exports = __toCommonJS(index_exports);

// src/useGeolocationManager.ts
var import_react = require("react");

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
  const [history, setHistory] = (0, import_react.useState)({ locations: [] });
  const init = (0, import_react.useCallback)(async () => {
    const existing = await loadHistory();
    if (existing) {
      setHistory(existing);
    }
  }, [loadHistory]);
  const addLocation = (0, import_react.useCallback)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useGeolocationManager
});
