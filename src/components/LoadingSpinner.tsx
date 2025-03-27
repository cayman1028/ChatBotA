import React from 'react';

type SpinnerSize = 'small' | 'medium' | 'large';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  small: '20px',
  medium: '30px',
  large: '40px'
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#007bff'
}) => {
  const spinnerSize = sizeMap[size];

  return (
    <div
      data-testid="loading-spinner"
      className="chatbot-loading-spinner"
      style={{
        width: spinnerSize,
        height: spinnerSize,
        borderColor: color,
        borderTopColor: 'transparent'
      }}
    />
  );
}; 