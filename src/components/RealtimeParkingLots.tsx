"use client";

/*
 Table that queries and displays parking lots in Parking-Lot data page. 
  - Clicking on the lot triggers the map directions and center
        - only works when there is a location listed associated with that lot.
*/
import { createClient } from "@/lib/supabase/browser-client";
import { useEffect, useState } from "react";
import {
  validateParkingLotName,
  validateCapacity,
  validateAvailable,
} from "@/lib/parking-validation";

interface ParkingLot {
  Index?: number | string;
  index?: number | string;
  // support both camelCase (legacy in-code) and lowercase (Postgres default)
  LotNumber?: string;
  lotnumber?: string;
  TotalSpaces?: number;
  totalspaces?: number;
  TakenSpaces?: number;
  takenspaces?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
}

// This is the table component
function ParkingLotsTable({ parkingLots, onLotClick }: { parkingLots: ParkingLot[]; onLotClick?: (lot: ParkingLot) => void }) {
  if (!parkingLots || parkingLots.length === 0) {
    return <p>No parking lot data available.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate" style={{ borderSpacing: "0 12px", color: "black" }}>
        <thead>
          <tr>
            <th className="text-left px-6 py-4 text-lg font-semibold">Lot Name</th>
            <th className="text-left px-6 py-4 text-lg font-semibold">Total Spaces</th>
            <th className="text-left px-6 py-4 text-lg font-semibold">Taken Spaces</th>
          </tr>
        </thead>

        <tbody>
          {parkingLots.map((lot, idx) => {
            const lotKey = lot.Index ?? lot.index ?? JSON.stringify(lot) ?? idx;
            const name = lot.LotNumber ?? lot.lotnumber ?? (lot as any).name ?? "Unnamed";
            const total = lot.TotalSpaces ?? lot.totalspaces ?? (lot as any).capacity ?? 0;
            const taken = lot.TakenSpaces ?? lot.takenspaces ?? (lot as any).taken ?? 0;

            return (
              <tr key={String(lotKey)}>
                <td className="align-top px-0">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <button
                      type="button"
                      onClick={() => onLotClick?.(lot)}
                      className="text-left text-base font-medium text-blue-700 hover:underline"
                    >
                      {name}
                    </button>
                  </div>
                </td>

                <td className="align-top px-0 w-40">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-base">{total}</div>
                </td>

                <td className="align-top px-0 w-40">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-base">{taken}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// This is the main realtime component that wraps the table
export default function RealtimeParkingLots({
                                              serverData,
                                              onLotClick,
                                            }: {
  serverData: ParkingLot[];
  onLotClick?: (lot: ParkingLot) => void;
}) {
  const [parkingLots, setParkingLots] = useState(serverData);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
        .channel("realtime parkinglots")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "parkinglots" },
            (payload) => {
                // Validate the incoming data before updating state
                  const incomingData = (payload.new || payload.old) as Partial<ParkingLot> | null;
                if (incomingData) {
                // Support both camelCase and lowercase column payloads
                const incomingName = incomingData.LotNumber ?? incomingData.lotnumber ?? "";
                const incomingTotal = incomingData.TotalSpaces ?? incomingData.totalspaces ?? 0;
                const incomingTaken = incomingData.TakenSpaces ?? incomingData.takenspaces ?? 0;

                // Run basic validation on updated/inserted records
                  const nameCheck = validateParkingLotName(incomingName);
                  const capacityCheck = validateCapacity(incomingTotal);
                const availableCheck = validateAvailable(
                    incomingTotal - incomingTaken,
                    incomingTotal
                );

                // Only fetch and update if validation passes
                if (nameCheck.valid && capacityCheck.valid && availableCheck.valid) {
                  const fetchUpdatedData = async () => {
                    const { data } = await supabase.from("parkinglots").select();
                    if (data) {
                      setParkingLots(data);
                    }
                  };
                  fetchUpdatedData();
                } else {
                  console.warn("Validation failed on incoming data:", {
                    nameCheck,
                    capacityCheck,
                    availableCheck,
                  });
                }
              }
            },
        )
        .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Render the table component with the live data
  return <ParkingLotsTable parkingLots={parkingLots} onLotClick={onLotClick} />;
}