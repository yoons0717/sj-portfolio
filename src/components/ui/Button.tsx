import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
  `.trim();

  const variantClasses = {
    primary: `bg-gradient-to-r from-accent to-accent-dark hover:from-accent-light hover:to-accent text-primary shadow-lg hover:shadow-xl`,
    secondary: `bg-input hover:bg-accent-dark text-primary border border-border`,
    success: `bg-success hover:bg-green-700 text-primary`,
    danger: `bg-error hover:bg-red-700 text-primary`,
    ghost: `text-accent hover:text-accent-light hover:bg-input/20`,
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-3',
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
      ) : (
        icon && <span>{icon}</span>
      )}
      {children}
    </button>
  );
}