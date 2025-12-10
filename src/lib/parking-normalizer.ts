export interface RawParkingLot {
  id?: string;
  Index?: number | string;
  index?: number | string;
  LotNumber?: string;
  lotnumber?: string;
  TotalSpaces?: number;
  totalspaces?: number;
  TakenSpaces?: number;
  takenspaces?: number;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
  name?: string;
  capacity?: number;
  taken_spaces?: number;
  taken?: number;
  available_spaces?: number;
  concept3d_id?: string | null;
  concept3dId?: string | null;
  concept3d_map_id?: string | null;
}

export interface NormalizedParkingLot {
  id?: string;
  name: string;
  capacity: number;
  taken: number;
  available: number;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
  concept3dId?: string;
}

export function normalizeParkingLot(lot: RawParkingLot): NormalizedParkingLot {
  const name = lot.LotNumber ?? lot.lotnumber ?? lot.name ?? "Unnamed";
  const capacity = (lot.TotalSpaces ?? lot.totalspaces ?? lot.capacity ?? 0) as number;
  const taken = (lot.TakenSpaces ?? lot.takenspaces ?? lot.taken ?? lot.taken_spaces ?? 0) as number;
  const available = (lot.available_spaces ?? capacity - taken) as number;
  const concept3dId =
    lot.concept3d_id ?? lot.concept3dId ?? lot.concept3d_map_id ?? undefined;

  return {
    id: lot.id ?? (typeof lot.Index === "number" ? String(lot.Index) : lot.Index) ?? undefined,
    name,
    capacity,
    taken,
    available,
    location: lot.location,
    latitude: lot.latitude ?? null,
    longitude: lot.longitude ?? null,
    concept3dId: concept3dId ?? undefined,
  };
}
