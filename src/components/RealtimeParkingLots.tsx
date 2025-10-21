"use client";

import { createClient } from "@/lib/supabase/browser-client";
import { useEffect, useState } from "react";

// This is the table component
function ParkingLotsTable({ parkingLots }: { parkingLots: any[] }) {
  if (!parkingLots || parkingLots.length === 0) {
    return <p>No parking lot data available.</p>;
  }
  return (
      <table
          style={{ width: "100%", borderCollapse: "collapse", color: "black" }}
      >
        <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            Lot Name
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            Total Spaces
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            Taken Spaces
          </th>
        </tr>
        </thead>
        <tbody>
        {parkingLots.map((lot) => (
            <tr key={lot.Index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {lot.LotNumber}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {lot.TotalSpaces}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {lot.TakenSpaces}
              </td>
            </tr>
        ))}
        </tbody>
      </table>
  );
}

// This is the main realtime component that wraps the table
export default function RealtimeParkingLots({
                                              serverData,
                                            }: {
  serverData: any[];
}) {
  const [parkingLots, setParkingLots] = useState(serverData);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
        .channel("realtime parkinglots")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "ParkingLots" },
            (payload) => {
              const fetchUpdatedData = async () => {
                const { data } = await supabase.from("ParkingLots").select();
                if (data) {
                  setParkingLots(data);
                }
              };
              fetchUpdatedData();
            },
        )
        .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Render the table component with the live data
  return <ParkingLotsTable parkingLots={parkingLots} />;
}