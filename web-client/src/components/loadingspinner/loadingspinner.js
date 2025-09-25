'use client';

import React from 'react';

const LoadingSpinner = ({ size = 24, className = '' }) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent border-gray-400 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default LoadingSpinner;
