import React, { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { Plus } from 'lucide-react';

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
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/5">
      <h3 className="text-lg font-semibold mb-4 text-indigo-200">Add New Transaction</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className="w-full rounded-md bg-indigo-900/30 border border-indigo-500/30 shadow-sm p-2 text-white focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            placeholder="e.g., Groceries"
            className="w-full rounded-md bg-indigo-900/30 border border-indigo-500/30 shadow-sm p-2 text-white focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
            placeholder="0.00"
            className="w-full rounded-md bg-indigo-900/30 border border-indigo-500/30 shadow-sm p-2 text-white focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-indigo-300 mb-1">Type</label>
          <div className="grid grid-cols-2 gap-2 h-10">
            <label className="flex items-center justify-center bg-indigo-900/30 border border-indigo-500/30 rounded-md cursor-pointer">
              <input
                type="radio"
                name="type"
                value="income"
                checked={newTransaction.type === 'income'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <span className={`text-sm ${newTransaction.type === 'income' ? 'text-green-400' : 'text-indigo-300'}`}>Income</span>
            </label>
            <label className="flex items-center justify-center bg-indigo-900/30 border border-indigo-500/30 rounded-md cursor-pointer">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={newTransaction.type === 'expense'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <span className={`text-sm ${newTransaction.type === 'expense' ? 'text-red-400' : 'text-indigo-300'}`}>Expense</span>
            </label>
          </div>
        </div>
      </div>
      <button
        onClick={handleAddTransaction}
        className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-md hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <Plus size={16} />
        <span>Add Transaction</span>
      </button>
    </div>
  );
};

export default TransactionForm;