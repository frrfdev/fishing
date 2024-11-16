import React from 'react';
import { twMerge } from 'tailwind-merge';

type BoxProps = React.HTMLAttributes<HTMLDivElement>;

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={twMerge('', props.className)}>
        {children}
      </div>
    );
  }
);
