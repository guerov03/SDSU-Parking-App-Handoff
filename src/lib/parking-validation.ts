export interface ParkingLot 
{
  id?: string;
  name: string;
  capacity: number;
  available: number;
  location: string;
  latitude?: number;
  longitude?: number;
  concept3dId?: string;
}

export interface ValidationResult 
{
  valid: boolean;
  message?: string;
}

/**
 * Validate parking lot name: non-empty, max 100 chars
 */
export function validateParkingLotName(name: string): ValidationResult 
{
  if (!name || name.trim().length === 0) {
    return { valid: false, message: "Parking lot name is required!" };
  }
  if (name.length > 100) {
    return { valid: false, message: "Parking lot name must be 100 characters or less!" };
  }
  return { valid: true };
}

/**
 * Validate capacity: must be a positive integer
 */
export function validateCapacity(capacity: number | string): ValidationResult 
{
  const num = typeof capacity === "string" ? parseInt(capacity, 10) : capacity;

  if (isNaN(num)) {
    return { valid: false, message: "Capacity must be a valid number!" };
  }
  if (num <= 0) {
    return { valid: false, message: "Capacity must be greater than 0!" };
  }
  if (!Number.isInteger(num)) {
    return { valid: false, message: "Capacity must be a whole number!" };
  }
  return { valid: true };
}

/**
 * Validate available spaces: must be non-negative and <= capacity
 */
export function validateAvailable(available: number | string, capacity: number): ValidationResult 
{
  const num = typeof available === "string" ? parseInt(available, 10) : available;

  if (isNaN(num)) {
    return { valid: false, message: "Available spaces must be a valid number!" };
  }
  if (num < 0) {
    return { valid: false, message: "Available spaces cannot be negative!" };
  }
  if (num > capacity) {
    return { valid: false, message: "Available spaces cannot exceed total capacity!" };
  }
  return { valid: true };
}

/**
 * Validate location: non-empty, max 150 chars
 */
export function validateLocation(location: string): ValidationResult 
{
  if (!location || location.trim().length === 0) {
    return { valid: false, message: "Location is required!" };
  }
  if (location.length > 150) 
  {
    return { valid: false, message: "Location must be 150 characters or less!" };
  }
  return { valid: true };
}

/**
 * Validate latitude: must be between -90 and 90
 */
export function validateLatitude(latitude: number | string | undefined): ValidationResult
{
  if (latitude === undefined || latitude === "") 
  {
    return { valid: true };
  }
  const num = typeof latitude === "string" ? parseFloat(latitude) : latitude;

  if (isNaN(num)) 
  {
    return { valid: false, message: "Latitude must be a valid number!" };
  }
  if (num < -90 || num > 90) 
  {
    return { valid: false, message: "Latitude must be between -90 and 90!" };
  }
  return { valid: true };
}

/**
 * Validate longitude: must be between -180 and 180
 */
export function validateLongitude(longitude: number | string | undefined): ValidationResult 
{
  if (longitude === undefined || longitude === "") 
  {
    return { valid: true }; 
  }
  const num = typeof longitude === "string" ? parseFloat(longitude) : longitude;

  if (isNaN(num)) 
  {
    return { valid: false, message: "Longitude must be a valid number!" };
  }
  if (num < -180 || num > 180) 
  {
    return { valid: false, message: "Longitude must be between -180 and 180!" };
  }
  return { valid: true };
}

/**
 * Validate entire parking lot object
 */
export function validateParkingLot(lot: Partial<ParkingLot>): Record<keyof ParkingLot, ValidationResult | null> 
{
  const results: Record<keyof ParkingLot, ValidationResult | null> = 
  {
    id: null,
    name: validateParkingLotName(lot.name ?? ""),
    capacity: validateCapacity(lot.capacity ?? 0),
    available: validateAvailable(lot.available ?? 0, lot.capacity ?? 1),
    location: validateLocation(lot.location ?? ""),
    latitude: validateLatitude(lot.latitude),
    longitude: validateLongitude(lot.longitude),
    concept3dId: null,
  };
  return results;
}

/**
 * Check if all validation results passed
 */
export function allValidationsPassed(results: Record<string, ValidationResult | null>): boolean
{
  return Object.values(results).every((r) => r === null || r.valid);
}

const parkingValidation = {
  validateParkingLotName,
  validateCapacity,
  validateAvailable,
  validateLocation,
  validateLatitude,
  validateLongitude,
  validateParkingLot,
  allValidationsPassed,
};

export default parkingValidation;
