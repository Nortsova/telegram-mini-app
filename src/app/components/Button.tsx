import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gradient' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gradient',
  size = 'md',
  children,
  className = '',
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  ...props
}) => {
  // Base styles
  const baseStyles =
    'font-medium transition-opacity flex items-center justify-center relative overflow-hidden group touch-manipulation focus:outline-none';

  // Variant styles
  const variantStyles = {
    gradient:
      'bg-gradient-to-r from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] hover:opacity-90 active:opacity-80 focus:opacity-90 text-basic-black',
    secondary:
      'bg-bg-dark-gray hover:bg-stroke/20 active:bg-stroke/30 focus:bg-stroke/20 text-text-primary',
    outline:
      'border border-brand-green-bright text-brand-green-bright hover:bg-brand-green-bright hover:text-basic-black active:bg-brand-green-bright active:text-basic-black focus:bg-brand-green-bright focus:text-basic-black',
  };

  // Size styles
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm rounded-[0.75rem]',
    md: 'py-3 px-8 text-base rounded-[0.75rem]',
    lg: 'py-4 px-10 text-lg rounded-[0.75rem]',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Disabled styles
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyles}
    ${disabledStyles}
    ${className}
  `.trim();

  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {/* Secondary button gradient overlay */}
      {variant === 'secondary' && (
        <span className="absolute inset-0 radial-gradient-sm opacity-0 group-hover:opacity-20 group-active:opacity-25 group-focus:opacity-20 transition-opacity duration-300"></span>
      )}

      {/* Content wrapper */}
      <span className="flex items-center justify-center relative z-10">
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;
