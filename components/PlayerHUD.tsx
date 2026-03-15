"use client";

import { Heart, Shield, Utensils, Droplets, Brain } from "lucide-react";

interface PlayerHUDProps {
  health: number;
  armor: number;
  hunger: number;
  thirst: number;
  stress: number;
}

export function PlayerHUD({ health, armor, hunger, thirst, stress }: PlayerHUDProps) {
  const stats = [
    { icon: Heart, value: health, color: "#ef4444", label: "Health" },
    { icon: Shield, value: armor, color: "#3b82f6", label: "Armor" },
    { icon: Utensils, value: hunger, color: "#f59e0b", label: "Hunger" },
    { icon: Droplets, value: thirst, color: "#06b6d4", label: "Thirst" },
    { icon: Brain, value: stress, color: "#a855f7", label: "Stress" },
  ];

  return (
    <div className="fixed left-[2vw] bottom-[6vh] flex items-end gap-[0.6vw]">
      {stats.map(({ icon: Icon, value, color, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-[0.4vh] group"
        >
          {/* Icon Container */}
          <div
            className="relative w-[2.2vw] h-[2.2vw] rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(15, 15, 20, 0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: value < 25 ? `0 0 15px ${color}40` : undefined,
            }}
          >
            <Icon
              className="w-[1vw] h-[1vw] transition-all duration-300"
              style={{
                color: value < 25 ? color : "rgba(255, 255, 255, 0.7)",
                filter: value < 25 ? `drop-shadow(0 0 6px ${color})` : undefined,
              }}
              strokeWidth={2}
            />
            
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-[0.6vw] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}: {value}%
            </div>
          </div>

          {/* Progress Bar Container */}
          <div
            className="w-[0.35vw] rounded-full overflow-hidden transition-all duration-300"
            style={{
              height: "4vh",
              background: "rgba(15, 15, 20, 0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Progress Fill */}
            <div
              className="w-full rounded-full transition-all duration-500 ease-out"
              style={{
                height: `${value}%`,
                marginTop: `${100 - value}%`,
                background: `linear-gradient(to top, ${color}, ${color}dd)`,
                boxShadow: `0 0 8px ${color}60`,
                animation: value < 25 ? "pulse 1.5s ease-in-out infinite" : undefined,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
