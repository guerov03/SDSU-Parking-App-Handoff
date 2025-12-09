// Displays the current parking lot data aka the table, map, and form
// go to /parkinglot-data to visit this from local host

import { createClient } from "@/lib/supabase/server-client";
import ParkingLotSection from './ParkingLotSection';
import { unstable_noStore as noStore } from "next/cache"; // Import noStore

// This function runs ON THE SERVER
async function getInitialParkingLots() {
  noStore(); // <-- This disables caching
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("parkinglots").select();

    if (error) {
      console.error("Error fetching parking lots:", error);
      return { data: [], error: error.message };
    }

    console.log("Server fetched data:", data);

    return { data: data ?? [], error: null };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch parking lots";
    console.error("Exception fetching parking lots:", err);
    return { data: [], error: errorMessage };
  }
}


export default async function Home() {
  const result = await getInitialParkingLots(); // fetch da data

  return ( // pass it cilent side
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6">Parking Lot Status</h1>
        
        {result.error && ( // error that shows if no table found
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Warning</p>
            <p className="text-sm">{result.error}</p>
            <p className="text-xs mt-1">Make sure your Supabase project has a <code>parkinglots</code> table (lowercase) with columns: index, lotnumber, totalspaces, takenspaces</p>
          </div>
        )}
        
        {/* Form and Map Section */}

        <ParkingLotSection serverData={result.data} />
      </main>
  );
}
