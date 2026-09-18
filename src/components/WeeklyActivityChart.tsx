import React, { useState } from 'react';
import { BarChart3, CheckCircle2, Flame, Clock, Calendar } from 'lucide-react';
import { WEEKLY_ACTIVITY } from '../data/mockFitnessData';
import { DayActivity } from '../types';

export const WeeklyActivityChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'minutes' | 'calories'>('minutes');
  const [selectedDay, setSelectedDay] = useState<DayActivity | null>(
    WEEKLY_ACTIVITY.find((d) => d.isToday) || WEEKLY_ACTIVITY[3]
  );

  const maxMinutes = 60;
  const maxCalories = 500;

  const totalMinutes = WEEKLY_ACTIVITY.reduce((acc, curr) => acc + (curr.completed ? curr.minutes : 0), 0);
  const totalCalories = WEEKLY_ACTIVITY.reduce((acc, curr) => acc + (curr.completed ? curr.calories : 0), 0);

  return (
    <div
      id="weekly-activity-chart-section"
      className="bg-white dark:bg-[#18201D] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-[#24322B] shadow-sm space-y-5 transition-colors"
    >
      {/* Header & Metric Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#343A40] dark:text-[#F3F7F5] tracking-tight">
              Weekly Activity
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#0B5D45] dark:text-emerald-300 border border-emerald-100 dark:border-emerald-850">
              This Week
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#9EAEA6] mt-0.5">
            Compare active duration and energy expenditure
          </p>
        </div>

        {/* Toggle Pill Buttons */}
        <div className="inline-flex p-1 bg-[#F4F6F5] dark:bg-[#131A17] rounded-xl self-start sm:self-auto border border-gray-200/60 dark:border-[#24322B]">
          <button
            id="metric-toggle-minutes"
            onClick={() => setActiveMetric('minutes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMetric === 'minutes'
                ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                : 'text-gray-500 dark:text-[#9EAEA6] hover:text-[#343A40] dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Minutes</span>
          </button>

          <button
            id="metric-toggle-calories"
            onClick={() => setActiveMetric('calories')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeMetric === 'calories'
                ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                : 'text-gray-500 dark:text-[#9EAEA6] hover:text-[#343A40] dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Calories</span>
          </button>
        </div>
      </div>

      {/* Selected Day Quick Inspector */}
      {selectedDay && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedDay.completed ? 'bg-[#0B5D45] text-white' : 'bg-gray-200 dark:bg-[#24322B] text-gray-500 dark:text-[#9EAEA6]'}`}>
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5] flex items-center gap-1.5">
                {selectedDay.dayName} {selectedDay.isToday && <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold">Today</span>}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-[#9EAEA6]">
                {selectedDay.completed ? 'Workout session verified' : 'Scheduled routine'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-xs font-extrabold text-[#0B5D45] dark:text-emerald-400">{selectedDay.minutes} min</p>
              <p className="text-[10px] text-gray-400 dark:text-[#72837B]">Duration</p>
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#343A40] dark:text-[#F3F7F5]">{selectedDay.calories} kcal</p>
              <p className="text-[10px] text-gray-400 dark:text-[#72837B]">Burned</p>
            </div>
          </div>
        </div>
      )}

      {/* 7-Day Interactive Visual Bar Chart */}
      <div className="pt-2">
        <div className="h-44 sm:h-48 flex items-end justify-between gap-2 sm:gap-4 px-1 pb-2">
          {WEEKLY_ACTIVITY.map((item) => {
            const isSelected = selectedDay?.day === item.day;
            const value = activeMetric === 'minutes' ? item.minutes : item.calories;
            const max = activeMetric === 'minutes' ? maxMinutes : maxCalories;
            const barHeightPercent = Math.min(100, Math.max(16, (value / max) * 100));

            return (
              <div
                key={item.day}
                id={`chart-day-${item.day}`}
                onClick={() => setSelectedDay(item)}
                className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
              >
                {/* Value tooltip label on hover or selected */}
                <div
                  className={`text-[10px] font-bold mb-1.5 transition-all duration-200 ${
                    isSelected
                      ? 'text-[#0B5D45] dark:text-emerald-400 scale-110 opacity-100'
                      : 'text-gray-400 dark:text-[#72837B] group-hover:text-gray-700 dark:group-hover:text-gray-200 opacity-80'
                  }`}
                >
                  {value}
                  <span className="text-[8px] ml-0.5">{activeMetric === 'minutes' ? 'm' : 'k'}</span>
                </div>

                {/* Bar Visual */}
                <div className="w-full max-w-[38px] bg-gray-100 dark:bg-[#131A17] rounded-t-xl overflow-hidden flex flex-col justify-end p-0.5 h-32 sm:h-36 relative">
                  {/* Background grid marker */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 dark:from-emerald-950/20 to-transparent pointer-events-none"></div>

                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 relative ${
                      item.completed
                        ? isSelected
                          ? 'bg-gradient-to-t from-[#063C2E] to-[#0B5D45] dark:from-emerald-700 dark:to-emerald-500 shadow-md shadow-[#0B5D45]/30 ring-2 ring-[#0B5D45]/40 dark:ring-emerald-400/40'
                          : 'bg-gradient-to-t from-[#0B5D45] to-[#10B981] group-hover:brightness-110'
                        : isSelected
                        ? 'bg-gray-400 dark:bg-gray-600 ring-2 ring-gray-300 dark:ring-gray-500'
                        : 'bg-gray-300/80 dark:bg-gray-700/80 group-hover:bg-gray-400'
                    }`}
                    style={{ height: `${barHeightPercent}%` }}
                  >
                    {/* Top glossy reflection cap */}
                    <div className="h-1.5 w-full bg-white/25 rounded-t-lg"></div>
                  </div>
                </div>

                {/* Completed workout indicator icon */}
                <div className="h-5 flex items-center justify-center mt-2">
                  {item.completed ? (
                    <div className="w-4 h-4 rounded-full bg-[#0B5D45] dark:bg-emerald-500 text-white dark:text-[#063C2E] flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-[#24322B]"></div>
                  )}
                </div>

                {/* Day of Week Label */}
                <span
                  className={`mt-1 text-xs font-semibold tracking-tight transition-colors ${
                    isSelected
                      ? 'text-[#0B5D45] dark:text-emerald-400 font-bold'
                      : item.isToday
                      ? 'text-[#0B5D45] dark:text-emerald-400'
                      : 'text-gray-500 dark:text-[#9EAEA6]'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Aggregations */}
      <div className="pt-3 border-t border-gray-100 dark:border-[#24322B] grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-[#F4F6F5]/60 dark:bg-[#131A17]">
          <p className="text-gray-400 dark:text-[#72837B] text-[10px] font-medium">Weekly Time</p>
          <p className="text-sm font-bold text-[#0B5D45] dark:text-emerald-400">{totalMinutes} min</p>
        </div>

        <div className="p-2 rounded-xl bg-[#F4F6F5]/60 dark:bg-[#131A17]">
          <p className="text-gray-400 dark:text-[#72837B] text-[10px] font-medium">Calories Burned</p>
          <p className="text-sm font-bold text-[#343A40] dark:text-[#F3F7F5]">{totalCalories} kcal</p>
        </div>

        <div className="p-2 rounded-xl bg-[#F4F6F5]/60 dark:bg-[#131A17]">
          <p className="text-gray-400 dark:text-[#72837B] text-[10px] font-medium">Workouts Done</p>
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">4 / 7 days</p>
        </div>
      </div>
    </div>
  );
};
