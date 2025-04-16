import React from 'react';
import { DollarSign, BarChart2, PieChart, Activity } from 'lucide-react';

const Header = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 p-4 shadow-lg border-b border-indigo-500/30">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
          <div className="bg-white/10 p-2 rounded-full mr-3 backdrop-blur-sm">
            <DollarSign size={24} className="text-indigo-100" />
          </div>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100 text-2xl font-bold">
            FinTrack<span className="text-indigo-300">Dashboard</span>
          </h1>
        </div>
        
        <nav className="flex justify-center space-x-1 bg-white/5 p-1 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              activeView === 'dashboard' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-indigo-200 hover:bg-white/10'
            }`}
          >
            <Activity size={18} className="mr-2" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveView('transactions')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              activeView === 'transactions' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-indigo-200 hover:bg-white/10'
            }`}
          >
            <BarChart2 size={18} className="mr-2" />
            <span>Transactions</span>
          </button>
          <button 
            onClick={() => setActiveView('budgets')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
              activeView === 'budgets' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-indigo-200 hover:bg-white/10'
            }`}
          >
            <PieChart size={18} className="mr-2" />
            <span>Budgets</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;