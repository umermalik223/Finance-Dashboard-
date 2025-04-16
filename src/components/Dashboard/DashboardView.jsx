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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensesByCategoryChart />
        <IncomeVsExpensesChart />
      </div>
      
      <SpendingTrendsChart />
      <BudgetProgressList />
    </div>
  );
};

export default DashboardView;