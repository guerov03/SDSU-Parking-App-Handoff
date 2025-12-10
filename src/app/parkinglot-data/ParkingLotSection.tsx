"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import ParkingMapDisplay from "@/components/ParkingMapDisplay";
import ParkingLotForm from "@/components/ParkingLotForm";
import ParkingStatusForm from "@/components/ParkingStatusForm";
import RealtimeParkingLots from "@/components/RealtimeParkingLots";
import { createClient } from "@/lib/supabase/browser-client";
import type { ParkingLot } from "@/lib/parking-validation";
import {
  normalizeParkingLot,
  type RawParkingLot,
  type NormalizedParkingLot,
} from "@/lib/parking-normalizer";

type ParkingLotRecord = RawParkingLot;
type LotOption = NormalizedParkingLot & { id: string };

interface ParkingLotSectionProps {
  serverData: ParkingLotRecord[];
}

interface StatusRequest {
  id: string;
  lot_id: string;
  lot_name: string | null;
  requested_taken_spaces: number;
  requested_by_email: string | null;
  requested_at: string;
}

const ADMIN_DENIED_MESSAGE =
  "Admin access is required to add lots or update capacity/status directly.";

function toLotOptions(records: ParkingLotRecord[]): LotOption[] {
  return (records ?? []).map((record, index) => {
    const normalized = normalizeParkingLot(record);
    const fallbackId =
      normalized.id ??
      record.id ??
      (record.Index !== undefined ? String(record.Index) : undefined) ??
      (record.index !== undefined ? String(record.index) : undefined) ??
      record.LotNumber ??
      record.lotnumber ??
      record.name ??
      `lot-${index}`;
    return {
      ...normalized,
      id: fallbackId,
    };
  });
}

export default function ParkingLotSection({ serverData }: ParkingLotSectionProps) {
  const supabase = useMemo(() => createClient(), []);
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [lotOptions, setLotOptions] = useState<LotOption[]>(() => toLotOptions(serverData ?? []));
  const [activeForm, setActiveForm] = useState<"add" | "status">("add");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [statusRequests, setStatusRequests] = useState<StatusRequest[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(null);

  useEffect(() => {
    setLotOptions(toLotOptions(serverData ?? []));
  }, [serverData]);

  useEffect(() => {
    let isMounted = true;
    const determineAdminAccess = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!isMounted) {
          return;
        }

        setCurrentUser(user ?? null);

        const metadataRole =
          (user?.app_metadata?.role ?? user?.user_metadata?.role ?? "")
            ?.toString()
            .toLowerCase() ?? "";
        const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter(Boolean);
        const hasEmailAccess =
          user?.email && adminEmails.length > 0
            ? adminEmails.includes(user.email.toLowerCase())
            : false;

        setIsAdmin(metadataRole === "admin" || hasEmailAccess);
      } catch (err) {
        console.warn("Unable to determine admin access", err);
        setIsAdmin(false);
        setCurrentUser(null);
      }
    };

    void determineAdminAccess();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const refreshStatusRequests = useCallback(async () => {
    if (!isAdmin) {
      setStatusRequests([]);
      return;
    }
    const { data, error } = await supabase
      .from("parking_status_requests")
      .select("*")
      .eq("status", "pending")
      .order("requested_at", { ascending: false });

    if (error) {
      setRequestError(error.message ?? "Failed to load pending requests.");
      setStatusRequests([]);
      return;
    }

    setRequestError(null);
    setStatusRequests((data ?? []) as StatusRequest[]);
  }, [isAdmin, supabase]);

  useEffect(() => {
    void refreshStatusRequests();
  }, [refreshStatusRequests]);

  const handleFormSubmit = async (data: Omit<ParkingLot, "id">) => {
    if (!isAdmin) {
      throw new Error("Admin access is required to add new parking lots.");
    }
    const takenSpaces = Math.max(0, data.capacity - data.available);
    const { data: insertedLot, error } = await supabase
      .from("parkinglots")
      .insert({
        name: data.name,
        capacity: data.capacity,
        taken_spaces: takenSpaces,
        location: data.location,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        concept3d_id: data.concept3dId ?? null,
      })
      .select()
      .single();

    if (error || !insertedLot) {
      throw new Error(error?.message ?? "Failed to add parking lot.");
    }

    const normalized = normalizeParkingLot(insertedLot as RawParkingLot);
    setSelectedLot({
      id: normalized.id,
      name: normalized.name,
      capacity: normalized.capacity,
      available: normalized.available,
      location: normalized.location ?? "",
      latitude: normalized.latitude ?? undefined,
      longitude: normalized.longitude ?? undefined,
      concept3dId: normalized.concept3dId,
    });
  };

  const handleStatusUpdate = async ({ lotId, takenSpaces }: { lotId: string; takenSpaces: number }) => {
    if (!isAdmin) {
      throw new Error("Admin access is required to update parking status.");
    }

    const { data: updatedLot, error } = await supabase
      .from("parkinglots")
      .update({ taken_spaces: takenSpaces })
      .eq("id", lotId)
      .select()
      .single();

    if (error || !updatedLot) {
      throw new Error(error?.message ?? "Failed to update parking status.");
    }

    setSelectedLot((current) => {
      if (!current || current.id !== updatedLot.id) {
        return current;
      }
      return {
        ...current,
        available: updatedLot.capacity - updatedLot.taken_spaces,
      };
    });
  };

  const handleStatusRequest = async ({ lotId, takenSpaces }: { lotId: string; takenSpaces: number }) => {
    const lot = lotOptions.find((option) => option.id === lotId);
    const { error } = await supabase.from("parking_status_requests").insert({
      lot_id: lotId,
      requested_taken_spaces: takenSpaces,
      requested_by: currentUser?.id ?? null,
      requested_by_email: currentUser?.email ?? null,
      lot_name: lot?.name ?? null,
      status: "pending",
    });

    if (error) {
      throw new Error(error.message ?? "Failed to submit status request.");
    }
  };

  const handleLotClick = (lot: NormalizedParkingLot) => {
    const lotId =
      lot.id ??
      String(
        lot.name ??
          "parking-lot",
      );

    setSelectedLot({
      id: lotId,
      name: lot.name,
      capacity: lot.capacity,
      location: lot.location ?? "No location provided",
      latitude: lot.latitude ?? undefined,
      longitude: lot.longitude ?? undefined,
      available: lot.available,
      concept3dId: lot.concept3dId,
    });
  };

  const approveStatusRequest = async (request: StatusRequest) => {
    try {
      setRequestError(null);
      setProcessingRequestId(request.id);
      await handleStatusUpdate({ lotId: request.lot_id, takenSpaces: request.requested_taken_spaces });
      const { error } = await supabase
        .from("parking_status_requests")
        .update({ status: "approved" })
        .eq("id", request.id);
      if (error) {
        throw new Error(error.message);
      }
      await refreshStatusRequests();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to approve request.";
      setRequestError(message);
    } finally {
      setProcessingRequestId(null);
    }
  };

  const rejectStatusRequest = async (requestId: string) => {
    try {
      setRequestError(null);
      setProcessingRequestId(requestId);
      const { error } = await supabase
        .from("parking_status_requests")
        .update({ status: "rejected" })
        .eq("id", requestId);
      if (error) {
        throw new Error(error.message);
      }
      await refreshStatusRequests();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to reject request.";
      setRequestError(message);
    } finally {
      setProcessingRequestId(null);
    }
  };

  const statusLotOptions = useMemo(
    () =>
      lotOptions.map((lot) => ({
        id: lot.id,
        name: lot.name,
        capacity: lot.capacity,
        takenSpaces: lot.taken,
      })),
    [lotOptions],
  );

  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-4">
          <div className="bg-[#f5f5f7] border border-[#e0e4f2] rounded-2xl p-3 sm:p-4 h-[720px] overflow-auto">
            <RealtimeParkingLots
              serverData={serverData}
              onLotClick={handleLotClick}
              onDataUpdate={(lots) => setLotOptions(toLotOptions(lots as ParkingLotRecord[]))}
            />
          </div>
        </div>

        <div className="xl:col-span-8 w-full">
          <div className="h-[780px] rounded-2xl border border-[#e2e4eb] overflow-hidden shadow-sm">
            <ParkingMapDisplay selectedLot={selectedLot} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          className="text-2xl font-semibold inline-flex items-center px-5 py-2 rounded-xl shadow-sm"
          style={{ color: "#ffffff", backgroundColor: "#d41735" }}
        >
          Manage Parking Lots
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { key: "add", label: "Add Lot" },
              { key: "status", label: "Update Status" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveForm(tab.key as "add" | "status")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                  activeForm === tab.key
                    ? "bg-[#d41735] text-white border-[#d41735]"
                    : "bg-[#f5f5f7] text-gray-700 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeForm === "add" ? (
            <ParkingLotForm
              onSubmit={handleFormSubmit}
              canEdit={isAdmin}
              disabledMessage={ADMIN_DENIED_MESSAGE}
            />
          ) : (
            <ParkingStatusForm
              lots={statusLotOptions}
              isAdmin={isAdmin}
              onUpdate={handleStatusUpdate}
              onRequest={handleStatusRequest}
            />
          )}
        </div>

        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-3">Pending Status Requests</h3>
            {requestError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3 text-sm">
                {requestError}
              </div>
            )}
            {statusRequests.length === 0 ? (
              <p className="text-sm text-gray-500">
                No pending requests at the moment. Requests submitted by drivers will appear here.
              </p>
            ) : (
              <ul className="space-y-3">
                {statusRequests.map((request) => (
                  <li
                    key={request.id}
                    className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 bg-[#f9fafb]"
                  >
                    <div className="text-sm text-gray-800">
                      <p className="font-semibold text-base">
                        {request.lot_name ?? "Parking lot"}
                      </p>
                      <p>
                        Requested taken spaces:{" "}
                        <span className="font-semibold">{request.requested_taken_spaces}</span>
                      </p>
                      {request.requested_by_email && (
                        <p className="text-xs text-gray-500">
                          Requested by {request.requested_by_email}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void approveStatusRequest(request)}
                        disabled={processingRequestId === request.id}
                        className="px-3 py-1.5 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => void rejectStatusRequest(request.id)}
                        disabled={processingRequestId === request.id}
                        className="px-3 py-1.5 rounded-md bg-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-400 disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
