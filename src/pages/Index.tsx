
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import { getDoctors } from '../lib/api';
import { Doctor, FilterOptions } from '../types';
import SEO from '../components/SEO';
import DoctorList from '../components/DoctorList';
import DoctorPagination from '../components/DoctorPagination';

const Index: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    specialty: "General Physician",
    experience: [0, 30],
    fees: [0, 3000],
    sortBy: "relevance",
    page: 1,
    limit: 5
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        const response = await getDoctors(filters);
        setDoctors(response.doctors);
        setTotalDoctors(response.total);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctorData();
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      specialty: "General Physician",
      experience: [0, 30],
      fees: [0, 3000],
      sortBy: "relevance",
      page: 1,
      limit: 5
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page
    });
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title="Find General Physicians & Internal Medicine Specialists | DoctorFinder"
        description="Consult with experienced General Physicians and Internal Medicine specialists. Book appointments online with top doctors for check-ups, consultations, and more."
        keywords="general physician, internal medicine, doctor appointment, medical consultation, healthcare, specialist doctor"
        canonicalUrl="https://www.doctorfinder.com/specialties/general-physician-internal-medicine"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              General Physician & Internal Medicine Specialists
            </h1>
            <p className="text-gray-600 mb-4">
              Consult with experienced General Physicians for routine check-ups, preventive care, and chronic disease management.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-1/4">
              <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
            
            {/* Doctor Listings */}
            <div className="w-full lg:w-3/4">
              <DoctorList 
                doctors={doctors}
                loading={loading}
                error={error}
                totalDoctors={totalDoctors}
                onResetFilters={handleResetFilters}
              />
              
              <DoctorPagination 
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </main>
        
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} DoctorFinder. All rights reserved.</p>
              <p className="mt-2">
                Find the right doctors for your health needs. Book appointments online, 24/7.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
