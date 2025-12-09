"use client";

import { useState } from "react";
import ParkingMapDisplay from "@/components/ParkingMapDisplay";
import ParkingLotForm from "@/components/ParkingLotForm";
import RealtimeParkingLots from "@/components/RealtimeParkingLots";
import type { ParkingLot as FormParkingLot } from "@/lib/parking-validation";

interface ParkingLotSectionProps 
{
  serverData: any[];
}

export default function ParkingLotSection({ serverData }: ParkingLotSectionProps) 
{
  const [selectedLot, setSelectedLot] = useState<{
    name: string;
    capacity: number;
    location: string;
    latitude?: number;
    longitude?: number;
  } | null>(null);

  const handleFormSubmit = async (data: Omit<FormParkingLot, "id">) => 
    { // display the newly added lot after submission
    setSelectedLot({
      name: data.name,
      capacity: data.capacity,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  const handleLotClick = (lot: any) => 
    {
    setSelectedLot({
      name: (lot.LotNumber ?? lot.lotnumber ?? lot.name) as string,
      capacity: (lot.TotalSpaces ?? lot.totalspaces ?? lot.capacity) as number,
      location: (lot.location ?? "No location provided") as string,
      latitude: lot.latitude,
      longitude: lot.longitude,
    });
  };

  return (
    <div className="space-y-10">
      {/* Tells it the layout: table left, map center stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Parking Lots</h2>
          <div className="bg-white rounded-lg shadow-md p-6 h-[640px] overflow-auto">
            <RealtimeParkingLots serverData={serverData} onLotClick={handleLotClick} />
          </div>
        </div>

        {/* da map */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="w-full lg:w-[85%] h-[760px]">
            <ParkingMapDisplay selectedLot={selectedLot} />
          </div>
        </div>
      </div>

      {/* Full widith form below both components */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Add Parking Lot</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ParkingLotForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}
