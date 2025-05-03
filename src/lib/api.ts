
import { Doctor, FilterOptions, DoctorListResponse } from '../types';
import { fetchDoctors } from '../data/mockData';

// This is a wrapper around our mock data API
// In a real application, this would be replaced with actual API calls

export const getDoctors = async (filterOptions: FilterOptions): Promise<DoctorListResponse> => {
  // In a real application, replace this with a fetch call to your backend API
  return await fetchDoctors(filterOptions);
};

export const addDoctor = async (doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
  // This is a mock implementation
  // In a real application, replace with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDoctor = {
        ...doctor,
        id: `new-${Date.now()}`
      };
      resolve(newDoctor);
    }, 500);
  });
};
