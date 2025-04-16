import React, { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';

const TransactionForm = () => {
  const { addTransaction } = useFinance();
  
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    type: 'expense'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value
    });
  };

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.amount) return;
    
    const amountValue = parseFloat(newTransaction.amount);
    if (isNaN(amountValue) || amountValue <= 0) return;
    
    addTransaction({
      date: newTransaction.date,
      category: newTransaction.category,
      amount: amountValue,
      type: newTransaction.type
    });
    
    // Reset form
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      category: '',
      amount: '',
      type: 'expense'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Add New Transaction</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            placeholder="e.g., Groceries"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
            placeholder="0.00"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <div className="mt-1 flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={newTransaction.type === 'income'}
                onChange={handleInputChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Income</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={newTransaction.type === 'expense'}
                onChange={handleInputChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2">Expense</span>
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={handleAddTransaction}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Transaction
      </button>
    </div>
  );
};

export default TransactionForm;