import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { LoanOutput } from '../types';
import { formatCurrency } from '../utils/calculations';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface PaymentChartProps {
  amount: number;
  results: LoanOutput;
}

const PaymentChart: React.FC<PaymentChartProps> = ({ amount, results }) => {
  const { totalInterest } = results;

  // Data for pie chart
  const pieData = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [amount, totalInterest],
        backgroundColor: ['#2563EB', '#F59E0B'],
        hoverBackgroundColor: ['#1D4ED8', '#D97706'],
        borderWidth: 1,
        borderColor: ['#ffffff', '#ffffff'],
      },
    ],
  };

  // Options for pie chart
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    },
  };

  // Data for year-wise bar chart
  const generateYearlyData = () => {
    const principal = amount;
    const emi = results.emi;
    const totalPayment = results.totalPayment;
    const tenureInYears = Math.ceil(totalPayment / (emi * 12));
    
    const yearlyPrincipal = [];
    const yearlyInterest = [];
    const yearLabels = [];
    
    let remainingPrincipal = principal;
    
    for (let year = 1; year <= Math.min(tenureInYears, 10); year++) {
      const yearlyPayment = emi * 12;
      let yearInterest = 0;
      let yearPrincipal = 0;
      
      if (remainingPrincipal > yearlyPayment) {
        yearInterest = yearlyPayment * (totalInterest / totalPayment);
        yearPrincipal = yearlyPayment - yearInterest;
        remainingPrincipal -= yearPrincipal;
      } else {
        yearPrincipal = remainingPrincipal;
        yearInterest = Math.max(0, yearlyPayment - yearPrincipal);
        remainingPrincipal = 0;
      }
      
      yearlyPrincipal.push(yearPrincipal);
      yearlyInterest.push(yearInterest);
      yearLabels.push(`Year ${year}`);
      
      if (remainingPrincipal <= 0) break;
    }
    
    return {
      labels: yearLabels,
      datasets: [
        {
          label: 'Principal',
          data: yearlyPrincipal,
          backgroundColor: '#2563EB',
        },
        {
          label: 'Interest',
          data: yearlyInterest,
          backgroundColor: '#F59E0B',
        },
      ],
    };
  };

  const barData = generateYearlyData();
  
  // Options for bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Yearly Payment Breakdown',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return `${context.dataset.label}: ${formatCurrency(value)}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-center">Payment Distribution</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Payment Breakdown</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4 text-center">Year-wise Payments</h3>
          <div className="h-[300px]">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentChart;