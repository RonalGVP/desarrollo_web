import React from 'react';
import clsx from 'clsx'; 
export const Card = ({ children, className }) => (
  <div className={clsx('bg-white rounded-lg shadow-md', className)}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={clsx('p-4 border-b', className)}>
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={clsx('text-xl font-semibold', className)}>
    {children}
  </h2>
);

export const CardContent = ({ children, className }) => (
  <div className={clsx('p-4', className)}>
    {children}
  </div>
);
export const CardDescription = ({ children, className }) => (
  <div className={clsx('p-4', className)}>
    {children}
  </div>
);