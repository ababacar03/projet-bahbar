'use client';

import React from 'react';

const Tags = ({ label }) => {
  return (
    <span className="bg-gray-200 text-black text-sm px-3 py-1 rounded-full">
      {label}
    </span>
  );
};

export default Tags;