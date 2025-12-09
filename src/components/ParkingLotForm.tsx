"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input";
import {
  validateParkingLotName,
  validateCapacity,
  validateAvailable,
  validateLocation,
  validateLatitude,
  validateLongitude,
} from "@/lib/parking-validation";
import type { ParkingLot } from "@/lib/parking-validation";

interface ParkingLotFormProps {
  initialData?: ParkingLot;
  onSubmit: (data: Omit<ParkingLot, "id">) => Promise<void>;
  onCancel?: () => void;
}

export default function ParkingLotForm({ initialData, onSubmit, onCancel }: ParkingLotFormProps) {
  const [formData, setFormData] = useState<Omit<ParkingLot, "id">>({
    name: initialData?.name ?? "",
    capacity: initialData?.capacity ?? 0,
    available: initialData?.available ?? 0,
    location: initialData?.location ?? "",
    latitude: initialData?.latitude,
    longitude: initialData?.longitude,
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({
    name: null,
    capacity: null,
    available: null,
    location: null,
    latitude: null,
    longitude: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string | null> = {};

    const nameCheck = validateParkingLotName(formData.name);
    newErrors.name = nameCheck.valid ? null : nameCheck.message ?? null;

    const capacityCheck = validateCapacity(formData.capacity);
    newErrors.capacity = capacityCheck.valid ? null : capacityCheck.message ?? null;

    const availableCheck = validateAvailable(formData.available, formData.capacity);
    newErrors.available = availableCheck.valid ? null : availableCheck.message ?? null;

    const locationCheck = validateLocation(formData.location);
    newErrors.location = locationCheck.valid ? null : locationCheck.message ?? null;

    const latCheck = validateLatitude(formData.latitude);
    newErrors.latitude = latCheck.valid ? null : latCheck.message ?? null;

    const lonCheck = validateLongitude(formData.longitude);
    newErrors.longitude = lonCheck.valid ? null : lonCheck.message ?? null;

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit form.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">
        {initialData ? "Edit Parking Lot" : "Add New Parking Lot"}
      </h2>

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      {/* Name Field */}
      <div className="flex flex-col py-2">
        <label className="font-semibold mb-1 text-sm">Parking Lot Name *</label>
        <Input
          type="text"
          placeholder="e.g., Parking Lot A"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={!!errors.name}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Capacity Field */}
      <div className="flex flex-col py-2">
        <label className="font-semibold mb-1 text-sm">Total Capacity *</label>
        <Input
          type="number"
          placeholder="e.g., 150"
          value={formData.capacity}
          onChange={(e) => handleChange("capacity", parseInt(e.target.value, 10))}
          error={!!errors.capacity}
          aria-invalid={!!errors.capacity}
        />
        {errors.capacity && <p className="text-red-600 text-sm mt-1">{errors.capacity}</p>}
      </div>

      {/* Available Spaces Field */}
      <div className="flex flex-col py-2">
        <label className="font-semibold mb-1 text-sm">Available Spaces *</label>
        <Input
          type="number"
          placeholder="e.g., 45"
          value={formData.available}
          onChange={(e) => handleChange("available", parseInt(e.target.value, 10))}
          error={!!errors.available}
          aria-invalid={!!errors.available}
        />
        {errors.available && <p className="text-red-600 text-sm mt-1">{errors.available}</p>}
      </div>

      {/* Location Field aka the adddress */}
      <div className="flex flex-col py-2">
        <label className="font-semibold mb-1 text-sm">Location *</label>
        <Input
          type="text"
          placeholder="e.g., 5500 Campanile Drive, San Diego, CA"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          error={!!errors.location}
          aria-invalid={!!errors.location}
        />
        {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
      </div>

      {/* Latitude Field */}
      <div className="flex flex-col py-2">
        <label className="font-semibold mb-1 text-sm">Latitude (Optional)</label>
        <Input
          type="number"
          placeholder="e.g., 32.7751"
          step="0.0001"
          value={formData.latitude ?? ""}
          onChange={(e) => handleChange("latitude", e.target.value ? parseFloat(e.target.value) : "")}
          error={!!errors.latitude}
          aria-invalid={!!errors.latitude}
        />
        {errors.latitude && <p className="text-red-600 text-sm mt-1">{errors.latitude}</p>}
      </div>

      {/* Longitude Field */}
      <div className="flex flex-col py-2">
        <label className="font-semibold mb-1 text-sm">Longitude (Optional)</label>
        <Input
          type="number"
          placeholder="e.g., -117.2488"
          step="0.0001"
          value={formData.longitude ?? ""}
          onChange={(e) => handleChange("longitude", e.target.value ? parseFloat(e.target.value) : "")}
          error={!!errors.longitude}
          aria-invalid={!!errors.longitude}
        />
        {errors.longitude && <p className="text-red-600 text-sm mt-1">{errors.longitude}</p>}
      </div>

      {/* Buttons!!!!!*/}
      <div className="flex gap-4 pt-6">
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          {initialData ? "Update" : "Add"} Parking Lot
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
