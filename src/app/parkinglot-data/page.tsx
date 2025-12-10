// Displays the current parking lot data aka the table, map, and form
// go to /parkinglot-data to visit this from local host

import { createClient } from "@/lib/supabase/server-client";
import ParkingLotSection from './ParkingLotSection';
import { unstable_noStore as noStore } from "next/cache";

// This function runs ON THE SERVER
async function getInitialParkingLots() 
{
  noStore();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("parking_lots_with_available").select();

    if (error) 
      {
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

  return (
    // pass it cilent side
    <main className="p-6">
      <div
        className="origin-top-left scale-[0.85] transform-gpu space-y-6 w-full"
        style={{ width: "117.7%" }}
      >
        <h1
          className="text-2xl font-bold inline-flex items-center px-5 py-2 rounded-md"
          style={{ color: "#ffffff", backgroundColor: "#d41735" }}
        >
          Parking Lots Information
        </h1>

        {result.error && ( // error that shows if no table found
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Warning</p>
            <p className="text-sm">{result.error}</p>
            <p className="text-xs mt-1">
              Make sure your Supabase project has a <code>parkinglots</code> table (lowercase) with columns:
              index, lotnumber, capacity, takenspaces
            </p>
          </div>
        )}

        <ParkingLotSection serverData={result.data} />
      </div>
    </main>
  );
}
