
import React from 'react';
import { Button } from '@/components/ui/button';

interface DoctorPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DoctorPagination: React.FC<DoctorPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <nav aria-label="Page navigation">
        <ul className="flex items-center">
          <li>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Previous
            </Button>
          </li>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <Button
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
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
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-2"
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DoctorPagination;
