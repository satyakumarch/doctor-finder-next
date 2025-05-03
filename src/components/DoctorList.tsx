
import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';
import { Button } from '@/components/ui/button';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  totalDoctors: number;
  onResetFilters: () => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ 
  doctors, 
  loading, 
  error, 
  totalDoctors, 
  onResetFilters 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md text-center">
        {error}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-gray-50 p-8 text-center rounded-md">
        <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria.</p>
        <Button onClick={onResetFilters}>Reset Filters</Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 text-gray-600">
        Showing {doctors.length} of {totalDoctors} doctors
      </div>
      
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </>
  );
};

export default DoctorList;
