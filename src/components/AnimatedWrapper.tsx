
import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
  tag?: keyof HTMLElementTagNameMap;
  threshold?: number;
  id?: string;
}

export const AnimatedWrapper = ({ children, className, tag: Tag = 'div', threshold = 0.1, id }: AnimatedWrapperProps) => {
  const { ref, isInView } = useInView({ threshold });

  return React.createElement(
    Tag,
    {
      ref,
      id,
      className: cn(
        className,
        'opacity-0 transform translate-y-8',
        isInView && 'animate-slide-up-fade'
      ),
    },
    children
  );
};
