//This folder is what actually calls, and displays the current parking lot data
//This runs on the server-side with the initial data fetch

import { createClient } from "@/lib/supabase/server-client";
import RealtimeParkingLots from '@/components/RealtimeParkingLots';
import { unstable_noStore as noStore } from "next/cache"; // Import noStore

// This function runs ON THE SERVER
async function getInitialParkingLots() {
  noStore(); // <-- This disables caching
  const supabase = await createClient();
  const { data, error } = await supabase.from("ParkingLots").select();

  if (error) {
    console.error("Error fetching parking lots:", error);
  }

  // Log the data to be sure
  console.log("Server fetched data:", data);

  return data ?? [];
}

// This is your main page, it's a Server Component
export default async function Home() {
  // 1. Fetch the data on the server
  const initialParkingLots = await getInitialParkingLots();

  // 2. Pass the server data to the client component
  // This removes all the "extra stuff" you didn't want.
  return (
      <main>
        <h1>Parking Lot Status</h1>
        <RealtimeParkingLots serverData={initialParkingLots} />
      </main>
  );
}
