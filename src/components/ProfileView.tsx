import React from 'react';
import { Award, Flame, Calendar, ShieldCheck, Heart, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { USER_PROFILE } from '../data/mockFitnessData';

export const ProfileView: React.FC = () => {
  const badges = [
    { name: '14-Day Streak', icon: '🔥', desc: 'Unbroken workout consistency' },
    { name: '50kg Squat Club', icon: '🏋️‍♀️', desc: 'Personal strength milestone' },
    { name: 'Cardio Queen', icon: '⚡', desc: 'Completed 10 HIIT sessions' },
    { name: 'Mind & Body', icon: '🧘‍♀️', desc: 'Dedicated 5 hours to yoga' },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#18201D] rounded-3xl p-6 border border-gray-100 dark:border-[#24322B] shadow-sm flex flex-col sm:flex-row items-center gap-6 transition-colors">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#0B5D45] via-[#10B981] to-[#063C2E] shadow-md">
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full bg-white dark:bg-[#18201D]"
            />
          </div>
          <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#18201D] shadow-xs"></span>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <h2 className="text-2xl font-bold text-[#343A40] dark:text-[#F3F7F5]">{USER_PROFILE.fullName}</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#0B5D45] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              {USER_PROFILE.membershipTier}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#9EAEA6]">Member since {USER_PROFILE.joinedDate} • San Francisco, CA</p>

          <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs">
            <div>
              <span className="font-extrabold text-[#0B5D45] dark:text-emerald-400 text-base">{USER_PROFILE.streakDays} Days</span>
              <p className="text-gray-400 dark:text-[#72837B] text-[10px]">Active Streak</p>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-[#24322B]"></div>
            <div>
              <span className="font-extrabold text-[#343A40] dark:text-[#F3F7F5] text-base">38</span>
              <p className="text-gray-400 dark:text-[#72837B] text-[10px]">Total Workouts</p>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-[#24322B]"></div>
            <div>
              <span className="font-extrabold text-[#343A40] dark:text-[#F3F7F5] text-base">14,280</span>
              <p className="text-gray-400 dark:text-[#72837B] text-[10px]">Calories Burned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Profile Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#18201D] border border-gray-100 dark:border-[#24322B] text-center shadow-xs transition-colors">
          <p className="text-xs text-gray-400 dark:text-[#72837B]">Current Weight</p>
          <p className="text-xl font-bold text-[#343A40] dark:text-[#F3F7F5] mt-0.5">{USER_PROFILE.weightKg} kg</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#18201D] border border-gray-100 dark:border-[#24322B] text-center shadow-xs transition-colors">
          <p className="text-xs text-gray-400 dark:text-[#72837B]">Height</p>
          <p className="text-xl font-bold text-[#343A40] dark:text-[#F3F7F5] mt-0.5">{USER_PROFILE.heightCm} cm</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#18201D] border border-gray-100 dark:border-[#24322B] text-center shadow-xs transition-colors">
          <p className="text-xs text-gray-400 dark:text-[#72837B]">Resting Heart Rate</p>
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">58 bpm</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#18201D] border border-gray-100 dark:border-[#24322B] text-center shadow-xs transition-colors">
          <p className="text-xs text-gray-400 dark:text-[#72837B]">Recovery Score</p>
          <p className="text-xl font-bold text-[#0B5D45] dark:text-emerald-400 mt-0.5">94%</p>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white dark:bg-[#18201D] rounded-3xl p-6 border border-gray-100 dark:border-[#24322B] shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#343A40] dark:text-[#F3F7F5]">Earned Achievements</h3>
          <span className="text-xs font-semibold text-[#0B5D45] dark:text-emerald-400">View all (12)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((b) => (
            <div key={b.name} className="p-3.5 rounded-2xl bg-[#F4F6F5]/80 dark:bg-[#131A17] border border-gray-200/60 dark:border-[#24322B] text-center space-y-1">
              <span className="text-3xl block">{b.icon}</span>
              <h4 className="font-bold text-xs text-[#343A40] dark:text-[#F3F7F5]">{b.name}</h4>
              <p className="text-[10px] text-gray-500 dark:text-[#9EAEA6] leading-tight">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
