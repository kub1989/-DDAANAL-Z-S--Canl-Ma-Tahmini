
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 md:px-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          🏆 Canlı Maç Tahminleri
        </h1>
      </div>
    </header>
  );
};

export default Header;
