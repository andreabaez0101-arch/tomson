"use client";

import { Fuel, Lightbulb, AlertTriangle } from "lucide-react";

interface VehicleHUDProps {
  speed: number;
  maxSpeed: number;
  fuel: number;
  gear: string;
  seatbelt: boolean;
  lights: boolean;
  streetName: string;
  zoneName: string;
}

export function VehicleHUD({
  speed,
  maxSpeed,
  fuel,
  gear,
  seatbelt,
  lights,
  streetName,
  zoneName,
}: VehicleHUDProps) {
  const speedPercentage = Math.min((speed / maxSpeed) * 100, 100);
  const speedBars = 20;

  return (
    <>
      {/* Vehicle Panel */}
      <div
        className="fixed right-[2vw] bottom-[4vh] flex flex-col items-end gap-[1vh]"
      >
        {/* Speed Display */}
        <div
          className="flex flex-col items-center px-[1vw] py-[0.8vh] rounded-xl"
          style={{
            background: "rgba(15, 15, 20, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Speed Number */}
          <div className="flex items-baseline gap-[0.3vw]">
            <span
              className="text-[2.5vw] font-bold tracking-tight text-white"
              style={{
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.6)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {speed}
            </span>
            <span className="text-[0.6vw] text-white/50 font-medium uppercase tracking-wider">
              km/h
            </span>
          </div>

          {/* Speed Bars */}
          <div className="flex items-end gap-[2px] h-[1.2vh] mt-[0.5vh]">
            {Array.from({ length: speedBars }).map((_, i) => {
              const isActive = (i / speedBars) * 100 < speedPercentage;
              const barColor =
                i < speedBars * 0.6
                  ? "#10b981"
                  : i < speedBars * 0.85
                  ? "#f59e0b"
                  : "#ef4444";

              return (
                <div
                  key={i}
                  className="w-[0.25vw] rounded-sm transition-all duration-150"
                  style={{
                    height: isActive ? "100%" : "40%",
                    background: isActive ? barColor : "rgba(255, 255, 255, 0.15)",
                    boxShadow: isActive ? `0 0 6px ${barColor}60` : undefined,
                  }}
                />
              );
            })}
          </div>

          {/* Fuel Bar */}
          <div className="w-full mt-[0.8vh]">
            <div className="flex items-center justify-between mb-[0.3vh]">
              <Fuel className="w-[0.7vw] h-[0.7vw] text-white/50" />
              <span className="text-[0.5vw] text-white/50">{fuel}%</span>
            </div>
            <div
              className="w-full h-[0.4vh] rounded-full overflow-hidden"
              style={{ background: "rgba(255, 255, 255, 0.1)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${fuel}%`,
                  background:
                    fuel > 25
                      ? "linear-gradient(90deg, #10b981, #34d399)"
                      : fuel > 10
                      ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                      : "linear-gradient(90deg, #ef4444, #f87171)",
                  boxShadow:
                    fuel <= 10 ? "0 0 10px rgba(239, 68, 68, 0.5)" : undefined,
                  animation: fuel <= 10 ? "pulse 1s ease-in-out infinite" : undefined,
                }}
              />
            </div>
          </div>

          {/* Status Icons Row */}
          <div className="flex items-center gap-[0.5vw] mt-[0.8vh]">
            {/* Gear */}
            <div
              className="flex items-center justify-center w-[1.5vw] h-[1.5vw] rounded-lg text-[0.8vw] font-bold"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: gear === "R" ? "#ef4444" : "#fff",
              }}
            >
              {gear}
            </div>

            {/* Seatbelt */}
            <div
              className="flex items-center justify-center w-[1.5vw] h-[1.5vw] rounded-lg transition-all duration-300"
              style={{
                background: seatbelt
                  ? "rgba(16, 185, 129, 0.2)"
                  : "rgba(239, 68, 68, 0.2)",
                border: `1px solid ${seatbelt ? "#10b981" : "#ef4444"}`,
              }}
            >
              <AlertTriangle
                className="w-[0.7vw] h-[0.7vw]"
                style={{
                  color: seatbelt ? "#10b981" : "#ef4444",
                  animation: !seatbelt ? "pulse 0.8s ease-in-out infinite" : undefined,
                }}
              />
            </div>

            {/* Lights */}
            <div
              className="flex items-center justify-center w-[1.5vw] h-[1.5vw] rounded-lg transition-all duration-300"
              style={{
                background: lights
                  ? "rgba(251, 191, 36, 0.2)"
                  : "rgba(255, 255, 255, 0.05)",
                border: lights
                  ? "1px solid #fbbf24"
                  : "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Lightbulb
                className="w-[0.7vw] h-[0.7vw]"
                style={{
                  color: lights ? "#fbbf24" : "rgba(255, 255, 255, 0.3)",
                  filter: lights ? "drop-shadow(0 0 4px #fbbf24)" : undefined,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Street Name */}
      <div
        className="fixed left-[2vw] bottom-[22vh] px-[1vw] py-[0.6vh] rounded-lg"
        style={{
          background: "rgba(15, 15, 20, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="text-[0.7vw] font-semibold text-white tracking-wide">
          {streetName}
        </div>
        <div className="text-[0.5vw] text-white/50 mt-[0.2vh]">{zoneName}</div>
      </div>
    </>
  );
}
