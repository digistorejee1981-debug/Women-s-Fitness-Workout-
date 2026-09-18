/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { WeeklyGoalCard } from './components/WeeklyGoalCard';
import { TodaysWorkoutCard } from './components/TodaysWorkoutCard';
import { DailyStatsGrid } from './components/DailyStatsGrid';
import { WeeklyActivityChart } from './components/WeeklyActivityChart';
import { RecommendedWorkouts } from './components/RecommendedWorkouts';
import { ProgressSection } from './components/ProgressSection';
import { MotivationCard } from './components/MotivationCard';
import { BottomNavigation } from './components/BottomNavigation';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import { NotificationModal } from './components/NotificationModal';
import { SettingsModal } from './components/SettingsModal';
import { WorkoutsView } from './components/WorkoutsView';
import { PlansView } from './components/PlansView';
import { ProfileView } from './components/ProfileView';
import { WorkoutCalendarView } from './components/WorkoutCalendarView';
import { TODAYS_WORKOUT, COMPLETED_WORKOUTS_HISTORY } from './data/mockFitnessData';
import { NavTab, Workout, CompletedWorkout } from './types';
import { Smartphone, Monitor, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeWorkoutModal, setActiveWorkoutModal] = useState<Workout | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(1);
  const [deviceFrame, setDeviceFrame] = useState<'mobile' | 'fluid'>('fluid');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>(COMPLETED_WORKOUTS_HISTORY);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStartWorkout = (workout: Workout = TODAYS_WORKOUT) => {
    setActiveWorkoutModal(workout);
  };

  const handleWorkoutCompleted = () => {
    if (activeWorkoutModal) {
      const newSession: CompletedWorkout = {
        id: `cw-${Date.now()}`,
        workoutId: activeWorkoutModal.id,
        date: '2026-09-18',
        name: activeWorkoutModal.name,
        category: activeWorkoutModal.category,
        durationMinutes: activeWorkoutModal.durationMinutes,
        calories: activeWorkoutModal.calories,
        exercisesCompleted: activeWorkoutModal.exercises?.length || 8,
        timeOfDay: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feeling: 'Strong',
        notes: `Crushed ${activeWorkoutModal.name}! Consistency streak maintained.`,
      };
      setCompletedWorkouts((prev) => [newSession, ...prev]);
    }
    showToast('🎉 Outstanding session logged! Streak advanced to 15 days.');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F5] dark:bg-[#0F1412] text-[#343A40] dark:text-[#F3F7F5] flex flex-col font-sans selection:bg-[#0B5D45] selection:text-white relative transition-colors duration-200">
      {/* Top Device Viewport & Theme Switcher */}
      <aside aria-label="Device Viewport and Theme Bar" className="bg-[#063C2E] text-white py-1.5 px-4 text-xs flex items-center justify-between border-b border-emerald-900/60 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-emerald-200 tracking-wide text-[11px]">
            FemmeFit • Premium Women&apos;s Fitness UI/UX
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Theme Switcher in top bar */}
          <button
            id="top-bar-theme-toggle"
            onClick={toggleTheme}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/40 text-[11px] text-emerald-200 hover:text-white transition-colors cursor-pointer"
            title={`Current: ${isDark ? 'Dark Mode' : 'Soft Gray'}. Click to toggle.`}
          >
            {isDark ? (
              <>
                <Sun className="w-3 h-3 text-amber-300" />
                <span className="font-medium">Dark Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-gray-300" />
                <span className="font-medium">Soft Gray</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setDeviceFrame('mobile')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                deviceFrame === 'mobile' ? 'bg-[#0B5D45] text-white font-bold' : 'text-gray-300 hover:text-white'
              }`}
              title="Switch to Mobile Frame"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline">Mobile Phone</span>
            </button>
            <button
              onClick={() => setDeviceFrame('fluid')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                deviceFrame === 'fluid' ? 'bg-[#0B5D45] text-white font-bold' : 'text-gray-300 hover:text-white'
              }`}
              title="Switch to Responsive Fluid Layout"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Fluid</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        deviceFrame === 'mobile'
          ? 'max-w-[430px] mx-auto w-full shadow-2xl my-3 sm:my-6 rounded-3xl border-8 border-gray-900 dark:border-[#27342F] overflow-hidden bg-[#F4F6F5] dark:bg-[#0F1412] relative'
          : 'w-full max-w-5xl mx-auto'
      }`}>
        {/* Top Header */}
        <Header
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenSettings={() => setShowSettings(true)}
          onOpenProfile={() => setActiveTab('profile')}
          unreadCount={unreadNotificationCount}
        />

        {/* Dynamic Body Content based on active navigation tab */}
        <main className="flex-1 px-4 sm:px-6 py-4 sm:py-6 space-y-6 pb-28">
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              {/* 2. Fitness Goal Card */}
              <WeeklyGoalCard onContinueWorkout={() => handleStartWorkout(TODAYS_WORKOUT)} />

              {/* 3. Today's Workout */}
              <TodaysWorkoutCard onStartWorkout={() => handleStartWorkout(TODAYS_WORKOUT)} />

              {/* 4. Daily Activity Statistics */}
              <DailyStatsGrid />

              {/* 5. Weekly Activity Chart */}
              <WeeklyActivityChart />

              {/* 6. Calendar View Component - Completed Workouts & Consistency */}
              <WorkoutCalendarView
                completedWorkouts={completedWorkouts}
                onSelectWorkout={(w) => handleStartWorkout(w)}
              />

              {/* 7. Recommended Workouts */}
              <RecommendedWorkouts onSelectWorkout={(w) => handleStartWorkout(w)} />

              {/* 8. Progress Section */}
              <ProgressSection />

              {/* 9. Motivation Card */}
              <MotivationCard />
            </div>
          )}

          {activeTab === 'workouts' && (
            <WorkoutsView onSelectWorkout={(w) => handleStartWorkout(w)} />
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6 animate-fadeIn pb-20">
              <WorkoutCalendarView
                completedWorkouts={completedWorkouts}
                onSelectWorkout={(w) => handleStartWorkout(w)}
              />
              <ProgressSection />
              <WeeklyActivityChart />
              <DailyStatsGrid />
            </div>
          )}

          {activeTab === 'plans' && <PlansView />}

          {activeTab === 'profile' && <ProfileView />}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab={activeTab}
          onChangeTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Interactive Modals */}
      {activeWorkoutModal && (
        <WorkoutPlayerModal
          workout={activeWorkoutModal}
          onClose={() => setActiveWorkoutModal(null)}
          onComplete={handleWorkoutCompleted}
        />
      )}

      {showNotifications && (
        <NotificationModal
          onClose={() => setShowNotifications(false)}
          onClearAll={() => setUnreadNotificationCount(0)}
        />
      )}

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#063C2E] text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
