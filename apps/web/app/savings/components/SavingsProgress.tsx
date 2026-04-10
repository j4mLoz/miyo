"use client";

export function SavingsProgress({ current, goal }) {
  if (!goal || goal <= 0) return null;

  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="mt-4 space-y-1">
      {/* 🔢 TEXTO */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Progreso</span>
        <span>{Math.round(percentage)}%</span>
      </div>

      {/* 📊 BARRA */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#2D7F7A] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
