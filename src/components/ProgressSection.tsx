import React, { useState } from 'react';
import { TrendingDown, Award, Flame, Scale, Ruler, Dumbbell, Sparkles } from 'lucide-react';
import { PROGRESS_HISTORY, USER_PROFILE } from '../data/mockFitnessData';

type ProgressTab = 'weight' | 'measurements' | 'strength' | 'streak';

export const ProgressSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProgressTab>('weight');

  return (
    <div
      id="progress-section-card"
      className="bg-white dark:bg-[#18201D] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-[#24322B] shadow-sm space-y-5 transition-colors"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#343A40] dark:text-[#F3F7F5] tracking-tight">
              Progress & Body Metrics
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0B5D45]/10 dark:bg-emerald-950/60 text-[#0B5D45] dark:text-emerald-300">
              Milestone Active
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#9EAEA6] mt-0.5">
            Real data tracking your personal transformation journey
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap p-1 bg-[#F4F6F5] dark:bg-[#131A17] rounded-xl border border-gray-200/60 dark:border-[#24322B] gap-0.5">
          <button
            id="tab-btn-weight"
            onClick={() => setActiveTab('weight')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'weight'
                ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                : 'text-gray-500 dark:text-[#9EAEA6] hover:text-[#343A40] dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Weight</span>
          </button>

          <button
            id="tab-btn-measurements"
            onClick={() => setActiveTab('measurements')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'measurements'
                ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                : 'text-gray-500 dark:text-[#9EAEA6] hover:text-[#343A40] dark:hover:text-white'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Measurements</span>
          </button>

          <button
            id="tab-btn-strength"
            onClick={() => setActiveTab('strength')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'strength'
                ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                : 'text-gray-500 dark:text-[#9EAEA6] hover:text-[#343A40] dark:hover:text-white'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Strength</span>
          </button>

          <button
            id="tab-btn-streak"
            onClick={() => setActiveTab('streak')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'streak'
                ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                : 'text-gray-500 dark:text-[#9EAEA6] hover:text-[#343A40] dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Streak</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Body */}
      {activeTab === 'weight' && (
        <div className="space-y-4">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B]">
              <span className="text-[11px] font-medium text-gray-500 dark:text-[#9EAEA6]">Current Weight</span>
              <p className="text-lg sm:text-xl font-extrabold text-[#343A40] dark:text-[#F3F7F5] mt-0.5">
                {USER_PROFILE.weightKg} <span className="text-xs font-medium text-gray-500 dark:text-[#9EAEA6]">kg</span>
              </p>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                <TrendingDown className="w-3 h-3" /> -3.7 kg total
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B]">
              <span className="text-[11px] font-medium text-gray-500 dark:text-[#9EAEA6]">Target Weight</span>
              <p className="text-lg sm:text-xl font-extrabold text-[#0B5D45] dark:text-emerald-400 mt-0.5">
                {USER_PROFILE.targetWeightKg} <span className="text-xs font-medium text-gray-500 dark:text-[#9EAEA6]">kg</span>
              </p>
              <span className="text-[10px] font-medium text-gray-500 dark:text-[#9EAEA6] mt-1 block">
                1.8 kg remaining
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B]">
              <span className="text-[11px] font-medium text-gray-500 dark:text-[#9EAEA6]">Starting</span>
              <p className="text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-300 mt-0.5">
                {USER_PROFILE.startingWeightKg} <span className="text-xs font-medium text-gray-400 dark:text-[#72837B]">kg</span>
              </p>
              <span className="text-[10px] font-medium text-gray-400 dark:text-[#72837B] mt-1 block">
                6 weeks ago
              </span>
            </div>
          </div>

          {/* Line Chart Component with Milestones */}
          <div className="relative pt-4 pb-2">
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-[#72837B] mb-2">
              <span>Weight Trajectory</span>
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#0B5D45] dark:bg-emerald-400"></span> Linear Trend
              </span>
            </div>

            {/* Custom SVG Modern Line Chart */}
            <div className="h-40 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B5D45" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0B5D45" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" className="text-gray-200 dark:text-[#24322B]" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="65" x2="400" y2="65" stroke="currentColor" className="text-gray-200 dark:text-[#24322B]" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="400" y2="110" stroke="currentColor" className="text-gray-200 dark:text-[#24322B]" strokeWidth="1" strokeDasharray="3 3" />

                {/* Target dashed line */}
                <line x1="0" y1="118" x2="400" y2="118" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />

                {/* Area fill under curve */}
                <path
                  d="M 30 25 Q 120 45, 170 65 T 280 90 T 370 108 L 370 130 L 30 130 Z"
                  fill="url(#weightGradient)"
                />

                {/* Smooth curve line */}
                <path
                  d="M 30 25 Q 120 45, 170 65 T 280 90 T 370 108"
                  fill="none"
                  stroke="#0B5D45"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="30" cy="25" r="4.5" fill="#ffffff" stroke="#0B5D45" strokeWidth="2.5" />
                <circle cx="150" cy="55" r="4.5" fill="#ffffff" stroke="#0B5D45" strokeWidth="2.5" />
                <circle cx="260" cy="85" r="4.5" fill="#ffffff" stroke="#0B5D45" strokeWidth="2.5" />
                <circle cx="370" cy="108" r="6" fill="#0B5D45" stroke="#ffffff" strokeWidth="3" />
              </svg>

              {/* Milestone Indicator Tag */}
              <div className="absolute top-1 right-2 sm:right-6 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-[#0B5D45] dark:text-emerald-300 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Milestone: Sub-60kg Achieved!</span>
              </div>
            </div>

            {/* X-axis date labels */}
            <div className="flex justify-between text-[11px] font-medium text-gray-400 dark:text-[#72837B] px-3 pt-2">
              {PROGRESS_HISTORY.map((item) => (
                <span key={item.date}>{item.date}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'measurements' && (
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#343A40] dark:text-[#F3F7F5]">Waist</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">-4.5 cm</span>
              </div>
              <p className="text-xl font-extrabold text-[#0B5D45] dark:text-emerald-400">69.5 cm</p>
              <div className="w-full bg-gray-200 dark:bg-[#24322B] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0B5D45] dark:bg-emerald-500 h-full rounded-full w-[82%]"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#343A40] dark:text-[#F3F7F5]">Hips</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">-2.0 cm</span>
              </div>
              <p className="text-xl font-extrabold text-[#0B5D45] dark:text-emerald-400">97.0 cm</p>
              <div className="w-full bg-gray-200 dark:bg-[#24322B] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0B5D45] dark:bg-emerald-500 h-full rounded-full w-[88%]"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#343A40] dark:text-[#F3F7F5]">Thigh</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">-1.8 cm</span>
              </div>
              <p className="text-xl font-extrabold text-[#0B5D45] dark:text-emerald-400">54.2 cm</p>
              <div className="w-full bg-gray-200 dark:bg-[#24322B] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0B5D45] dark:bg-emerald-500 h-full rounded-full w-[76%]"></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#9EAEA6] italic text-center pt-1">
            Measurements recorded every 2 weeks using body tape.
          </p>
        </div>
      )}

      {activeTab === 'strength' && (
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-[#9EAEA6]">Barbell Back Squat</p>
                <p className="text-xl font-extrabold text-[#0B5D45] dark:text-emerald-400">55 kg <span className="text-xs font-semibold text-gray-400 dark:text-[#72837B]">1RM</span></p>
              </div>
              <span className="px-2 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                +15 kg gain
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-[#9EAEA6]">Barbell Hip Thrust</p>
                <p className="text-xl font-extrabold text-[#0B5D45] dark:text-emerald-400">75 kg <span className="text-xs font-semibold text-gray-400 dark:text-[#72837B]">1RM</span></p>
              </div>
              <span className="px-2 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                +25 kg gain
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'streak' && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-[#131F1A] dark:to-[#172520] border border-emerald-200/60 dark:border-[#24322B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0B5D45] text-white flex items-center justify-center shadow-md">
              <Flame className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#343A40] dark:text-[#F3F7F5]">14-Day Workout Streak!</p>
              <p className="text-xs text-gray-600 dark:text-[#9EAEA6]">You are in the top 5% of consistent athletes this month.</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div
                key={num}
                className="w-7 h-7 rounded-full bg-[#0B5D45] text-white text-[11px] font-bold flex items-center justify-center shadow-xs"
                title={`Day ${num}`}
              >
                ✓
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
