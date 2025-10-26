'use client';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

type FilterOption = 'last_month' | 'last_year' | 'custom';

interface DateRangeFilterProps {
  onFilterChange?: (option: FilterOption, startDate?: Date, endDate?: Date) => void;
}

export function DateRangeFilter({ onFilterChange }: DateRangeFilterProps) {
  const [selectedOption, setSelectedOption] = useState<FilterOption>('last_month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleOptionChange = (option: FilterOption) => {
    setSelectedOption(option);
    if (option !== 'custom') {
      onFilterChange?.(option);
    }
  };

  const handleDateChange = () => {
    if (startDate && endDate) {
      onFilterChange?.(
        'custom',
        new Date(startDate),
        new Date(endDate)
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => handleOptionChange('last_month')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            selectedOption === 'last_month'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Bulan Lalu
        </button>
        <button
          onClick={() => handleOptionChange('last_year')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            selectedOption === 'last_year'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Tahun Lalu
        </button>
        <button
          onClick={() => handleOptionChange('custom')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            selectedOption === 'custom'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <CalendarIcon className="w-4 h-4 inline mr-2" />
          Custom
        </button>
      </div>

      {selectedOption === 'custom' && (
        <div className="flex gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <label htmlFor="start-date" className="text-sm font-medium text-gray-700">
              Dari:
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (endDate) {
                  setTimeout(handleDateChange, 0);
                }
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
              Sampai:
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                if (startDate) {
                  setTimeout(handleDateChange, 0);
                }
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
