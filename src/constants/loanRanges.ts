import { LoanRanges } from '../types';

export const LOAN_RANGES: Record<string, LoanRanges> = {
  home: {
    amount: {
      min: 0,
      max: 2000000000,
      step: 50000,
      default: 2500000,
    },
    interestRate: {
      min: 0,
      max: 100,
      step: 0.1,
      default: 8.5,
    },
    tenure: {
      min: 0,
      max: 100,
      step: 1,
      default: 20,
    },
  },
  personal: {
    amount: {
      min: 0,
      max: 50000000,
      step: 10000,
      default: 500000,
    },
    interestRate: {
      min: 0,
      max: 100,
      step: 0.1,
      default: 12,
    },
    tenure: {
      min: 0,
      max: 100,
      step: 1,
      default: 3,
    },
  },
  car: {
    amount: {
      min: 0,
      max: 50000000,
      step: 10000,
      default: 800000,
    },
    interestRate: {
      min: 0,
      max: 100,
      step: 0.1,
      default: 9.5,
    },
    tenure: {
      min: 0,
      max: 100,
      step: 1,
      default: 5,
    },
  },
};