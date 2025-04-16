import React from 'react';
import './App.css';
import MainLayout from './components/Layout/MainLayout';
import { FinanceProvider } from './contexts/FinanceContext';

function App() {
  return (
    <FinanceProvider>
      <MainLayout />
    </FinanceProvider>
  );
}

export default App;