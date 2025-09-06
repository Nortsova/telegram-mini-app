import React from 'react';

interface UpIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  stroke?: string;
  strokeWidth?: number | string;
  fill?: string;
}

export const UpIcon: React.FC<UpIconProps> = ({
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
        d="M1.47 4.46L5 0.940002L8.53 4.46"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpIcon;
