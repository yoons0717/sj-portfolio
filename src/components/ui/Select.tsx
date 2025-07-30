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
        <p className="text-error text-sm">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-muted text-sm">{helperText}</p>
      )}
    </div>
  );
}