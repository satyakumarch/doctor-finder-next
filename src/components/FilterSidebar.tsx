
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { FilterOptions } from '../types';
import { specialties } from '../data/mockData';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onReset }) => {
  const [experienceRange, setExperienceRange] = useState<number[]>(filters.experience || [0, 30]);
  const [feesRange, setFeesRange] = useState<number[]>(filters.fees || [0, 3000]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>(filters.specialty);
  
  const handleExperienceChange = (value: number[]) => {
    setExperienceRange(value);
  };
  
  const handleFeesChange = (value: number[]) => {
    setFeesRange(value);
  };
  
  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty === selectedSpecialty ? undefined : specialty);
  };
  
  const handleApplyFilters = () => {
    onFilterChange({
      ...filters,
      specialty: selectedSpecialty,
      experience: experienceRange,
      fees: feesRange,
      page: 1, // Reset to first page when filters change
    });
  };
  
  const handleResetFilters = () => {
    setExperienceRange([0, 30]);
    setFeesRange([0, 3000]);
    setSelectedSpecialty(undefined);
    onReset();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-gray-500 text-sm">
          Reset All
        </Button>
      </div>
      
      {/* Specialties */}
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700">Specialty</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <Checkbox 
                id={`specialty-${specialty}`}
                checked={selectedSpecialty === specialty}
                onCheckedChange={() => handleSpecialtyChange(specialty)}
              />
              <label 
                htmlFor={`specialty-${specialty}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {specialty}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Experience */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium text-gray-700">Experience</h3>
          <span className="text-sm text-gray-500">{experienceRange[0]}-{experienceRange[1]} years</span>
        </div>
        <Slider
          defaultValue={[experienceRange[0], experienceRange[1]]}
          max={30}
          step={1}
          value={[experienceRange[0], experienceRange[1]]}
          onValueChange={handleExperienceChange}
          className="mb-2"
        />
      </div>
      
      {/* Consultation Fee */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium text-gray-700">Consultation Fee</h3>
          <span className="text-sm text-gray-500">₹{feesRange[0]}-₹{feesRange[1]}</span>
        </div>
        <Slider
          defaultValue={[feesRange[0], feesRange[1]]}
          max={3000}
          step={100}
          value={[feesRange[0], feesRange[1]]}
          onValueChange={handleFeesChange}
          className="mb-2"
        />
      </div>
      
      {/* Sort By */}
      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: "relevance", label: "Relevance" },
            { value: "fees-low-to-high", label: "Fees: Low to High" },
            { value: "fees-high-to-low", label: "Fees: High to Low" },
            { value: "rating", label: "Rating" },
          ].map((sort) => (
            <div key={sort.value} className="flex items-center">
              <Checkbox 
                id={`sort-${sort.value}`}
                checked={filters.sortBy === sort.value}
                onCheckedChange={() => {
                  onFilterChange({
                    ...filters,
                    sortBy: sort.value as any,
                    page: 1,
                  });
                }}
              />
              <label 
                htmlFor={`sort-${sort.value}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {sort.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={handleApplyFilters} 
        className="w-full bg-medical-600 hover:bg-medical-700"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
