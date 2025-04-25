export type LoanType = 'home' | 'personal' | 'car';

export interface LoanInput {
  amount: number;
  interestRate: number;
  tenure: number;
}

export interface LoanOutput {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

export interface LoanRanges {
  amount: {
    min: number;
    max: number;
    step: number;
    default: number;
  };
  interestRate: {
    min: number;
    max: number;
    step: number;
    default: number;
  };
  tenure: {
    min: number;
    max: number;
    step: number;
    default: number;
  };
}