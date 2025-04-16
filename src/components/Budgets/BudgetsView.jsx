import React from 'react';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import BudgetVsActualChart from './BudgetVsActualChart';

const BudgetsView = () => {
  return (
    <div className="space-y-6">
      <BudgetForm />
      <BudgetList />
      <BudgetVsActualChart />
    </div>
  );
};

export default BudgetsView;