import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
}

export function Section({ className, container = true, borderTop = false, borderBottom = false, children, ...props }: SectionProps) {
  return (
    <section 
      className={cn(
        'py-20 lg:py-32 relative', 
        borderTop && 'border-t border-black',
        borderBottom && 'border-b border-black',
        className
      )} 
      {...props}
    >
      {container ? (
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
