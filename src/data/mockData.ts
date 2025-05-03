
import { Doctor, Specialty, DoctorListResponse, FilterOptions } from '../types';

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    experience: 15,
    qualification: "MBBS, MD (Internal Medicine)",
    rating: 4.8,
    reviews: 120,
    availability: {
      nextAvailable: "2023-05-03T10:00:00Z",
      slots: ["10:00 AM", "11:00 AM", "4:00 PM", "5:00 PM"]
    },
    clinicLocation: "Apollo Clinic, Sector 4, Gurgaon",
    consultationFees: 800,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi"]
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    experience: 8,
    qualification: "MBBS, DNB (Family Medicine)",
    rating: 4.6,
    reviews: 85,
    availability: {
      nextAvailable: "2023-05-03T11:30:00Z",
      slots: ["11:30 AM", "12:30 PM", "6:00 PM"]
    },
    clinicLocation: "MediCare Clinic, Connaught Place, New Delhi",
    consultationFees: 600,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    id: "3",
    name: "Dr. Sunil Mehta",
    specialty: "General Physician",
    experience: 20,
    qualification: "MBBS, MD (Internal Medicine), DM (Infectious Diseases)",
    rating: 4.9,
    reviews: 210,
    availability: {
      nextAvailable: "2023-05-04T09:00:00Z",
      slots: ["9:00 AM", "10:00 AM", "5:00 PM", "6:00 PM"]
    },
    clinicLocation: "Mehta Medical Center, Vasant Kunj, New Delhi",
    consultationFees: 1200,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: "4",
    name: "Dr. Anita Desai",
    specialty: "General Physician",
    experience: 12,
    qualification: "MBBS, MD (General Medicine)",
    rating: 4.7,
    reviews: 95,
    availability: {
      nextAvailable: "2023-05-03T14:00:00Z",
      slots: ["2:00 PM", "3:00 PM", "4:00 PM"]
    },
    clinicLocation: "HealthFirst Clinic, Malviya Nagar, New Delhi",
    consultationFees: 700,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: "5",
    name: "Dr. Mohammad Farooq",
    specialty: "General Physician",
    experience: 18,
    qualification: "MBBS, MD (Internal Medicine), Fellowship in Diabetology",
    rating: 4.8,
    reviews: 150,
    availability: {
      nextAvailable: "2023-05-04T10:30:00Z",
      slots: ["10:30 AM", "11:30 AM", "5:30 PM", "6:30 PM"]
    },
    clinicLocation: "Farooq Medical Centre, Okhla, New Delhi",
    consultationFees: 900,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi", "Urdu"]
  },
  {
    id: "6",
    name: "Dr. Kiran Reddy",
    specialty: "General Physician",
    experience: 7,
    qualification: "MBBS, DNB (Family Medicine)",
    rating: 4.5,
    reviews: 65,
    availability: {
      nextAvailable: "2023-05-03T16:00:00Z",
      slots: ["4:00 PM", "5:00 PM", "6:00 PM"]
    },
    clinicLocation: "CityHealth Clinic, Greater Kailash, New Delhi",
    consultationFees: 500,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    id: "7",
    name: "Dr. Rahul Khanna",
    specialty: "General Physician",
    experience: 10,
    qualification: "MBBS, MD (Internal Medicine)",
    rating: 4.7,
    reviews: 88,
    availability: {
      nextAvailable: "2023-05-04T12:00:00Z",
      slots: ["12:00 PM", "1:00 PM", "7:00 PM"]
    },
    clinicLocation: "Khanna Clinic, Dwarka, New Delhi",
    consultationFees: 650,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi"]
  },
  {
    id: "8",
    name: "Dr. Sunita Agarwal",
    specialty: "General Physician",
    experience: 25,
    qualification: "MBBS, MD (General Medicine), PhD",
    rating: 4.9,
    reviews: 230,
    availability: {
      nextAvailable: "2023-05-05T10:00:00Z",
      slots: ["10:00 AM", "11:00 AM", "4:00 PM"]
    },
    clinicLocation: "Agarwal Medical Institute, Rohini, New Delhi",
    consultationFees: 1500,
    photoUrl: "/placeholder.svg",
    languages: ["English", "Hindi"]
  }
];

// Mock API function to simulate doctor listing with filters
export const fetchDoctors = (filters: FilterOptions): Promise<DoctorListResponse> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      let filteredDoctors = [...doctors];
      
      // Apply filters
      if (filters.specialty) {
        filteredDoctors = filteredDoctors.filter(doc => doc.specialty === filters.specialty);
      }
      
      if (filters.experience && filters.experience.length === 2) {
        filteredDoctors = filteredDoctors.filter(doc => 
          doc.experience >= filters.experience![0] && doc.experience <= filters.experience![1]
        );
      }
      
      if (filters.fees && filters.fees.length === 2) {
        filteredDoctors = filteredDoctors.filter(doc => 
          doc.consultationFees >= filters.fees![0] && doc.consultationFees <= filters.fees![1]
        );
      }
      
      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'fees-low-to-high':
            filteredDoctors.sort((a, b) => a.consultationFees - b.consultationFees);
            break;
          case 'fees-high-to-low':
            filteredDoctors.sort((a, b) => b.consultationFees - a.consultationFees);
            break;
          case 'rating':
            filteredDoctors.sort((a, b) => b.rating - a.rating);
            break;
          default:
            // Default sorting by relevance (could be a mix of rating and reviews)
            filteredDoctors.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
        }
      }
      
      // Calculate pagination
      const total = filteredDoctors.length;
      const startIndex = (filters.page - 1) * filters.limit;
      const endIndex = startIndex + filters.limit;
      const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
      
      resolve({
        doctors: paginatedDoctors,
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit)
      });
    }, 500);
  });
};

// List of specialties
export const specialties: Specialty[] = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Gynecologist"
];
