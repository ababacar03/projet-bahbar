'use client';

import React from 'react';
import SearchIcon from '@/assets/icons/searchpurple.svg'; // assure-toi que ce fichier existe

const SearchBar = ({
  placeholder = 'cherche un bar, un lieu ..',
  onChange,
  value,
}) => {
  return (
    <div
      className="flex items-center bg-[#E6E6E6] rounded-full px-3"
      style={{ width: '268px', height: '35px' }}
    >
      <SearchIcon className="w-8 h-8 text-[var(--color-purple-8)] mr-2" />
      <input
        type="text"
        className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-500"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
