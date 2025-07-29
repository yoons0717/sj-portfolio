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
    bg-[#472447] text-white
    transition-colors
    ${error 
      ? 'border-red-500' 
      : 'border-transparent focus:border-[#cb90cb]'
    }
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white text-sm font-medium">
          {label}
        </label>
      )}
      
      <input
        className={`${baseClasses} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-gray-400 text-sm">{helperText}</p>
      )}
    </div>
  );
}