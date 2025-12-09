"use client";

import { useState } from "react";

interface ParkingMapDisplayProps {
  selectedLot?: {
    name: string;
    capacity: number;
    location: string;
    latitude?: number;
    longitude?: number;
  } | null;
}

export default function ParkingMapDisplay({ selectedLot }: ParkingMapDisplayProps) {
  const [iframeKey, setIframeKey] = useState(0);

  // SDSU map URL from Concept3D
  const baseMapUrl = "https://map.concept3d.com/?id=801#!ct/15205,15544,40419,68621,68622,97540,83801?sbc/?mc/32.775056650791,-117.07214713097?z/17?lvl/0?share";

  // Build map URL with location field if lot is clicked on
  const getMapUrl = () => 
    {
    if (!selectedLot?.latitude || !selectedLot?.longitude) {
      return baseMapUrl;
    }

    const lat = selectedLot.latitude;
    const lon = selectedLot.longitude;
    return `${baseMapUrl}?lat=${lat}&lon=${lon}`;
  };

  const mapUrl = getMapUrl();

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">SDSU Parking Lot Map</h2>
        {selectedLot && (
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">{selectedLot.name}</p>
            <p className="text-xs">Total Capacity: {selectedLot.capacity} spaces</p>
            <p className="text-xs">{selectedLot.location}</p>
          </div>
        )}
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

      <div className="p-2 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => setIframeKey((prev) => prev + 1)}
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Refresh Map
        </button>
      </div>
      
      {selectedLot && (
        <div className="p-4 border-t border-gray-200 bg-blue-50">
          <p className="text-sm font-semibold mb-3">Get Directions</p>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(selectedLot.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-2 mr-2"
          >
            Open in Google Maps
          </a>
          {selectedLot.latitude && selectedLot.longitude && (
            <a
              href={`https://www.apple.com/maps/?address=${encodeURIComponent(selectedLot.location)}&ll=${selectedLot.latitude},${selectedLot.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mb-2"
            >
              Open in Apple Maps
            </a>
          )}
        </div>
      )}
    </div>
  );
}
