import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  const baseClasses = `
    w-full px-4 py-3 rounded-lg border-2 outline-none
    bg-input text-primary
    transition-colors duration-300
    ${error 
      ? `border-error` 
      : `border-transparent focus:border-accent`
    }
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-primary text-sm font-medium">
          {label}
        </label>
      )}
      
      <input
        className={`${baseClasses} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="text-error text-sm">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-muted text-sm">{helperText}</p>
      )}
    </div>
  );
}