import React from 'react';
import Image from 'next/image';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({
  size = 'medium',
}: LoadingSpinnerProps) {
  const sizes = {
    small: 'h-16 w-16',
    medium: 'h-24 w-24',
    large: 'h-32 w-32',
  };

  const logoSizes = {
    small: { width: 40, height: 25 },
    medium: { width: 65, height: 40 },
    large: { width: 90, height: 55 },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="relative">
        <div
          className={`animate-spin rounded-full ${sizes[size]} border-t-4 border-b-4 border-primary`}
        ></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src="/images/logo.png"
            width={logoSizes[size].width}
            height={logoSizes[size].height}
            alt="nova"
          />
        </div>
      </div>
    </div>
  );
}
