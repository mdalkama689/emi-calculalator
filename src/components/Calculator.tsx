import React, { useState, useEffect } from 'react';
import RangeInput from './RangeInput';
import LoanTypeSelector from './LoanTypeSelector';
import ResultCard from './ResultCard';
import PaymentChart from './PaymentChart';
import { LoanType, LoanInput, LoanOutput } from '../types';
import { LOAN_RANGES } from '../constants/loanRanges';
import {
  calculateEMI,
  calculateTotalPayment,
  calculateTotalInterest,
  formatCurrency,
} from '../utils/calculations';

const Calculator: React.FC = () => {
  const [loanType, setLoanType] = useState<LoanType>('home');
  const [loanInput, setLoanInput] = useState<LoanInput>({
    amount: LOAN_RANGES.home.amount.default,
    interestRate: LOAN_RANGES.home.interestRate.default,
    tenure: LOAN_RANGES.home.tenure.default,
  });
  const [results, setResults] = useState<LoanOutput>({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  // Update results whenever inputs change
  useEffect(() => {
    calculateResults();
  }, [loanInput]);

  // Update inputs when loan type changes
  useEffect(() => {
    setLoanInput({
      amount: LOAN_RANGES[loanType].amount.default,
      interestRate: LOAN_RANGES[loanType].interestRate.default,
      tenure: LOAN_RANGES[loanType].tenure.default,
    });
  }, [loanType]);

  const calculateResults = () => {
    const { amount, interestRate, tenure } = loanInput;
    
    const emi = calculateEMI(amount, interestRate, tenure);
    const totalPayment = calculateTotalPayment(emi, tenure);
    const totalInterest = calculateTotalInterest(totalPayment, amount);
    
    setResults({
      emi,
      totalInterest,
      totalPayment,
    });
  };

  const handleAmountChange = (value: number) => {
    setLoanInput((prev) => ({ ...prev, amount: value }));
  };

  const handleInterestRateChange = (value: number) => {
    setLoanInput((prev) => ({ ...prev, interestRate: value }));
  };

  const handleTenureChange = (value: number) => {
    setLoanInput((prev) => ({ ...prev, tenure: value }));
  };

  const formatAmount = (value: number) => formatCurrency(value);
  const formatInterest = (value: number) => `${value.toFixed(1)}%`;
  const formatTenure = (value: number) => `${value} ${value === 1 ? 'Year' : 'Years'}`;

  return (
    <div className="p-4 md:p-6 bg-gray-50 rounded-xl shadow-lg max-w-5xl mx-auto">
      {/* <h2 className="text-2xl font-bold text-center mb-6">EMI Calculator</h2> */}
      
      <LoanTypeSelector selectedType={loanType} onChange={setLoanType} />
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <RangeInput
          label="Loan Amount"
          value={loanInput.amount}
          min={LOAN_RANGES[loanType].amount.min}
          max={LOAN_RANGES[loanType].amount.max}
          step={LOAN_RANGES[loanType].amount.step}
          onChange={handleAmountChange}
          format={formatAmount}
        />
        
        <RangeInput
          label="Interest Rate"
          value={loanInput.interestRate}
          min={LOAN_RANGES[loanType].interestRate.min}
          max={LOAN_RANGES[loanType].interestRate.max}
          step={LOAN_RANGES[loanType].interestRate.step}
          onChange={handleInterestRateChange}
          format={formatInterest}
          suffix="%"
        />
        
        <RangeInput
          label="Loan Tenure"
          value={loanInput.tenure}
          min={LOAN_RANGES[loanType].tenure.min}
          max={LOAN_RANGES[loanType].tenure.max}
          step={LOAN_RANGES[loanType].tenure.step}
          onChange={handleTenureChange}
          format={formatTenure}
          suffix="Years"
        />
      </div>
      
      <ResultCard results={results} />
      
      <PaymentChart amount={loanInput.amount} results={results} />
    </div>
  );
};

export default Calculator;