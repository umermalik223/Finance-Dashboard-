import React from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const TransactionsView = () => {
  return (
    <div className="space-y-6">
      <TransactionForm />
      <TransactionList />
    </div>
  );
};

export default TransactionsView;