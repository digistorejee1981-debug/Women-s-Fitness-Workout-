import React, { useRef } from 'react';
import { Play, Clock, Flame, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { RECOMMENDED_WORKOUTS } from '../data/mockFitnessData';
import { Workout } from '../types';

interface RecommendedWorkoutsProps {
  onSelectWorkout: (workout: Workout) => void;
}

export const RecommendedWorkouts: React.FC<RecommendedWorkoutsProps> = ({ onSelectWorkout }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getDifficultyBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-500/80 text-white';
      case 'Intermediate':
        return 'bg-amber-500/80 text-white';
      case 'Advanced':
        return 'bg-rose-500/80 text-white';
      default:
        return 'bg-[#0B5D45]/80 text-white';
    }
  };

  return (
    <section id="recommended-workouts-section" className="space-y-3">
      {/* Header with scroll controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#343A40] dark:text-[#F3F7F5] tracking-tight">
            Recommended Workouts
          </h3>
          <p className="text-xs text-gray-500 dark:text-[#9EAEA6]">
            Tailored to your muscle recovery and tone targets
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="scroll-left-btn"
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#18201D] border border-gray-200 dark:border-[#24322B] text-gray-600 dark:text-[#9EAEA6] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-800/40 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="scroll-right-btn"
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#18201D] border border-gray-200 dark:border-[#24322B] text-gray-600 dark:text-[#9EAEA6] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:border-emerald-200 dark:hover:border-emerald-800/40 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory"
      >
        {RECOMMENDED_WORKOUTS.map((workout) => (
          <div
            key={workout.id}
            id={`recommended-card-${workout.id}`}
            onClick={() => onSelectWorkout(workout)}
            className="w-[240px] sm:w-[260px] shrink-0 snap-start bg-white dark:bg-[#18201D] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#24322B] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
          >
            {/* Image Thumbnail Container */}
            <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-gray-900">
              <img
                src={workout.imageUrl}
                alt={workout.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Difficulty Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md ${getDifficultyBadgeColor(workout.level)}`}>
                  {workout.level}
                </span>
              </div>

              {/* Play Button Overlay */}
              <button
                id={`play-workout-${workout.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectWorkout(workout);
                }}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 dark:bg-[#1F2B25]/90 group-hover:bg-[#0B5D45] dark:group-hover:bg-emerald-500 text-[#0B5D45] dark:text-emerald-300 group-hover:text-white dark:group-hover:text-[#063C2E] shadow-md flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 active:scale-95"
                title={`Play ${workout.name}`}
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            </div>

            {/* Content info */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-[#343A40] dark:text-[#F3F7F5] text-sm sm:text-base group-hover:text-[#0B5D45] dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {workout.name}
                </h4>

                <p className="text-xs text-gray-500 dark:text-[#9EAEA6] mt-1 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Metadata row */}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 dark:border-[#24322B] text-xs font-medium text-gray-500 dark:text-[#9EAEA6]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0B5D45] dark:text-emerald-400" />
                  <span>{workout.durationMinutes} min</span>
                </div>

                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{workout.calories} kcal</span>
                </div>

                <span className="text-[11px] font-semibold text-[#0B5D45] dark:text-emerald-400">
                  {workout.exerciseCount} exercises
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
