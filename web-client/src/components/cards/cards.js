'use client';

import React from 'react';
import Image from 'next/image';

const Cards = ({
                 alt,
                 image,
                 children,
                 className = '',
                 onClick
               }) => {
  return (
      <div
          onClick={onClick}
          className={`bg-white rounded-xl shadow-md overflow-hidden p-0 ${className}`}
      >
        {image && (
            <div className="relative w-full max-w-[168px] h-[168px]">
              <Image
                  src={image}
                  alt={alt || 'Image'}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={true}
              />
            </div>
        )}
          {children}
      </div>
  );
};

export default Cards;