import React, { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { Trash2, ChevronDown, ChevronUp, Filter } from 'lucide-react';

const TransactionList = () => {
  const { transactions, deleteTransaction, formatCurrency } = useFinance();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    type: 'all',
    category: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  // Apply filters and sorting
  const filteredTransactions = transactions.filter(transaction => {
    if (filter.type !== 'all' && transaction.type !== filter.type) return false;
    if (filter.category && !transaction.category.toLowerCase().includes(filter.category.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (filter.sortBy === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return filter.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (filter.sortBy === 'amount') {
      return filter.sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const toggleSortOrder = () => {
    setFilter({
      ...filter,
      sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc'
    });
  };

  // Get unique categories
  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="text-lg font-semibold text-indigo-200 mb-2 sm:mb-0">Recent Transactions</h3>
        
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 text-indigo-300 hover:text-indigo-100 text-sm"
        >
          <Filter size={16} />
          <span>Filter</span>
          {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Mobile-friendly filter controls */}
      {isFilterOpen && (
        <div className="bg-indigo-900/50 p-3 rounded-lg mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-indigo-300 mb-1">Transaction Type</label>
            <select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              className="w-full rounded-md bg-indigo-900/30 border border-indigo-500/30 shadow-sm p-2 text-white text-sm"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-indigo-300 mb-1">Category</label>
            <select
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              className="w-full rounded-md bg-indigo-900/30 border border-indigo-500/30 shadow-sm p-2 text-white text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-indigo-300 mb-1">Sort By</label>
            <select
              name="sortBy"
              value={filter.sortBy}
              onChange={handleFilterChange}
              className="w-full rounded-md bg-indigo-900/30 border border-indigo-500/30 shadow-sm p-2 text-white text-sm"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-indigo-300 mb-1">Sort Order</label>
            <button
              onClick={toggleSortOrder}
              className="w-full rounded-md bg-indigo-900/30 border border-indigo-500/30 shadow-sm p-2 text-white text-sm flex items-center justify-center gap-2"
            >
              <span>{filter.sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
              {filter.sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      )}

      {/* Mobile view - card list */}
      <div className="block sm:hidden space-y-3">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-indigo-900/30 rounded-lg p-3 border border-indigo-500/20">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-white">{transaction.category}</div>
                <div className="text-xs text-indigo-300">{transaction.date}</div>
              </div>
              <div className={`font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-indigo-500/20">
              <div className="text-xs text-indigo-300 capitalize">{transaction.type}</div>
              <button 
                onClick={() => deleteTransaction(transaction.id)}
                className="text-red-400 hover:text-red-300 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-indigo-500/20">
          <thead className="bg-indigo-900/30">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-500/20">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-indigo-900/20">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300 capitalize">{transaction.type}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                  <button 
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-indigo-300">
          No transactions found. Try changing your filters or add a new transaction.
        </div>
      )}
    </div>
  );
};

export default TransactionList;