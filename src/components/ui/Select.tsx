import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  label,
  error,
  helperText,
  options,
  placeholder = 'Select an option...',
  className = '',
  ...props
}: SelectProps) {
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
      
      <select
        className={`${baseClasses} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-gray-400 text-sm">{helperText}</p>
      )}
    </div>
  );
}