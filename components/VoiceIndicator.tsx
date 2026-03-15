"use client";

import { Mic, MicOff } from "lucide-react";

interface VoiceIndicatorProps {
  isActive: boolean;
  isMuted?: boolean;
  voiceRange?: number; // 1 = whisper, 2 = normal, 3 = shout
}

export function VoiceIndicator({
  isActive,
  isMuted = false,
  voiceRange = 2,
}: VoiceIndicatorProps) {
  const rangeLabels = ["Whisper", "Normal", "Shout"];
  const rangeColors = ["#06b6d4", "#10b981", "#f59e0b"];

  return (
    <div
      className="fixed right-[2vw] top-[2vh] flex items-center gap-[0.5vw] px-[0.8vw] py-[0.5vh] rounded-xl transition-all duration-300"
      style={{
        background: "rgba(15, 15, 20, 0.85)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${
          isMuted
            ? "rgba(239, 68, 68, 0.5)"
            : isActive
            ? "rgba(16, 185, 129, 0.5)"
            : "rgba(255, 255, 255, 0.08)"
        }`,
        boxShadow: isActive
          ? "0 0 20px rgba(16, 185, 129, 0.25)"
          : isMuted
          ? "0 0 20px rgba(239, 68, 68, 0.15)"
          : "0 4px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Microphone Icon */}
      <div className="relative">
        {isMuted ? (
          <MicOff
            className="w-[0.9vw] h-[0.9vw] text-red-500"
            style={{ filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.5))" }}
          />
        ) : (
          <Mic
            className="w-[0.9vw] h-[0.9vw] transition-all duration-200"
            style={{
              color: isActive ? "#10b981" : "rgba(255, 255, 255, 0.5)",
              filter: isActive
                ? "drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))"
                : undefined,
            }}
          />
        )}
      </div>

      {/* Voice Bars */}
      <div className="flex items-end gap-[2px] h-[1.2vh]">
        {[30, 60, 100, 70, 45].map((baseHeight, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full transition-all"
            style={{
              height: isActive ? `${baseHeight}%` : "25%",
              background: isMuted
                ? "rgba(239, 68, 68, 0.4)"
                : isActive
                ? rangeColors[voiceRange - 1]
                : "rgba(255, 255, 255, 0.2)",
              animation:
                isActive && !isMuted
                  ? `voiceBar 0.3s ease-in-out infinite alternate`
                  : undefined,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* Voice Range Indicator */}
      <div className="flex items-center gap-[0.2vw] ml-[0.3vw]">
        {[1, 2, 3].map((range) => (
          <div
            key={range}
            className="w-[0.25vw] rounded-full transition-all duration-200"
            style={{
              height: `${range * 0.3}vh`,
              background:
                voiceRange >= range
                  ? rangeColors[voiceRange - 1]
                  : "rgba(255, 255, 255, 0.15)",
              boxShadow:
                voiceRange >= range
                  ? `0 0 4px ${rangeColors[voiceRange - 1]}60`
                  : undefined,
            }}
          />
        ))}
      </div>

      {/* Range Label (shown on hover via group) */}
      <span
        className="text-[0.5vw] font-medium uppercase tracking-wider ml-[0.2vw]"
        style={{ color: rangeColors[voiceRange - 1] }}
      >
        {rangeLabels[voiceRange - 1]}
      </span>
    </div>
  );
}
