'use client';

import React from 'react';

const colorVariants = {
  color1: 'bg-[--color-purple-5] text-white',
  color2: 'bg-[--color-purple-8] text-white',
  color3: 'bg-[--color-purple-11] text-white',
};

const IconButton = ({
  icon,                // JSX ou rien
  iconSrc,             // chemin d'image 
  text = '',           
  iconPosition = 'left', // 'left' | 'right'
  onClick,
  type = 'button',
  disabled = false,
  variant = 'color1',
  className = '',
  alt = 'icon',        // texte alternatif pour l'image
}) => {
  const colorClass = colorVariants[variant] || colorVariants.color1;

  const renderIcon = () => {
    if (icon) return icon;
    if (iconSrc) {
      return (
        <img
          src={iconSrc}
          alt={alt}
          className="w-5 h-5 object-contain"
        />
      );
    }
    return null;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-3 rounded-md font-medium ${colorClass} ${className}`}
    >
      {iconPosition === 'left' && renderIcon()}
      {text && <span>{text}</span>}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default IconButton;