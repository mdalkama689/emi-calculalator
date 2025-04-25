import React from 'react';
import { LoanOutput } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ResultCardProps {
  results: LoanOutput;
}

const ResultCard: React.FC<ResultCardProps> = ({ results }) => {
  const { emi, totalInterest, totalPayment } = results;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 rounded-lg bg-white shadow-md">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Loan EMI</h3>
        <p className="text-2xl font-bold text-blue-600">
          {formatCurrency(emi)}<span className="text-sm font-normal text-gray-500">/month</span>
        </p>
      </div>
      
      <div className="p-4 rounded-lg bg-white shadow-md">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Interest Payable</h3>
        <p className="text-2xl font-bold text-amber-500">
          {formatCurrency(totalInterest)}
        </p>
      </div>
      
      <div className="p-4 rounded-lg bg-white shadow-md">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Payment</h3>
        <p className="text-2xl font-bold text-green-600">
          {formatCurrency(totalPayment)}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;