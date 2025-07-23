'use client';

import { LoadingSpinnerProps } from "@/types";

const LoadingSpinner = ({ size = 40, color = 'border-green' }: LoadingSpinnerProps) => {
  const dimension = `${size}px`;

  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
      style={{ width: dimension, height: dimension }}
    />
  );
};

export default LoadingSpinner;