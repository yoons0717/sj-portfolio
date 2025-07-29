import React from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  colors: string[];
  error?: string;
}

export default function ColorPicker({
  label,
  value,
  onChange,
  colors,
  error,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-white text-sm font-medium">
          {label}
        </label>
      )}
      
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              value === color
                ? 'border-white scale-110'
                : 'border-gray-600 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
}