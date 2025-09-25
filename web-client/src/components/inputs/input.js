'use client';

import React from 'react';

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  name,
  id,
  className = '',
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      id={id}
      className={`bg-white rounded-lg px-4 py-2 border border-gray-300 h-12 outline-none text-sm text-black ${className}`}
    />
  );
};

export default Input;