'use client';

import { useState } from 'react';

interface RatingSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  emoji?: string;
  min?: number;
  max?: number;
}

export default function RatingSlider({ 
  label, 
  value, 
  onChange, 
  emoji = '⭐', 
  min = 1, 
  max = 10 
}: RatingSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const getEmojiForValue = (val: number) => {
    if (val <= 3) return '😞';
    if (val <= 5) return '😐';
    if (val <= 7) return '🙂';
    if (val <= 9) return '😊';
    return '🤩';
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-gray-700">
          {emoji} {label}
        </label>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getEmojiForValue(value)}</span>
          <span className="text-lg font-bold text-primary-600 min-w-[2rem] text-center">
            {value}
          </span>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className={`w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer transition-all duration-200 ${
            isDragging ? 'scale-105' : ''
          }`}
          style={{
            background: `linear-gradient(to right, 
              #fecaca 0%, 
              #fed7aa ${((value - min) / (max - min)) * 100}%, 
              #d1fae5 100%)`
          }}
        />
        
        {/* Custom thumb styling */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border: 2px solid white;
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border: 2px solid white;
            transition: all 0.2s ease;
          }
        `}</style>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
}
