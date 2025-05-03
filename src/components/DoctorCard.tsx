
import React from 'react';
import { Doctor } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <img 
              src={doctor.photoUrl} 
              alt={doctor.name} 
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <span className="bg-doctor-100 text-doctor-700 text-xs font-medium px-2 py-0.5 rounded">
                  {doctor.rating} ★
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  ({doctor.reviews} reviews)
                </span>
              </div>
              <span className="block text-xs text-gray-500">{doctor.experience} Years Exp</span>
            </div>
          </div>

          <div className="md:w-2/4 p-4">
            <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-medical-600 mb-2">{doctor.specialty}</p>
            <p className="text-sm text-gray-500 mb-1">{doctor.qualification}</p>
            <p className="text-sm text-gray-500 mb-2">
              <span className="inline-block bg-blue-50 text-medical-700 rounded-full px-2 py-0.5 text-xs mr-2">
                {doctor.languages.join(", ")}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <svg className="w-4 h-4 inline mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {doctor.clinicLocation}
            </p>
          </div>

          <div className="md:w-1/4 p-4 bg-gray-50">
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-sm font-medium mb-1">Next Available</p>
                <p className="text-xs text-gray-500 mb-3">
                  {new Date(doctor.availability.nextAvailable).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {doctor.availability.slots.slice(0, 3).map((slot, index) => (
                    <span key={index} className="inline-block bg-white border border-gray-200 rounded px-2 py-1 text-xs">
                      {slot}
                    </span>
                  ))}
                  {doctor.availability.slots.length > 3 && (
                    <span className="inline-block bg-white border border-gray-200 rounded px-2 py-1 text-xs">
                      +{doctor.availability.slots.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold text-doctor-700 mb-2">
                  ₹{doctor.consultationFees}
                </p>
                <Button className="w-full bg-medical-600 hover:bg-medical-700">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
