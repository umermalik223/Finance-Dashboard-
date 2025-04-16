import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

const FinancialSummary = () => {
  const { currentBalance, monthlyIncome, monthlyExpenses, formatCurrency } = useFinance();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm text-indigo-200">Current Balance</h3>
            <p className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(currentBalance)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${currentBalance >= 0 ? 'bg-green-400/10' : 'bg-red-400/10'}`}>
            <Wallet size={24} className={currentBalance >= 0 ? 'text-green-400' : 'text-red-400'} />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm text-indigo-200">Monthly Income</h3>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(monthlyIncome)}</p>
          </div>
          <div className="p-3 rounded-full bg-green-400/10">
            <ArrowUpRight size={24} className="text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/5 sm:col-span-2 lg:col-span-1">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm text-indigo-200">Monthly Expenses</h3>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(monthlyExpenses)}</p>
          </div>
          <div className="p-3 rounded-full bg-red-400/10">
            <ArrowDownRight size={24} className="text-red-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;