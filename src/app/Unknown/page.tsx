import Image from "next/image";
import { createClient } from "@/lib/supabase/server-client";
import RealtimeParkingLots from "../realtime-parking-lots/page.jsx"; // Import your new component

// This function ONLY fetches and returns the data array
async function getInitialParkingLots() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("ParkingLots").select();
  if (error) {
    console.error("Error fetching parking lots:", error);
  }
  return data ?? []; // Return the data array (or an empty one)
}

// This new component receives the data and renders it as a table
function ParkingLotsTable({ parkingLots }: { parkingLots: any[] }) {
  if (!parkingLots || parkingLots.length === 0) {
    return <p>No parking lot data available.</p>;
  }
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", color: "white" }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid white", padding: "8px" }}>
            Lot Name
          </th>
          <th style={{ border: "1px solid white", padding: "8px" }}>
            Total Spaces
          </th>
          <th style={{ border: "1px solid white", padding: "8px" }}>
            Taken Spaces
          </th>
        </tr>
      </thead>
      <tbody>
        {parkingLots.map((lot) => (
          <tr key={lot.Index}>
            <td style={{ border: "1px solid white", padding: "8px" }}>
              {lot.LotNumber}
            </td>
            <td style={{ border: "1px solid white", padding: "8px" }}>
              {lot.TotalSpaces}
            </td>
            <td style={{ border: "1px solid white", padding: "8px" }}>
              {lot.TakenSpaces}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function Home() {
  // Fetch the raw data array on the server
  const initialParkingLots = await getInitialParkingLots();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Render the realtime component with the initial server data */}
        <RealtimeParkingLots serverData={initialParkingLots} />

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
