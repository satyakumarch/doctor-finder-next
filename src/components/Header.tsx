
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl text-medical-600">
              Doctor<span className="text-doctor-500">Finder</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-medical-600 font-medium">
              Find Doctors
            </Link>
            <Link to="/" className="text-gray-600 hover:text-medical-600 font-medium">
              Specialties
            </Link>
            <Link to="/" className="text-gray-600 hover:text-medical-600 font-medium">
              Hospitals
            </Link>
            <Link to="/" className="text-gray-600 hover:text-medical-600 font-medium">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-medical-600 hover:bg-medical-700">
            Book Appointment
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
