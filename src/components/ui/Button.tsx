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
    transition-all disabled:opacity-50 disabled:cursor-not-allowed
  `.trim();

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#cb90cb] to-[#8b5a8b] hover:from-[#d4a4d4] hover:to-[#9d6b9d] text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-[#472447] hover:bg-[#5a305a] text-white border border-[#472447]',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'text-[#c893c8] hover:text-[#d4a4d4] hover:bg-[#472447]/20',
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