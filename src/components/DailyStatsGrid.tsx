import React from 'react';
import { Flame, Clock, Footprints, Dumbbell, TrendingUp } from 'lucide-react';
import { DAILY_STATS } from '../data/mockFitnessData';

export const DailyStatsGrid: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame':
        return <Flame className="w-5 h-5 text-amber-500 fill-amber-500/20" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-[#0B5D45]" />;
      case 'footprints':
        return <Footprints className="w-5 h-5 text-emerald-600" />;
      case 'dumbbell':
        return <Dumbbell className="w-5 h-5 text-[#063C2E]" />;
      default:
        return <Flame className="w-5 h-5 text-[#0B5D45]" />;
    }
  };

  return (
    <section id="daily-activity-statistics" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-[#343A40] dark:text-[#F3F7F5] tracking-tight">
          Daily Activity Statistics
        </h3>
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800/40 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Updated 5m ago
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {DAILY_STATS.map((stat) => (
          <div
            key={stat.id}
            id={stat.id}
            className="relative overflow-hidden bg-white dark:bg-[#18201D] rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-[#24322B] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
          >
            {/* Glossy corner highlight */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#0B5D45]/10 dark:from-emerald-400/10 to-transparent rounded-bl-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4F6F5] dark:bg-[#1F2B25] flex items-center justify-center group-hover:scale-105 transition-transform">
                {getIcon(stat.icon)}
              </div>
              <span className="text-[11px] font-medium text-gray-400 dark:text-[#72837B]">
                / {stat.target}
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#343A40] dark:text-[#F3F7F5] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-[#9EAEA6] uppercase">
                  {stat.unit}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-[#9EAEA6]">
                {stat.label}
              </p>
            </div>

            {/* Mini visual progress track */}
            <div className="mt-3 pt-2 border-t border-gray-50 dark:border-[#24322B]">
              <div className="w-full bg-gray-100 dark:bg-[#1F2B25] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0B5D45] to-[#10B981] transition-all duration-1000 ease-out"
                  style={{ width: `${stat.percent}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] font-medium text-gray-400 dark:text-[#72837B]">
                  {stat.change}
                </span>
                <span className="text-[10px] font-bold text-[#0B5D45] dark:text-emerald-400">
                  {stat.percent}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
