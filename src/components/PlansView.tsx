import React from 'react';
import { Calendar, CheckCircle2, Trophy, Clock, Sparkles, ChevronRight } from 'lucide-react';

export const PlansView: React.FC = () => {
  const weeks = [
    {
      weekNumber: 1,
      title: 'Foundation & Mobility Activation',
      status: 'Completed',
      days: [
        { day: 'Day 1', name: 'Lower Body Primer', status: 'done', minutes: 30 },
        { day: 'Day 2', name: 'Upper Body Tone', status: 'done', minutes: 25 },
        { day: 'Day 3', name: 'Active Recovery Yoga', status: 'done', minutes: 20 },
        { day: 'Day 4', name: 'Full Body Circuit', status: 'done', minutes: 35 },
        { day: 'Day 5', name: 'Core Sculpt', status: 'done', minutes: 20 },
      ],
    },
    {
      weekNumber: 2,
      title: 'Progressive Strength & Glute Focus',
      status: 'In Progress (Day 4)',
      isCurrent: true,
      days: [
        { day: 'Day 8', name: 'Glute Hypertrophy', status: 'done', minutes: 35 },
        { day: 'Day 9', name: 'Back & Deltoid Definition', status: 'done', minutes: 30 },
        { day: 'Day 10', name: 'Metabolic HIIT Intervals', status: 'done', minutes: 22 },
        { day: 'Day 11', name: 'Full Body Strength', status: 'today', minutes: 35 },
        { day: 'Day 12', name: 'Deep Core & Waistline', status: 'upcoming', minutes: 20 },
      ],
    },
    {
      weekNumber: 3,
      title: 'Metabolic Pacing & Peak Endurance',
      status: 'Locked',
      days: [
        { day: 'Day 15', name: 'Compound Heavy Lower', status: 'upcoming', minutes: 40 },
        { day: 'Day 16', name: 'Postural Alignment & Arms', status: 'upcoming', minutes: 30 },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Hero Card for the Active Program */}
      <div className="bg-gradient-to-br from-[#0B5D45] to-[#063C2E] p-6 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-200">
          <Trophy className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Active 4-Week Program</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          FemmeFit: Sculpt & Tone Phase II
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
          A dedicated resistance routine balanced with active recovery to sculpt lean curves, enhance posture, and cultivate deep abdominal stability.
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs">
          <div>
            <span className="text-emerald-200/70 block">Progress</span>
            <span className="font-bold text-white text-sm">48% Completed</span>
          </div>
          <div className="h-8 w-px bg-white/20"></div>
          <div>
            <span className="text-emerald-200/70 block">Schedule</span>
            <span className="font-bold text-white text-sm">5 Days / Week</span>
          </div>
        </div>
      </div>

      {/* Week Schedules */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-[#343A40] dark:text-[#F3F7F5]">Program Timeline</h3>

        {weeks.map((w) => (
          <div
            key={w.weekNumber}
            className={`bg-white dark:bg-[#18201D] rounded-2xl p-5 border transition-colors ${
              w.isCurrent
                ? 'border-[#0B5D45] dark:border-emerald-500 ring-2 ring-[#0B5D45]/10 dark:ring-emerald-500/15 shadow-md'
                : 'border-gray-100 dark:border-[#24322B] shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#24322B]">
              <div>
                <span className="text-xs font-bold text-[#0B5D45] dark:text-emerald-400 uppercase tracking-wider">
                  Week {w.weekNumber}
                </span>
                <h4 className="font-bold text-[#343A40] dark:text-[#F3F7F5] text-sm sm:text-base mt-0.5">
                  {w.title}
                </h4>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  w.isCurrent
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-[#0B5D45] dark:text-emerald-300'
                    : w.status === 'Completed'
                    ? 'bg-gray-100 dark:bg-[#24322B] text-gray-600 dark:text-[#9EAEA6]'
                    : 'bg-gray-100 dark:bg-[#1A231F] text-gray-400 dark:text-[#72837B]'
                }`}
              >
                {w.status}
              </span>
            </div>

            <div className="divide-y divide-gray-50 dark:divide-[#24322B]/60 mt-2">
              {w.days.map((d) => (
                <div key={d.day} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-400 dark:text-[#72837B] w-12">{d.day}</span>
                    <span
                      className={`font-bold ${
                        d.status === 'today'
                          ? 'text-[#0B5D45] dark:text-emerald-400'
                          : 'text-[#343A40] dark:text-[#F3F7F5]'
                      }`}
                    >
                      {d.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 dark:text-[#72837B]">{d.minutes} min</span>
                    {d.status === 'done' && (
                      <CheckCircle2 className="w-4 h-4 text-[#0B5D45] dark:text-emerald-400" />
                    )}
                    {d.status === 'today' && (
                      <span className="px-2 py-0.5 rounded-md bg-[#0B5D45] dark:bg-emerald-600 text-white font-bold text-[10px]">
                        Today
                      </span>
                    )}
                    {d.status === 'upcoming' && (
                      <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
