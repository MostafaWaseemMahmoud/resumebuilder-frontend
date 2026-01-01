import React, { useState } from 'react';
import { Check, Palette } from 'lucide-react';

const ColorPicker = ({ selectedcolor, onChange }) => {
const colors = [
  // 🔵 Blues
  { name: "Blue", value: "3B82F6" },
  { name: "Sky", value: "0EA5E9" },
  { name: "Cyan", value: "06B6D4" },
  { name: "Indigo", value: "6366F1" },

  // 🟣 Purples
  { name: "Purple", value: "8B5CF6" },
  { name: "Violet", value: "7C3AED" },
  { name: "Fuchsia", value: "D946EF" },

  // 🌸 Pinks & Reds
  { name: "Pink", value: "EC4899" },
  { name: "Rose", value: "F43F5E" },
  { name: "Red", value: "EF4444" },
  { name: "Crimson", value: "DC2626" },

  // 🟠 Oranges & Yellows
  { name: "Orange", value: "F97316" },
  { name: "Amber", value: "F59E0B" },
  { name: "Yellow", value: "EAB308" },
  { name: "Lime", value: "84CC16" },

  // 🟢 Greens
  { name: "Green", value: "22C55E" },
  { name: "Emerald", value: "10B981" },
  { name: "Teal", value: "14B8A6" },
  { name: "Mint", value: "2DD4BF" },

  // ⚪ Neutrals
  { name: "Slate", value: "64748B" },
  { name: "Gray", value: "6B7280" },
  { name: "Zinc", value: "71717A" },
  { name: "Stone", value: "78716C" },
  { name: "Neutral Dark", value: "1F2937" },

  // 🌈 Extras / Special
  { name: "Brown", value: "92400E" },
  { name: "Chocolate", value: "7C2D12" },
  { name: "Gold", value: "D4AF37" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600
        bg-gradient-to-br from-purple-50 to-purple-100
        ring-1 ring-purple-300 hover:ring-purple-400
        transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-4 w-68 gap-3 absolute top-full left-0 mt-2 z-10
        bg-white rounded-md border border-gray-200 shadow-sm p-3">
          {colors.map((color) => (
            <div
              key={color.value}
              className="cursor-pointer group flex flex-col items-center"
              onClick={() => {onChange(`#${color.value}`); setIsOpen(false)}}
            >
              <div
                className="relative w-15 h-15 rounded-full 
                group-hover:scale-110 transition"
                style={{ backgroundColor: `#${color.value}` }}
              >
                {selectedcolor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <p className="text-xs mt-1 text-gray-600">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
