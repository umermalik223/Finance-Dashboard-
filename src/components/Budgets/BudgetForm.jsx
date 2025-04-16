import React, { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

const BudgetForm = () => {
  const { addBudget } = useFinance();
  
  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: '',
    spent: 0
  });

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({
      ...newBudget,
      [name]: value
    });
  };

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.limit) return;
    
    const limitValue = parseFloat(newBudget.limit);
    if (isNaN(limitValue) || limitValue <= 0) return;
    
    addBudget({
      category: newBudget.category,
      limit: limitValue,
      spent: 0
    });
    
    // Reset form
    setNewBudget({
      category: '',
      limit: '',
      spent: 0
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Add New Budget</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={newBudget.category}
            onChange={handleBudgetChange}
            placeholder="e.g., Groceries"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Limit</label>
          <input
            type="number"
            name="limit"
            value={newBudget.limit}
            onChange={handleBudgetChange}
            min="0.01"
            step="0.01"
            placeholder="0.00"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
      </div>
      <button
        onClick={handleAddBudget}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Budget
      </button>
    </div>
  );
};

export default BudgetForm;