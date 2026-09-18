import React from 'react';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { USER_PROFILE } from '../data/mockFitnessData';

interface WeeklyGoalCardProps {
  onContinueWorkout: () => void;
}

export const WeeklyGoalCard: React.FC<WeeklyGoalCardProps> = ({ onContinueWorkout }) => {
  const percentage = USER_PROFILE.completionRate; // 72%
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      id="fitness-weekly-goal-card"
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0B5D45] via-[#084A37] to-[#063C2E] p-5 sm:p-7 text-white shadow-xl shadow-[#0B5D45]/15 border border-[#0f6f53]/40 group"
    >
      {/* Subtle glossy background highlight rings */}
      <div className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full bg-radial from-white/12 to-transparent blur-xl"></div>
      <div className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-[#10B981]/10 blur-2xl"></div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
        {/* Left Content */}
        <div className="flex-1 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-emerald-200">
            <Trophy className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Weekly Target</span>
            <span className="w-1 h-1 rounded-full bg-emerald-300"></span>
            <span className="text-white font-semibold">Stage 2</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Your Weekly Goal
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-1">
              <span className="text-white font-semibold">{USER_PROFILE.weeklyCompletedCount} of {USER_PROFILE.weeklyGoalCount} workouts</span> completed
            </p>
          </div>

          <p className="text-xs sm:text-sm text-emerald-200/80 max-w-sm">
            Just 1 session left to hit your weekly streak milestone and earn 150 bonus power points.
          </p>

          <div className="pt-2">
            <button
              id="continue-workout-cta-btn"
              onClick={onContinueWorkout}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white text-[#0B5D45] font-semibold text-sm shadow-md hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer group/btn"
            >
              <span>Continue Workout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Circular Progress Ring */}
        <div className="flex items-center justify-center sm:self-center shrink-0">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-white/15"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-emerald-300"
                strokeWidth="8"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Ring Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="flex items-baseline">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {percentage}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-200">%</span>
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-emerald-200/90 tracking-wide uppercase">
                Completed
              </span>
            </div>

            {/* Trophy accent icon floating badge */}
            <div className="absolute -top-1 right-2 w-7 h-7 rounded-full bg-amber-400 text-[#063C2E] flex items-center justify-center shadow-lg border-2 border-[#0B5D45]">
              <Sparkles className="w-3.5 h-3.5 fill-[#063C2E]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
