/**
 * Calculate EMI (Equated Monthly Installment)
 * @param principal - Loan amount in rupees
 * @param rate - Annual interest rate (in percentage)
 * @param tenure - Loan tenure in years
 * @returns Monthly EMI amount
 */
export const calculateEMI = (
  principal: number,
  rate: number,
  tenure: number
): number => {
  // Convert interest rate from percentage to decimal and then to monthly rate
  const monthlyRate = rate / 12 / 100;
  
  // Convert tenure from years to months
  const tenureInMonths = tenure * 12;
  
  // Calculate EMI using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  if (monthlyRate === 0) return principal / tenureInMonths;
  
  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureInMonths)) /
    (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
  
  return emi;
};

/**
 * Calculate total payment over the loan tenure
 * @param emi - Monthly EMI amount
 * @param tenure - Loan tenure in years
 * @returns Total payment amount
 */
export const calculateTotalPayment = (emi: number, tenure: number): number => {
  return emi * tenure * 12;
};

/**
 * Calculate total interest payable
 * @param totalPayment - Total payment amount
 * @param principal - Loan amount
 * @returns Total interest payable
 */
export const calculateTotalInterest = (
  totalPayment: number,
  principal: number
): number => {
  return totalPayment - principal;
};

/**
 * Format currency in Indian Rupees
 * @param amount - Amount to format
 * @returns Formatted amount string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};