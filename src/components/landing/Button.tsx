import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    // Soft Corporate: Rounded corners, soft shadows, clean typography
    primary: 'bg-primary text-white hover:bg-black/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-lg',
    secondary: 'bg-surface-200 text-black hover:bg-surface-300 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg',
    outline: 'bg-transparent text-black border border-black/10 hover:border-black/30 hover:bg-surface-50 transition-all duration-200 rounded-lg',
    ghost: 'text-black hover:bg-surface-100 rounded-lg transition-colors',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm font-medium',
    md: 'px-6 py-3 text-base font-bold',
    lg: 'px-8 py-4 text-lg font-bold',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none font-sans font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}
