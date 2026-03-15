"use client";

import { useState, useEffect } from "react";
import { PlayerHUD } from "@/components/PlayerHUD";
import { VehicleHUD } from "@/components/VehicleHUD";
import { VoiceIndicator } from "@/components/VoiceIndicator";

export default function HUDPreview() {
  // Simulated HUD state
  const [health, setHealth] = useState(85);
  const [armor, setArmor] = useState(60);
  const [hunger, setHunger] = useState(72);
  const [thirst, setThirst] = useState(58);
  const [stress, setStress] = useState(15);

  const [speed, setSpeed] = useState(0);
  const [fuel, setFuel] = useState(78);
  const [gear, setGear] = useState("P");
  const [seatbelt, setSeatbelt] = useState(false);
  const [lights, setLights] = useState(false);

  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceRange, setVoiceRange] = useState(2);
  const [isMuted, setIsMuted] = useState(false);

  const [inVehicle, setInVehicle] = useState(true);
  const [showControls, setShowControls] = useState(true);

  // Simulate voice activity
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMuted) {
        setIsVoiceActive((prev) => !prev);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isMuted]);

  // Simulate speed changes when in vehicle
  useEffect(() => {
    if (inVehicle && gear !== "P") {
      const interval = setInterval(() => {
        setSpeed((prev) => {
          const target = gear === "R" ? 30 : Math.random() * 180;
          const diff = target - prev;
          return Math.round(prev + diff * 0.1);
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setSpeed(0);
    }
  }, [inVehicle, gear]);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
          linear-gradient(180deg, #0a0a0f 0%, #0f0f18 100%)
        `,
      }}
    >
      {/* Minimap Placeholder */}
      <div
        className="fixed left-[1.5vw] bottom-[2vh] w-[10vw] h-[10vw] rounded-xl"
        style={{
          background: "rgba(15, 15, 20, 0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-white/20 text-[0.6vw]">
          Minimap
        </div>
      </div>

      {/* Player HUD */}
      <PlayerHUD
        health={health}
        armor={armor}
        hunger={hunger}
        thirst={thirst}
        stress={stress}
      />

      {/* Vehicle HUD */}
      {inVehicle && (
        <VehicleHUD
          speed={speed}
          maxSpeed={200}
          fuel={fuel}
          gear={gear}
          seatbelt={seatbelt}
          lights={lights}
          streetName="Strawberry Ave"
          zoneName="Strawberry, Los Santos"
        />
      )}

      {/* Voice Indicator */}
      <VoiceIndicator
        isActive={isVoiceActive}
        isMuted={isMuted}
        voiceRange={voiceRange}
      />

      {/* Control Panel */}
      {showControls && (
        <div
          className="fixed top-[2vh] left-1/2 -translate-x-1/2 p-[1vw] rounded-xl"
          style={{
            background: "rgba(15, 15, 20, 0.9)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="text-white/80 text-[0.7vw] font-semibold mb-[1vh] text-center">
            HUD Preview Controls
          </div>

          <div className="grid grid-cols-3 gap-[1vw]">
            {/* Player Stats */}
            <div className="space-y-[0.5vh]">
              <div className="text-white/50 text-[0.5vw] uppercase tracking-wider mb-[0.3vh]">
                Player Stats
              </div>
              {[
                { label: "Health", value: health, set: setHealth },
                { label: "Armor", value: armor, set: setArmor },
                { label: "Hunger", value: hunger, set: setHunger },
                { label: "Thirst", value: thirst, set: setThirst },
                { label: "Stress", value: stress, set: setStress },
              ].map(({ label, value, set }) => (
                <div key={label} className="flex items-center gap-[0.5vw]">
                  <span className="text-white/60 text-[0.5vw] w-[3vw]">
                    {label}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => set(Number(e.target.value))}
                    className="w-[5vw] h-[0.3vh] rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 ${value}%, rgba(255,255,255,0.1) ${value}%)`,
                    }}
                  />
                  <span className="text-white/40 text-[0.45vw] w-[1.5vw] text-right">
                    {value}%
                  </span>
                </div>
              ))}
            </div>

            {/* Vehicle Controls */}
            <div className="space-y-[0.5vh]">
              <div className="text-white/50 text-[0.5vw] uppercase tracking-wider mb-[0.3vh]">
                Vehicle
              </div>
              <div className="flex items-center gap-[0.5vw]">
                <span className="text-white/60 text-[0.5vw] w-[3vw]">Fuel</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fuel}
                  onChange={(e) => setFuel(Number(e.target.value))}
                  className="w-[5vw] h-[0.3vh] rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 ${fuel}%, rgba(255,255,255,0.1) ${fuel}%)`,
                  }}
                />
              </div>
              <div className="flex items-center gap-[0.3vw] mt-[0.5vh]">
                <span className="text-white/60 text-[0.5vw] w-[3vw]">Gear</span>
                {["P", "R", "D", "1", "2", "3"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGear(g)}
                    className="w-[1.2vw] h-[1.2vw] rounded text-[0.5vw] font-bold transition-all"
                    style={{
                      background: gear === g ? "#10b981" : "rgba(255,255,255,0.1)",
                      color: gear === g ? "#000" : "#fff",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-[0.5vw] mt-[0.5vh]">
                <button
                  onClick={() => setSeatbelt(!seatbelt)}
                  className="px-[0.5vw] py-[0.3vh] rounded text-[0.45vw] font-medium transition-all"
                  style={{
                    background: seatbelt ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                    border: `1px solid ${seatbelt ? "#10b981" : "#ef4444"}`,
                    color: seatbelt ? "#10b981" : "#ef4444",
                  }}
                >
                  Seatbelt {seatbelt ? "ON" : "OFF"}
                </button>
                <button
                  onClick={() => setLights(!lights)}
                  className="px-[0.5vw] py-[0.3vh] rounded text-[0.45vw] font-medium transition-all"
                  style={{
                    background: lights ? "rgba(251, 191, 36, 0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${lights ? "#fbbf24" : "rgba(255,255,255,0.1)"}`,
                    color: lights ? "#fbbf24" : "rgba(255,255,255,0.5)",
                  }}
                >
                  Lights {lights ? "ON" : "OFF"}
                </button>
              </div>
              <button
                onClick={() => setInVehicle(!inVehicle)}
                className="mt-[0.5vh] px-[0.6vw] py-[0.3vh] rounded text-[0.45vw] font-medium transition-all"
                style={{
                  background: inVehicle ? "rgba(59, 130, 246, 0.2)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${inVehicle ? "#3b82f6" : "rgba(255,255,255,0.1)"}`,
                  color: inVehicle ? "#3b82f6" : "rgba(255,255,255,0.5)",
                }}
              >
                {inVehicle ? "Exit Vehicle" : "Enter Vehicle"}
              </button>
            </div>

            {/* Voice Controls */}
            <div className="space-y-[0.5vh]">
              <div className="text-white/50 text-[0.5vw] uppercase tracking-wider mb-[0.3vh]">
                Voice Chat
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="px-[0.6vw] py-[0.3vh] rounded text-[0.45vw] font-medium transition-all"
                style={{
                  background: isMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)",
                  border: `1px solid ${isMuted ? "#ef4444" : "#10b981"}`,
                  color: isMuted ? "#ef4444" : "#10b981",
                }}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <div className="flex items-center gap-[0.3vw] mt-[0.5vh]">
                <span className="text-white/60 text-[0.5vw] w-[3vw]">Range</span>
                {[1, 2, 3].map((range) => (
                  <button
                    key={range}
                    onClick={() => setVoiceRange(range)}
                    className="w-[2vw] h-[1.2vw] rounded text-[0.45vw] font-medium transition-all"
                    style={{
                      background:
                        voiceRange === range
                          ? range === 1
                            ? "rgba(6, 182, 212, 0.2)"
                            : range === 2
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(245, 158, 11, 0.2)"
                          : "rgba(255,255,255,0.05)",
                      border: `1px solid ${
                        voiceRange === range
                          ? range === 1
                            ? "#06b6d4"
                            : range === 2
                            ? "#10b981"
                            : "#f59e0b"
                          : "rgba(255,255,255,0.1)"
                      }`,
                      color:
                        voiceRange === range
                          ? range === 1
                            ? "#06b6d4"
                            : range === 2
                            ? "#10b981"
                            : "#f59e0b"
                          : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {range === 1 ? "Whisper" : range === 2 ? "Normal" : "Shout"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Controls Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed top-[2vh] right-[8vw] px-[0.6vw] py-[0.4vh] rounded-lg text-[0.5vw] font-medium transition-all"
        style={{
          background: "rgba(15, 15, 20, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        {showControls ? "Hide Controls" : "Show Controls"}
      </button>
    </div>
  );
}
