import React, { useState, useEffect, useRef } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Bell,
  Volume2,
  VolumeX,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

export function detectStepDurationSeconds(text: string): number | null {
  if (!text) return null;

  // Match hours: "1 hour", "1.5 hrs", "2 hours"
  const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hour|hr|hours|hrs)/i);
  if (hourMatch) {
    const hrs = parseFloat(hourMatch[1]);
    if (!isNaN(hrs) && hrs > 0) return Math.round(hrs * 3600);
  }

  // Match range minutes: "15-20 minutes", "15 to 20 mins" -> pick lower bound
  const rangeMinuteMatch = text.match(/(\d+)\s*(?:-|to)\s*(\d+)\s*(?:minute|min|minutes|mins)/i);
  if (rangeMinuteMatch) {
    const mins = parseInt(rangeMinuteMatch[1], 10);
    if (!isNaN(mins) && mins > 0) return mins * 60;
  }

  // Match single minutes: "15 minutes", "5 mins"
  const minuteMatch = text.match(/(\d+)\s*(?:minute|min|minutes|mins)/i);
  if (minuteMatch) {
    const mins = parseInt(minuteMatch[1], 10);
    if (!isNaN(mins) && mins > 0) return mins * 60;
  }

  // Match seconds: "45 seconds", "30 secs"
  const secondMatch = text.match(/(\d+)\s*(?:second|sec|seconds|secs)/i);
  if (secondMatch) {
    const secs = parseInt(secondMatch[1], 10);
    if (!isNaN(secs) && secs > 0) return secs;
  }

  return null;
}

export function formatTimeDisplay(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function playKitchenChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Soft 3-tone harmonic kitchen chime (G5, C6, E6)
    const tones = [783.99, 1046.5, 1318.51];
    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const startTime = ctx.currentTime + idx * 0.18;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.9);
    });
  } catch (e) {
    console.warn("Audio chime cannot be played:", e);
  }
}

export interface CookingStepTimerProps {
  stepNumber: number;
  stepTitle: string;
  stepInstruction: string;
  onMarkComplete?: () => void;
  isStepDone?: boolean;
}

export const CookingStepTimer: React.FC<CookingStepTimerProps> = ({
  stepNumber,
  stepTitle,
  stepInstruction,
  onMarkComplete,
  isStepDone = false,
}) => {
  const detectedSeconds = detectStepDurationSeconds(stepInstruction) || 300; // default 5m if none detected
  const [initialSeconds, setInitialSeconds] = useState<number>(detectedSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(detectedSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Sync initial seconds if instruction text changes
  useEffect(() => {
    const detected = detectStepDurationSeconds(stepInstruction) || 300;
    setInitialSeconds(detected);
    if (!isRunning && !isCompleted) {
      setRemainingSeconds(detected);
    }
  }, [stepInstruction]);

  // Timer interval hook
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            if (isSoundEnabled) {
              playKitchenChime();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingSeconds, isSoundEnabled]);

  const handleStart = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(initialSeconds > 0 ? initialSeconds : 300);
    }
    setIsRunning(true);
    setIsCompleted(false);
    setIsOpen(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setRemainingSeconds(initialSeconds);
  };

  const adjustMinutes = (delta: number) => {
    const newRemaining = Math.max(10, remainingSeconds + delta * 60);
    setRemainingSeconds(newRemaining);
    if (!isRunning) {
      setInitialSeconds(newRemaining);
    }
    setIsCompleted(false);
  };

  const setCustomMinutes = (minutes: number) => {
    const totalSecs = Math.max(10, minutes * 60);
    setInitialSeconds(totalSecs);
    setRemainingSeconds(totalSecs);
    setIsCompleted(false);
  };

  // Progress percentage
  const progressPercent = initialSeconds > 0
    ? Math.min(100, Math.max(0, ((initialSeconds - remainingSeconds) / initialSeconds) * 100))
    : 0;

  // Has auto detected time in text
  const hasAutoDetection = detectStepDurationSeconds(stepInstruction) !== null;

  return (
    <div className="mt-3 pt-3 border-t border-[#E6E1D8]/70 print:hidden">
      {/* Compact Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F3C38] hover:text-[#E97520] transition-colors cursor-pointer"
            aria-label="Toggle step timer"
          >
            <Timer className={`w-3.5 h-3.5 ${isRunning ? "text-[#E97520] animate-pulse" : "text-[#77736D]"}`} />
            <span>Step {stepNumber} Timer</span>
            {hasAutoDetection && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FFF9F0] text-[#D75D17] border border-[#F8CD78]/50">
                {formatTimeDisplay(detectedSeconds)} suggested
              </span>
            )}
            {isOpen ? <ChevronUp className="w-3 h-3 text-[#77736D]" /> : <ChevronDown className="w-3 h-3 text-[#77736D]" />}
          </button>
        </div>

        {/* Quick Actions when collapsed */}
        <div className="flex items-center gap-2">
          {/* Running State Badge */}
          {isRunning && (
            <span className="text-xs font-mono font-bold text-[#2D7A52] bg-[#FAF9F6] border border-[#2D7A52]/30 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A52]"></span>
              {formatTimeDisplay(remainingSeconds)}
            </span>
          )}

          {/* Quick Play/Pause or Start */}
          {!isRunning && !isCompleted && remainingSeconds === initialSeconds && !isOpen && (
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F6] hover:bg-[#FFF9F0] border border-[#E6E1D8] text-[#3F3C38] hover:text-[#D75D17] text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Play className="w-3 h-3 text-[#2D7A52] fill-[#2D7A52]" />
              <span>Start {Math.round(initialSeconds / 60)}m</span>
            </button>
          )}

          {isRunning && !isOpen && (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
            >
              <Pause className="w-3 h-3" />
              <span>Pause</span>
            </button>
          )}
        </div>
      </div>

      {/* Finished Banner Alert */}
      {isCompleted && (
        <div className="mt-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-wrap items-center justify-between gap-2 animate-bounce-short">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600 animate-wiggle" />
            <span className="text-xs font-bold">
              Time's up for Step {stepNumber} ({stepTitle})!
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onMarkComplete && !isStepDone && (
              <button
                onClick={onMarkComplete}
                className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <CheckCircle className="w-3 h-3" />
                Mark Step Done
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-2 py-1 rounded bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Expanded Interactive Timer Control Box */}
      {isOpen && (
        <div className="mt-2.5 p-3.5 rounded-lg bg-[#FAF9F6] border border-[#E6E1D8] space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-[#E6E1D8] rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isCompleted
                    ? "bg-emerald-600"
                    : isRunning
                    ? "bg-[#E97520]"
                    : "bg-[#2D7A52]"
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Main Digital Display and Play/Pause/Reset Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Time Countdown Text */}
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[#242423] tracking-wider">
                {formatTimeDisplay(remainingSeconds)}
              </span>
              <span className="text-[11px] text-[#77736D] font-medium">
                {isRunning ? "remaining" : isCompleted ? "completed!" : "ready to start"}
              </span>
            </div>

            {/* Actions: Start, Pause, Reset */}
            <div className="flex items-center gap-1.5">
              {isRunning ? (
                <button
                  onClick={handlePause}
                  className="px-3 py-1.5 rounded-md bg-[#242423] hover:bg-[#3F3C38] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Pause className="w-3.5 h-3.5" />
                  Pause
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  className="px-3 py-1.5 rounded-md bg-[#2D7A52] hover:bg-[#236342] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  {remainingSeconds === initialSeconds ? "Start Timer" : "Resume"}
                </button>
              )}

              <button
                onClick={handleReset}
                title="Reset timer"
                className="p-1.5 rounded-md bg-white border border-[#E6E1D8] text-[#77736D] hover:text-[#242423] hover:bg-white text-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                title={isSoundEnabled ? "Sound alert enabled" : "Sound alert muted"}
                className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${
                  isSoundEnabled
                    ? "bg-white border-[#E6E1D8] text-[#2D7A52]"
                    : "bg-white border-[#E6E1D8] text-[#A8A29E]"
                }`}
              >
                {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Quick Adjustment Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E6E1D8]/60 text-xs">
            <span className="text-[11px] text-[#77736D] font-medium mr-1">Adjust:</span>

            <button
              onClick={() => adjustMinutes(-1)}
              className="px-2 py-0.5 rounded bg-white border border-[#E6E1D8] text-[#3F3C38] hover:bg-[#FFF9F0] text-[11px] font-semibold transition-colors cursor-pointer"
            >
              -1m
            </button>
            <button
              onClick={() => adjustMinutes(1)}
              className="px-2 py-0.5 rounded bg-white border border-[#E6E1D8] text-[#3F3C38] hover:bg-[#FFF9F0] text-[11px] font-semibold transition-colors cursor-pointer"
            >
              +1m
            </button>
            <button
              onClick={() => adjustMinutes(5)}
              className="px-2 py-0.5 rounded bg-white border border-[#E6E1D8] text-[#3F3C38] hover:bg-[#FFF9F0] text-[11px] font-semibold transition-colors cursor-pointer"
            >
              +5m
            </button>
            <button
              onClick={() => adjustMinutes(10)}
              className="px-2 py-0.5 rounded bg-white border border-[#E6E1D8] text-[#3F3C38] hover:bg-[#FFF9F0] text-[11px] font-semibold transition-colors cursor-pointer"
            >
              +10m
            </button>

            {/* Quick Preset buttons */}
            <div className="ml-auto flex items-center gap-1">
              <span className="text-[10px] text-[#77736D]">Presets:</span>
              {[2, 5, 10, 15, 25, 45].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCustomMinutes(preset)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                    Math.round(remainingSeconds / 60) === preset && !isRunning
                      ? "bg-[#2D7A52] text-white"
                      : "bg-white border border-[#E6E1D8] text-[#77736D] hover:text-[#242423]"
                  }`}
                >
                  {preset}m
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
