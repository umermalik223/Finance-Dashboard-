import React from 'react';
import { Activity } from 'lucide-react';
import { useFinance } from '../../contexts/FinanceContext';

const BudgetProgressList = () => {
  const { budgets, formatCurrency } = useFinance();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Activity size={18} className="mr-2 text-indigo-600" />
        Budget Progress
      </h3>
      <div className="space-y-4">
        {budgets.map((budget, index) => {
          const percentage = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);
          let statusColor = 'bg-green-500';
          if (percentage > 75) statusColor = 'bg-yellow-500';
          if (percentage > 90) statusColor = 'bg-red-500';
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{budget.category}</span>
                <span>{formatCurrency(budget.spent)} / {formatCurrency(budget.limit)} ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full ${statusColor}`} style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetProgressList;