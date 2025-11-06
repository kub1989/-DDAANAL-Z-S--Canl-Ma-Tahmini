import React from 'react';
import { PredictionStatus } from '../types';

interface StatusFilterProps {
  currentFilter: PredictionStatus | 'all';
  onFilterChange: (filter: PredictionStatus | 'all') => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters: (PredictionStatus | 'all')[] = ['all', PredictionStatus.Pending, PredictionStatus.Won, PredictionStatus.Lost];
  const filterLabels: { [key: string]: string } = {
    'all': 'Tümü',
    [PredictionStatus.Pending]: 'Beklemede',
    [PredictionStatus.Won]: 'Kazandı',
    [PredictionStatus.Lost]: 'Kaybetti',
  };

  const FilterButton: React.FC<{ filter: PredictionStatus | 'all' }> = ({ filter }) => {
    const isActive = currentFilter === filter;
    return (
      <button
        onClick={() => onFilterChange(filter)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
          isActive
            ? 'bg-cyan-500 text-white shadow-md'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        {filterLabels[filter]}
      </button>
    );
  };

  return (
    <div className="flex items-center space-x-2 mb-6">
      <span className="text-sm font-medium text-gray-400 mr-2">Filtrele:</span>
      {filters.map(filter => (
        <FilterButton key={filter} filter={filter} />
      ))}
    </div>
  );
};

export default StatusFilter;
