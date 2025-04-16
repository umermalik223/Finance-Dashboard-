import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
const FinanceContext = createContext();

// Sample initial data
const initialTransactions = [
  { id: 1, date: '2025-04-01', category: 'Groceries', amount: 85.43, type: 'expense' },
  { id: 2, date: '2025-04-02', category: 'Salary', amount: 2500, type: 'income' },
  { id: 3, date: '2025-04-03', category: 'Rent', amount: 1200, type: 'expense' },
  { id: 4, date: '2025-04-05', category: 'Dining', amount: 45.80, type: 'expense' },
  { id: 5, date: '2025-04-07', category: 'Transportation', amount: 60.25, type: 'expense' },
  { id: 6, date: '2025-04-10', category: 'Utilities', amount: 125.65, type: 'expense' },
  { id: 7, date: '2025-04-12', category: 'Entertainment', amount: 35.99, type: 'expense' },
  { id: 8, date: '2025-04-15', category: 'Freelance', amount: 500, type: 'income' },
  { id: 9, date: '2025-04-18', category: 'Shopping', amount: 95.50, type: 'expense' },
  { id: 10, date: '2025-04-20', category: 'Healthcare', amount: 120, type: 'expense' },
];

const initialBudgets = [
  { category: 'Groceries', limit: 400, spent: 350 },
  { category: 'Dining', limit: 200, spent: 150 },
  { category: 'Entertainment', limit: 150, spent: 100 },
  { category: 'Transportation', limit: 250, spent: 180 },
  { category: 'Utilities', limit: 300, spent: 280 },
  { category: 'Shopping', limit: 200, spent: 150 },
];

// Provider component
export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  // Calculate financial summaries
  useEffect(() => {
    // Calculate current balance
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    setCurrentBalance(income - expenses);
    setMonthlyIncome(income);
    setMonthlyExpenses(expenses);
    
    // Update budget spent values based on transactions
    const categoryExpenses = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        if (categoryExpenses[transaction.category]) {
          categoryExpenses[transaction.category] += transaction.amount;
        } else {
          categoryExpenses[transaction.category] = transaction.amount;
        }
      });
    
    const updatedBudgets = budgets.map(budget => {
      return {
        ...budget,
        spent: categoryExpenses[budget.category] || 0
      };
    });
    
    setBudgets(updatedBudgets);
  }, [transactions, budgets]);

  // Add new transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      id: transactions.length + 1,
      ...transaction
    };
    setTransactions([...transactions, newTransaction]);
  };
  
  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  
  // Add new budget
  const addBudget = (budget) => {
    setBudgets([...budgets, budget]);
  };
  
  // Delete budget
  const deleteBudget = (category) => {
    setBudgets(budgets.filter(b => b.category !== category));
  };

  // Prepare data for charts
  const getExpensesByCategory = () => {
    const categoryTotals = {};
    
    transactions.filter(t => t.type === 'expense').forEach(transaction => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount;
      } else {
        categoryTotals[transaction.category] = transaction.amount;
      }
    });
    
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  };

  const getMonthlyData = () => {
    // In a real app, this would group by month across multiple months
    // For this example, we'll just use our limited dataset
    const incomeTotal = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenseTotal = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return [
      { name: 'April 2025', income: incomeTotal, expenses: expenseTotal }
    ];
  };
  
  // Get spending trends data
  const getSpendingTrendsData = () => {
    // Group transactions by date
    const groupedData = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(transaction => {
        if (groupedData[transaction.date]) {
          groupedData[transaction.date] += transaction.amount;
        } else {
          groupedData[transaction.date] = transaction.amount;
        }
      });
    
    return Object.entries(groupedData).map(([date, amount]) => ({
      date,
      amount
    }));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      budgets,
      currentBalance,
      monthlyIncome,
      monthlyExpenses,
      addTransaction,
      deleteTransaction,
      addBudget,
      deleteBudget,
      getExpensesByCategory,
      getMonthlyData,
      getSpendingTrendsData,
      formatCurrency
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

// Custom hook to use the finance context
export const useFinance = () => useContext(FinanceContext);

export default FinanceContext;