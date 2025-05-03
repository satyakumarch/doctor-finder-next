
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import DoctorCard from '../components/DoctorCard';
import FilterSidebar from '../components/FilterSidebar';
import { getDoctors } from '../lib/api';
import { Doctor, FilterOptions } from '../types';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';

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
      <Helmet>
        <title>Find General Physicians & Internal Medicine Specialists | DoctorFinder</title>
        <meta name="description" content="Consult with experienced General Physicians and Internal Medicine specialists. Book appointments online with top doctors for check-ups, consultations, and more." />
        <meta name="keywords" content="general physician, internal medicine, doctor appointment, medical consultation, healthcare, specialist doctor" />
        <link rel="canonical" href="https://www.doctorfinder.com/specialties/general-physician-internal-medicine" />
        <meta property="og:title" content="Find General Physicians & Internal Medicine Specialists | DoctorFinder" />
        <meta property="og:description" content="Book appointments with experienced General Physicians and Internal Medicine specialists for consultations, check-ups, and medical advice." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.doctorfinder.com/specialties/general-physician-internal-medicine" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Find General Physicians & Internal Medicine Specialists | DoctorFinder" />
        <meta name="twitter:description" content="Book appointments with experienced General Physicians and Internal Medicine specialists for consultations, check-ups, and medical advice." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalSpecialty",
              "name": "General Physician & Internal Medicine",
              "description": "Find and book appointments with General Physicians and Internal Medicine specialists.",
              "medicalSpecialty": {
                "@type": "MedicalSpecialty",
                "name": "Internal Medicine"
              }
            }
          `}
        </script>
      </Helmet>
      
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
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-center">
                  {error}
                </div>
              ) : doctors.length === 0 ? (
                <div className="bg-gray-50 p-8 text-center rounded-md">
                  <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria.</p>
                  <Button onClick={handleResetFilters}>Reset Filters</Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-gray-600">
                    Showing {doctors.length} of {totalDoctors} doctors
                  </div>
                  
                  {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <nav aria-label="Page navigation">
                        <ul className="flex items-center">
                          <li>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
                              disabled={filters.page === 1}
                              className="mr-2"
                            >
                              Previous
                            </Button>
                          </li>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page}>
                              <Button
                                variant={page === filters.page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className="mx-1 w-10 h-10 p-0"
                              >
                                {page}
                              </Button>
                            </li>
                          ))}
                          
                          <li>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(Math.min(totalPages, filters.page + 1))}
                              disabled={filters.page === totalPages}
                              className="ml-2"
                            >
                              Next
                            </Button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </>
              )}
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
