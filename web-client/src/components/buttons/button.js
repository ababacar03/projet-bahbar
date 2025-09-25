'use client';

import React from 'react';

// Couleurs disponibles
const colorVariants = {
  color1: 'bg-purple-5 text-white',
  color2: 'bg-purple-8 text-white',
  color3: 'bg-purple-11 text-white',
};

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'color1',
  className = '',
}) => {
  const colorClass = colorVariants[variant] || colorVariants.color1;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-12 rounded-md px-4 font-medium cursor-pointer transition duration-200 ${colorClass} ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;