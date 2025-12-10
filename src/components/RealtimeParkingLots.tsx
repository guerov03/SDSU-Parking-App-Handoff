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
import {
  normalizeParkingLot,
  type RawParkingLot,
  type NormalizedParkingLot,
} from "@/lib/parking-normalizer";

type ParkingLot = RawParkingLot;

// This is the table component
function ParkingLotsTable({
  parkingLots,
  onLotClick,
}: {
  parkingLots: ParkingLot[];
  onLotClick?: (lot: NormalizedParkingLot) => void;
}) {
  if (!parkingLots || parkingLots.length === 0) {
    return <p>No parking lot data available.</p>;
  }
  return (
    <div className="overflow-x-auto space-y-3">
      <div
        className="inline-flex w-full items-center px-1 py-1 rounded-xl shadow-sm gap-2"
        style={{ color: "#ffffff", backgroundColor: "#d41735" }}
      >
        <div className="flex-1 text-left px-5 py-3 text-lg font-semibold">Lot Name</div>
        <div className="w-40 text-left pl-12 pr-3 py-3 text-lg font-semibold">Capacity</div>
        <div className="w-40 text-left px-5 py-3 text-lg font-semibold">Taken Spaces</div>
      </div>
      <table
        className="min-w-full border-separate text-sm text-[#2c2c2c]"
        style={{ borderSpacing: "0 12px", color: "inherit" }}
        aria-label="Parking lots"
      >
        <tbody>
          {parkingLots.map((lot, idx) => {
            const normalized = normalizeParkingLot(lot);
            const lotKey = lot.Index ?? lot.index ?? normalized.id ?? idx;
            return (
              <tr key={String(lotKey)}>
                <td className="align-top px-0">
                  <div className="bg-white p-4 rounded-2xl border border-[#edf0f7] shadow-sm">
                    <button
                      type="button"
                      onClick={() => onLotClick?.(normalized)}
                      className="text-left text-sm font-semibold text-[#0b63c4] hover:underline"
                    >
                      {normalized.name}
                    </button>
                  </div>
                </td>

                <td className="align-top px-0 w-40">
                  <div className="bg-white p-4 rounded-2xl border border-[#edf0f7] shadow-sm text-sm font-medium text-center">
                    {normalized.capacity}
                  </div>
                </td>

                <td className="align-top px-0 w-40">
                  <div className="bg-white p-4 rounded-2xl border border-[#edf0f7] shadow-sm text-sm font-medium text-center">
                    {normalized.taken}
                  </div>
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
  onDataUpdate,
}: {
  serverData: ParkingLot[];
  onLotClick?: (lot: NormalizedParkingLot) => void;
  onDataUpdate?: (lots: ParkingLot[]) => void;
}) {
  const [parkingLots, setParkingLots] = useState(serverData);
  const supabase = createClient();

  useEffect(() => {
    setParkingLots(serverData);
  }, [serverData]);

  useEffect(() => {
    if (onDataUpdate) {
      onDataUpdate(parkingLots);
    }
  }, [parkingLots, onDataUpdate]);

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
                      setParkingLots(data as unknown as ParkingLot[]);
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
