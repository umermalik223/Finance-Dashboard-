import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-4 mt-auto border-t border-indigo-500/30">
      <div className="container mx-auto text-center">
        <div className="mb-2">
          <div className="inline-block bg-gradient-to-r from-cyan-400 to-indigo-400 h-px w-32 opacity-50 mx-auto"></div>
        </div>
        <p className="text-indigo-200 text-sm">
          © 2025 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">FinTrack Dashboard</span> | Personal Finance Tracker
        </p>
        <div className="mt-2 text-xs text-indigo-300 opacity-60">
          Visualize your finances • Track your spending • Achieve your goals
        </div>
      </div>
    </footer>
  );
};

export default Footer;