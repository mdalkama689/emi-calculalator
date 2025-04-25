import React, { useState, useEffect } from 'react';

interface RangeInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  suffix?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  suffix,
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  // Update the input value when the prop value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    let newValue = parseFloat(inputValue);
    
    if (isNaN(newValue)) {
      newValue = value;
    } else {
      // Constrain the value within the min and max range
      newValue = Math.max(min, Math.min(newValue, max));
    }
    
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  // Calculate the percentage for styling the range input
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="w-24 p-1 border border-gray-300 rounded text-right"
          />
          {suffix && <span className="ml-1 text-sm text-gray-500">{suffix}</span>}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleRangeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #2563EB 0%, #2563EB ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
      </div>
      
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{format(min)}</span>
        <span className="text-xs text-gray-500">{format(max)}</span>
      </div>
    </div>
  );
};

export default RangeInput;