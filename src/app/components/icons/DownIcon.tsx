import React from 'react';

interface DownIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  stroke?: string;
  strokeWidth?: number | string;
  fill?: string;
}

export const DownIcon: React.FC<DownIconProps> = ({
  width = 10,
  height = 6,
  className = '',
  stroke = 'white',
  strokeWidth = 1.5,
  fill = 'none',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 6"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.53 1.54L5 5.06L1.47 1.54"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownIcon;
