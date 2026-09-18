import React from 'react';
import { Play, Clock, Flame, Dumbbell, Zap, Layers } from 'lucide-react';
import { TODAYS_WORKOUT } from '../data/mockFitnessData';

interface TodaysWorkoutCardProps {
  onStartWorkout: () => void;
}

export const TodaysWorkoutCard: React.FC<TodaysWorkoutCardProps> = ({ onStartWorkout }) => {
  return (
    <div
      id="todays-workout-card"
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-[#18201D] shadow-lg border border-gray-100 dark:border-[#24322B] group transition-all duration-300 hover:shadow-xl"
    >
      {/* Background Image Container with Deep Green Gradient Overlay */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900">
        <img
          src={TODAYS_WORKOUT.imageUrl}
          alt={TODAYS_WORKOUT.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Deep Green gradient overlays for contrast and luxury aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#063C2E] via-[#0B5D45]/75 to-black/25"></div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-xs font-semibold text-white tracking-wide">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            TODAY&apos;S FOCUS
          </span>

          <span className="px-3 py-1 rounded-full bg-[#063C2E]/80 backdrop-blur-md border border-emerald-500/30 text-xs font-medium text-emerald-300">
            {TODAYS_WORKOUT.level}
          </span>
        </div>

        {/* Floating Quick Stats on Card Image */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              {TODAYS_WORKOUT.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100/90 font-normal line-clamp-1 mb-3">
            {TODAYS_WORKOUT.description}
          </p>

          {/* 4 Feature Tags */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/15">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>{TODAYS_WORKOUT.durationMinutes} min</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
              <Flame className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{TODAYS_WORKOUT.calories} kcal</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>{TODAYS_WORKOUT.exerciseCount} Exercises</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-100">
              <Layers className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span className="truncate">Compound</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#18201D] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-gray-100 dark:border-[#24322B]">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#9EAEA6] w-full sm:w-auto">
          <span className="font-semibold text-[#0B5D45] dark:text-emerald-400">Equipment:</span>
          <span>Dumbbells, Mat, Bench</span>
        </div>

        <button
          id="start-workout-action-btn"
          onClick={onStartWorkout}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl sm:rounded-full bg-[#0B5D45] hover:bg-[#084A37] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-[#0B5D45]/20 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
          </div>
          <span>Start Workout</span>
        </button>
      </div>
    </div>
  );
};
