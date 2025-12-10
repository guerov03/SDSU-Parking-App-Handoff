"use client";

import { useEffect, useRef, useState } from "react";
import type { ParkingLot } from "@/lib/parking-validation";

type MapProvider = "concept3d" | "google";

interface ParkingMapDisplayProps {
  selectedLot: ParkingLot | null;
}

const defaultCampusQuery = "San Diego State University, San Diego, CA";

export default function ParkingMapDisplay({ selectedLot }: ParkingMapDisplayProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [mapProvider, setMapProvider] = useState<MapProvider>("concept3d");
  const lastLotKey = useRef<string | null>(null);

  const locationQuery = (() => {
    if (!selectedLot?.location) {
      return null;
    }
    const trimmed = selectedLot.location.trim();
    if (!trimmed || trimmed.toLowerCase() === "no location provided") {
      return null;
    }
    return trimmed;
  })();

  useEffect(() => {
    if (selectedLot) {
      setIframeKey((prev) => prev + 1);
    }
  }, [selectedLot, mapProvider]);

  useEffect(() => {
    const lotKey = selectedLot ? (selectedLot.id ?? selectedLot.name ?? null) : null;
    if (!lotKey) {
      lastLotKey.current = null;
      setMapProvider("concept3d");
      return;
    }

    if (lastLotKey.current !== lotKey) {
      lastLotKey.current = lotKey;
      setMapProvider("google");
    }
  }, [selectedLot]);

  // SDSU map URL from Concept3D
  const baseMapUrl = "https://map.concept3d.com/?id=801#!";
  const layerDefinitions = "ct/15205,15544,40419,68621,68622,97540,83801?sbc/";
  const defaultMapView = "mc/32.775056650791,-117.07214713097?z/17?lvl/0?share";

  const buildGoogleMapsEmbed = (query: string) =>
    `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const defaultGoogleQuery = defaultCampusQuery;
  const defaultConceptView = `${layerDefinitions}${defaultMapView}`;

  const buildConceptMapUrl = () => {
    if (selectedLot?.concept3dId) {
      return `${baseMapUrl}m/${selectedLot.concept3dId}?share`;
    }
    return `${baseMapUrl}${defaultConceptView}`;
  };

  const getMapUrl = () => {
    if (mapProvider === "concept3d") {
      return buildConceptMapUrl();
    }

    if (!selectedLot) {
      return buildGoogleMapsEmbed(defaultGoogleQuery);
    }

    return buildGoogleMapsEmbed(locationQuery ?? defaultGoogleQuery);
  };

  const directionsQuery = locationQuery ?? defaultCampusQuery;
  const googleDirectionsUrl = selectedLot
    ? `https://www.google.com/maps/search/${encodeURIComponent(directionsQuery)}`
    : null;
  const appleDirectionsUrl = selectedLot
    ? `https://maps.apple.com/?q=${encodeURIComponent(directionsQuery)}`
    : null;

  const mapUrl = getMapUrl();

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-5 border-b border-gray-200">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">SDSU Parking Lot Map</h2>
            {selectedLot && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">{selectedLot.name}</p>
                <p className="text-xs">Capacity: {selectedLot.capacity} spaces</p>
                <p className="text-xs">{selectedLot.location}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMapProvider("concept3d")}
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                mapProvider === "concept3d"
                  ? "bg-[#d41735] text-white border-[#d41735]"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              Concept3D View
            </button>
            <button
              type="button"
              onClick={() => setMapProvider("google")}
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                mapProvider === "google"
                  ? "bg-[#d41735] text-white border-[#d41735]"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              Google Map View
            </button>
          </div>
          {selectedLot && mapProvider === "concept3d" && !selectedLot.concept3dId && (
            <p className="text-xs text-amber-600">
              No Concept3D location ID configured for this lot; showing the campus overview. Switch to
              Google Maps to view the street address.
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <iframe
          key={iframeKey}
          src={mapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: "none" }}
          allowFullScreen
          loading="lazy"
          title="SDSU Parking Lot Map"
        />
      </div>
      
      {selectedLot && (
        <div className="p-5 border-t border-gray-200 bg-white">
          <p className="text-sm font-semibold mb-3">Get Directions</p>
          {googleDirectionsUrl && (
            <a
              href={googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e4eeff] hover:bg-[#538aee] text-[#0a4aa3] font-semibold py-2 px-4 rounded-xl mb-2 mr-2 transition"
            >
              Open in Google Maps
            </a>
          )}
          {appleDirectionsUrl && (
            <a
              href={appleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#f3f3f5] hover:bg-[#36364d] text-[#2d2d2d] font-semibold py-2 px-4 rounded-xl mb-2 transition"
            >
              Open in Apple Maps
            </a>
          )}
        </div>
      )}
    </div>
  );
}
