import React, { useState } from 'react';
import { Search, Filter, Play, Clock, Flame, Dumbbell } from 'lucide-react';
import { RECOMMENDED_WORKOUTS, TODAYS_WORKOUT } from '../data/mockFitnessData';
import { Workout } from '../types';

interface WorkoutsViewProps {
  onSelectWorkout: (workout: Workout) => void;
}

export const WorkoutsView: React.FC<WorkoutsViewProps> = ({ onSelectWorkout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allWorkouts: Workout[] = [TODAYS_WORKOUT, ...RECOMMENDED_WORKOUTS];

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'strength', label: 'Strength & Sculpt' },
    { id: 'core', label: 'Abs & Core' },
    { id: 'hiit', label: 'HIIT & Burn' },
    { id: 'yoga', label: 'Yoga & Recovery' },
  ];

  const filtered = allWorkouts.filter((w) => {
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesQuery = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.focusAreas.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-5 pb-20 max-w-5xl mx-auto">
      {/* Search and Header */}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#343A40] dark:text-[#F3F7F5]">Workout Library</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#9EAEA6]">
            Targeted training sessions structured specifically for female anatomy and metabolic pacing
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 dark:text-[#72837B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search glutes, core, HIIT, kettlebell..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#18201D] border border-gray-200 dark:border-[#24322B] text-sm text-[#343A40] dark:text-[#F3F7F5] placeholder:text-gray-400 dark:placeholder:text-[#72837B] focus:outline-none focus:ring-2 focus:ring-[#0B5D45]/30 focus:border-[#0B5D45] transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0B5D45] text-white shadow-xs'
                  : 'bg-white dark:bg-[#18201D] text-gray-600 dark:text-[#9EAEA6] border border-gray-200 dark:border-[#24322B] hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Workouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((workout) => (
          <div
            key={workout.id}
            onClick={() => onSelectWorkout(workout)}
            className="bg-white dark:bg-[#18201D] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#24322B] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-44 w-full overflow-hidden bg-gray-900">
              <img
                src={workout.imageUrl}
                alt={workout.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#063C2E]/80 text-emerald-300 backdrop-blur-md">
                {workout.level}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectWorkout(workout);
                }}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 group-hover:bg-[#0B5D45] dark:group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:text-[#063C2E] shadow-md flex items-center justify-center transition-all duration-300"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#343A40] dark:text-[#F3F7F5] text-base group-hover:text-[#0B5D45] dark:group-hover:text-emerald-400 transition-colors">
                  {workout.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-[#9EAEA6] mt-1 line-clamp-2 leading-relaxed">
                  {workout.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-[#24322B] text-xs font-medium text-gray-500 dark:text-[#9EAEA6]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#0B5D45] dark:text-emerald-400" />
                  <span>{workout.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{workout.calories} kcal</span>
                </div>
                <span className="font-semibold text-[#0B5D45] dark:text-emerald-400">{workout.exerciseCount} exercises</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
