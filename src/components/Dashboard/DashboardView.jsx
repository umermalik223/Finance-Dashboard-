import React from 'react';
import FinancialSummary from './FinancialSummary';
import ExpensesByCategoryChart from './ExpensesByCategoryChart';
import IncomeVsExpensesChart from './IncomeVsExpensesChart';
import SpendingTrendsChart from './SpendingTrendsChart';
import BudgetProgressList from './BudgetProgressList';

const DashboardView = () => {
  return (
    <div className="space-y-6">
      <FinancialSummary />
      
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/5">
          <ExpensesByCategoryChart />
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/5">
          <IncomeVsExpensesChart />
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/5">
        <SpendingTrendsChart />
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/5">
        <BudgetProgressList />
      </div>
    </div>
  );
};

export default DashboardView;