/**
 * Group transactions by category and calculate totals
 * @param {Array} transactions - List of transactions
 * @param {string} type - Type of transactions to group (income or expense)
 * @returns {Array} Array of objects with name and value properties
 */
export const groupByCategory = (transactions, type) => {
    const categoryTotals = {};
    
    transactions
      .filter(t => t.type === type)
      .forEach(transaction => {
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
  
  /**
   * Group transactions by date
   * @param {Array} transactions - List of transactions
   * @param {string} type - Type of transactions to group (income or expense)
   * @returns {Array} Array of objects with date and amount properties
   */
  export const groupByDate = (transactions, type) => {
    const dateGroups = {};
    
    transactions
      .filter(t => t.type === type)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(transaction => {
        if (dateGroups[transaction.date]) {
          dateGroups[transaction.date] += transaction.amount;
        } else {
          dateGroups[transaction.date] = transaction.amount;
        }
      });
    
    return Object.entries(dateGroups).map(([date, amount]) => ({
      date,
      amount
    }));
  };
  
  /**
   * Calculate total for a specific transaction type
   * @param {Array} transactions - List of transactions
   * @param {string} type - Type of transactions to calculate (income or expense)
   * @returns {number} Total amount
   */
  export const calculateTotal = (transactions, type) => {
    return transactions
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  };
  
  /**
   * Calculate current balance from transactions
   * @param {Array} transactions - List of transactions
   * @returns {number} Current balance
   */
  export const calculateBalance = (transactions) => {
    const income = calculateTotal(transactions, 'income');
    const expenses = calculateTotal(transactions, 'expense');
    return income - expenses;
  };