import React from 'react';

interface ChatIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  stroke?: string;
  strokeWidth?: number | string;
  fill?: string;
}

export const ChatIcon: React.FC<ChatIconProps> = ({
  width = 21,
  height = 18,
  className = '',
  stroke = '#141414',
  strokeWidth = 1.5,
  fill = 'none',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.83789 12.9896C8.65862 15.3254 10.8838 17 13.5001 17C14.6808 17 15.7818 16.6589 16.71 16.0699L17.9821 16.494C18.4706 16.6568 18.7152 16.7383 18.8777 16.6804C19.019 16.63 19.1301 16.5187 19.1805 16.3773C19.2384 16.2149 19.1572 15.9706 18.9943 15.4821L18.5703 14.21L18.7123 13.9744C19.2138 13.0977 19.5004 12.0823 19.5004 11C19.5004 7.6863 16.8137 5 13.5 5L13.2754 5.00414L13.1621 5.01015M7.50006 13.0001C6.31935 13.0001 5.2183 12.659 4.29004 12.0701L3.01807 12.4941C2.52952 12.6569 2.285 12.7383 2.12256 12.6804C1.9812 12.63 1.86981 12.5187 1.8194 12.3773C1.76147 12.2149 1.84301 11.9706 2.00586 11.482L2.42989 10.21C1.84094 9.2817 1.5 8.18071 1.5 7C1.5 3.68629 4.18629 1 7.5 1C10.8137 1 13.5 3.68629 13.5 7C13.5 10.3137 10.8138 13.0001 7.50006 13.0001Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChatIcon;
