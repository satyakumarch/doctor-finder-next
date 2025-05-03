
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number; // in years
  qualification: string;
  rating: number;
  reviews: number;
  availability: {
    nextAvailable: string; // ISO date string
    slots: string[]; // time slots
  };
  clinicLocation: string;
  consultationFees: number;
  photoUrl: string;
  languages: string[];
}

export type Specialty = 
  | "General Physician"
  | "Cardiologist"
  | "Dermatologist"
  | "Pediatrician"
  | "Orthopedic"
  | "Gynecologist";

export interface FilterOptions {
  specialty?: string;
  experience?: number[];
  fees?: number[];
  availability?: string; // "today" | "tomorrow" | "this-week"
  sortBy?: "relevance" | "fees-low-to-high" | "fees-high-to-low" | "rating";
  page: number;
  limit: number;
}

export interface DoctorListResponse {
  doctors: Doctor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
