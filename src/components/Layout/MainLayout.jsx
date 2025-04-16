import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import DashboardView from '../Dashboard/DashboardView';
import TransactionsView from '../Transactions/TransactionsView';
import BudgetsView from '../Budgets/BudgetsView';

const MainLayout = () => {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto p-4 flex-grow relative z-10">
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 -right-20 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-20 w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'transactions' && <TransactionsView />}
          {activeView === 'budgets' && <BudgetsView />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;