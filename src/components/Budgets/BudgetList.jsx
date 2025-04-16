import React from 'react';
import { useFinance } from '../../contexts/FinanceContext';

const BudgetList = () => {
  const { budgets, deleteBudget, formatCurrency } = useFinance();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
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
                <div>
                  <span>{formatCurrency(budget.spent)} / {formatCurrency(budget.limit)} ({percentage}%)</span>
                  <button 
                    onClick={() => deleteBudget(budget.category)}
                    className="ml-4 text-red-600 hover:text-red-900 text-xs"
                  >
                    Delete
                  </button>
                </div>
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

export default BudgetList;