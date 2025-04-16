import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

const FinancialSummary = () => {
  const { currentBalance, monthlyIncome, monthlyExpenses, formatCurrency } = useFinance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-500">Current Balance</h3>
            <p className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(currentBalance)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${currentBalance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <Wallet size={24} className={currentBalance >= 0 ? 'text-green-600' : 'text-red-600'} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-500">Monthly Income</h3>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(monthlyIncome)}</p>
          </div>
          <div className="p-3 rounded-full bg-green-100">
            <ArrowUpRight size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-500">Monthly Expenses</h3>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(monthlyExpenses)}</p>
          </div>
          <div className="p-3 rounded-full bg-red-100">
            <ArrowDownRight size={24} className="text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;