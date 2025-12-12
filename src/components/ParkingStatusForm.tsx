"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";

interface StatusLotOption {
  id: string;
  name: string;
  capacity: number;
  takenSpaces: number;
}

interface ParkingStatusFormProps {
  lots: StatusLotOption[];
  isAdmin: boolean;
  onUpdate: (payload: { lotId: string; takenSpaces: number }) => Promise<void>;
  onRequest?: (payload: { lotId: string; takenSpaces: number }) => Promise<void>;
}

export default function ParkingStatusForm({
  lots,
  isAdmin,
  onUpdate,
  onRequest,
}: ParkingStatusFormProps) {
  const [selectedLotId, setSelectedLotId] = useState<string>(() => lots[0]?.id ?? "");
  const [takenSpaces, setTakenSpaces] = useState<number>(lots[0]?.takenSpaces ?? 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const currentLot = useMemo(
    () => lots.find((lot) => lot.id === selectedLotId),
    [lots, selectedLotId],
  );

  useEffect(() => {
    if (!lots.find((lot) => lot.id === selectedLotId) && lots[0]?.id) {
      setSelectedLotId(lots[0].id);
      setTakenSpaces(lots[0].takenSpaces);
    }
  }, [lots, selectedLotId]);

  const [hasUserEdited, setHasUserEdited] = useState(false);
  
  useEffect(() => {
    if (!currentLot || hasUserEdited) {
      return;
    }
    setTakenSpaces(currentLot.takenSpaces);
  }, [currentLot, hasUserEdited]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentLot) {
      setError("Please select a parking lot to update.");
      return;
    }

    if (takenSpaces < 0 || takenSpaces > currentLot.capacity) {
      setError("Taken spaces must be between 0 and the lot capacity.");
      return;
    }

    try {
      setIsSubmitting(true);
      if (isAdmin) {
        await onUpdate({ lotId: currentLot.id, takenSpaces });
        setSuccess("Parking status updated.");
      } else {
        if (!onRequest) {
          throw new Error("Request routing is not configured.");
        }
        await onRequest({ lotId: currentLot.id, takenSpaces });
        setSuccess("Request submitted for admin approval.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update parking status.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-sm">Select Parking Lot *</label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#d41735] focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
            value={selectedLotId}
            onChange={(event) => {
              const newId = event.target.value;
              setSelectedLotId(newId);
              // Reset edited flag so the takenSpaces syncs from the newly selected lot
              setHasUserEdited(false);
              const newLot = lots.find((l) => l.id === newId);
              if (newLot) setTakenSpaces(newLot.takenSpaces ?? 0);
            }}
            disabled={lots.length === 0 || isSubmitting}
          >
            {lots.length === 0 ? (
              <option value="">No parking lots available</option>
            ) : (
              lots.map((lot) => (
                <option key={lot.id} value={lot.id}>
                  {lot.name} (Capacity: {lot.capacity})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-sm">Taken Spaces *</label>
          <Input
            type="number"
            placeholder="e.g., 45"
            value={String(takenSpaces ?? 0)}
            min={0}
            max={currentLot?.capacity ?? undefined}
            onChange={(event) => {
              const parsed = Number(event.target.value);
              const value = Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0;
              setTakenSpaces(value);
              setHasUserEdited(true);
            }}
            disabled={!currentLot || isSubmitting}
            aria-invalid={takenSpaces < 0 || (currentLot ? takenSpaces > currentLot.capacity : false)}
          />
          {currentLot && (
            <p className="text-xs text-gray-500 mt-1">
              Available spaces: {currentLot.capacity - takenSpaces}
            </p>
          )}
        </div>
      </div>

      {!isAdmin && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded text-sm">
          Your update will be queued for an admin to review before it is applied.
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <Button type="submit" disabled={lots.length === 0 || isSubmitting} isLoading={isSubmitting}>
        {isAdmin ? "Update Status" : "Submit Status Request"}
      </Button>
    </form>
  );
}
