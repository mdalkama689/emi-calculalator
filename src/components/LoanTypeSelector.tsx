import React from 'react';
import { Home, User, Car } from 'lucide-react';
import { LoanType } from '../types';

interface LoanTypeSelectorProps {
  selectedType: LoanType;
  onChange: (type: LoanType) => void;
}

const LoanTypeSelector: React.FC<LoanTypeSelectorProps> = ({
  selectedType,
  onChange,
}) => {
  const loanTypes: { type: LoanType; label: string; icon: React.ReactNode }[] = [
    {
      type: 'home',
      label: 'Home Loan',
      icon: <Home size={20} />,
    },
    {
      type: 'personal',
      label: 'Personal Loan',
      icon: <User size={20} />,
    },
    {
      type: 'car',
      label: 'Car Loan',
      icon: <Car size={20} />,
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
      {loanTypes.map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`flex items-center justify-center px-4 py-2 rounded-lg ${
            selectedType === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-colors duration-200 ease-in-out`}
        >
          <span className="mr-2">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LoanTypeSelector;