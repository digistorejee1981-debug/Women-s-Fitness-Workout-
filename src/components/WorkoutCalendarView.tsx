import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Flame,
  Clock,
  Dumbbell,
  CheckCircle2,
  Sparkles,
  Zap,
  Heart,
  Target,
  Trophy,
  Play,
  RotateCcw,
  Info
} from 'lucide-react';
import { CompletedWorkout, Workout } from '../types';
import { COMPLETED_WORKOUTS_HISTORY, TODAYS_WORKOUT, RECOMMENDED_WORKOUTS } from '../data/mockFitnessData';

interface WorkoutCalendarViewProps {
  completedWorkouts?: CompletedWorkout[];
  onSelectWorkout?: (workout: Workout) => void;
  className?: string;
}

export const WorkoutCalendarView: React.FC<WorkoutCalendarViewProps> = ({
  completedWorkouts = COMPLETED_WORKOUTS_HISTORY,
  onSelectWorkout,
  className = '',
}) => {
  // Today's date reference: September 18, 2026
  const todayDateStr = '2026-09-18';
  const today = new Date(2026, 8, 18); // Note: 8 is September in 0-indexed JS Date

  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(8); // September (0-indexed)
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayDateStr);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleJumpToToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(8);
    setSelectedDateStr(todayDateStr);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Map workouts by date
  const workoutsByDate = useMemo(() => {
    const map = new Map<string, CompletedWorkout[]>();
    completedWorkouts.forEach((item) => {
      const existing = map.get(item.date) || [];
      existing.push(item);
      map.set(item.date, existing);
    });
    return map;
  }, [completedWorkouts]);

  // Calendar Grid calculation (Monday-first)
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDaysCount = new Date(currentYear, currentMonth, 0).getDate();

    // Monday = 0, Sunday = 6
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: Array<{
      dayNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      workouts: CompletedWorkout[];
    }> = [];

    // Preceding month trailing days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthDaysCount - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === todayDateStr,
        workouts: workoutsByDate.get(dateStr) || [],
      });
    }

    // Current month days
    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: true,
        isToday: dateStr === todayDateStr,
        workouts: workoutsByDate.get(dateStr) || [],
      });
    }

    // Trailing days to fill 35 or 42 grid slots
    const remainingSlots = (7 - (days.length % 7)) % 7;
    for (let dayNum = 1; dayNum <= remainingSlots; dayNum++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === todayDateStr,
        workouts: workoutsByDate.get(dateStr) || [],
      });
    }

    return days;
  }, [currentYear, currentMonth, workoutsByDate, todayDateStr]);

  // Monthly statistics
  const currentMonthWorkouts = useMemo(() => {
    const prefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    return completedWorkouts.filter((w) => w.date.startsWith(prefix));
  }, [completedWorkouts, currentYear, currentMonth]);

  const monthlyStats = useMemo(() => {
    const totalCount = currentMonthWorkouts.length;
    const totalMinutes = currentMonthWorkouts.reduce((acc, curr) => acc + curr.durationMinutes, 0);
    const totalCalories = currentMonthWorkouts.reduce((acc, curr) => acc + curr.calories, 0);
    // In September up to the 18th, 18 days passed
    const daysElapsed = currentMonth === 8 && currentYear === 2026 ? 18 : 30;
    const consistencyRate = Math.min(100, Math.round((totalCount / Math.max(1, daysElapsed)) * 100));

    return {
      totalCount,
      totalMinutes,
      totalCalories,
      consistencyRate,
    };
  }, [currentMonthWorkouts, currentMonth, currentYear]);

  // Workouts for currently selected date
  const selectedDayWorkouts = useMemo(() => {
    const raw = workoutsByDate.get(selectedDateStr) || [];
    if (categoryFilter === 'all') return raw;
    return raw.filter((w) => w.category === categoryFilter);
  }, [workoutsByDate, selectedDateStr, categoryFilter]);

  // Formatting helper for selected date header
  const formattedSelectedDate = useMemo(() => {
    const parts = selectedDateStr.split('-');
    if (parts.length !== 3) return selectedDateStr;
    const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  }, [selectedDateStr]);

  // Helper for category badge styling
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'strength':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/60',
          text: 'text-[#0B5D45] dark:text-emerald-300',
          border: 'border-emerald-200 dark:border-emerald-800',
          dot: 'bg-[#0B5D45] dark:bg-emerald-400',
          label: 'Strength',
          icon: Dumbbell,
        };
      case 'hiit':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/60',
          text: 'text-rose-700 dark:text-rose-300',
          border: 'border-rose-200 dark:border-rose-800',
          dot: 'bg-rose-500',
          label: 'HIIT',
          icon: Zap,
        };
      case 'core':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/60',
          text: 'text-amber-700 dark:text-amber-300',
          border: 'border-amber-200 dark:border-amber-800',
          dot: 'bg-amber-500',
          label: 'Core',
          icon: Target,
        };
      case 'yoga':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/60',
          text: 'text-purple-700 dark:text-purple-300',
          border: 'border-purple-200 dark:border-purple-800',
          dot: 'bg-purple-500',
          label: 'Yoga & Flow',
          icon: Heart,
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          text: 'text-gray-700 dark:text-gray-300',
          border: 'border-gray-200 dark:border-gray-700',
          dot: 'bg-gray-500',
          label: 'Workout',
          icon: Dumbbell,
        };
    }
  };

  // Find matching full workout object to start workout
  const handleLaunchWorkout = (completed: CompletedWorkout) => {
    if (!onSelectWorkout) return;
    const allWorkouts = [TODAYS_WORKOUT, ...RECOMMENDED_WORKOUTS];
    const match = allWorkouts.find((w) => w.id === completed.workoutId) || TODAYS_WORKOUT;
    onSelectWorkout(match);
  };

  return (
    <div
      id="workout-calendar-component"
      className={`bg-white dark:bg-[#18201D] rounded-3xl p-5 sm:p-7 border border-gray-100 dark:border-[#24322B] shadow-sm space-y-6 transition-colors ${className}`}
    >
      {/* Component Header with Consistency Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B5D45]/10 dark:bg-emerald-950/70 border border-[#0B5D45]/15 dark:border-emerald-800/40 text-xs font-bold text-[#0B5D45] dark:text-emerald-300 mb-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Consistency Calendar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#343A40] dark:text-[#F3F7F5] tracking-tight">
            Workout History & Activity Log
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#9EAEA6]">
            Every completed session builds habit strength, metabolic rhythm, and lifelong power.
          </p>
        </div>

        {/* View Mode & Jump to Today */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            id="jump-today-btn"
            onClick={handleJumpToToday}
            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-[#24322B] bg-white dark:bg-[#131A17] text-xs font-semibold text-gray-600 dark:text-[#9EAEA6] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs"
          >
            Today
          </button>

          <div className="p-1 bg-[#F4F6F5] dark:bg-[#131A17] rounded-xl border border-gray-200/80 dark:border-[#24322B] flex items-center gap-1">
            <button
              id="view-mode-calendar"
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                  : 'text-gray-500 dark:text-[#72837B]'
              }`}
            >
              Calendar
            </button>
            <button
              id="view-mode-list"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#1F2B25] text-[#0B5D45] dark:text-emerald-300 shadow-xs'
                  : 'text-gray-500 dark:text-[#72837B]'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Consistency Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-gradient-to-br from-[#F4F6F5] to-gray-100 dark:from-[#131A17] dark:to-[#17231E] border border-gray-200/60 dark:border-[#24322B]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#9EAEA6]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5D45] dark:text-emerald-400" />
            <span>Completed Sessions</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#343A40] dark:text-[#F3F7F5]">
            {monthlyStats.totalCount}{' '}
            <span className="text-xs font-normal text-gray-400 dark:text-[#72837B]">workouts</span>
          </p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">
            +4 vs last month
          </span>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#9EAEA6]">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Consistency Rate</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#0B5D45] dark:text-emerald-400">
            {monthlyStats.consistencyRate}%
          </p>
          <span className="text-[10px] text-gray-400 dark:text-[#72837B] block">
            Target: 80%+ achieved
          </span>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#9EAEA6]">
            <Clock className="w-3.5 h-3.5 text-[#0B5D45] dark:text-emerald-400" />
            <span>Training Time</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#343A40] dark:text-[#F3F7F5]">
            {monthlyStats.totalMinutes}{' '}
            <span className="text-xs font-normal text-gray-400 dark:text-[#72837B]">min</span>
          </p>
          <span className="text-[10px] text-gray-400 dark:text-[#72837B] block">
            ~29 min average/session
          </span>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#9EAEA6]">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Energy Expended</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#343A40] dark:text-[#F3F7F5]">
            {monthlyStats.totalCalories.toLocaleString()}{' '}
            <span className="text-xs font-normal text-gray-400 dark:text-[#72837B]">kcal</span>
          </p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">
            Peak consistency mode
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <span className="text-gray-400 dark:text-[#72837B] font-medium pr-1 shrink-0">Filter:</span>
        {[
          { id: 'all', label: 'All Sessions' },
          { id: 'strength', label: 'Strength' },
          { id: 'hiit', label: 'HIIT' },
          { id: 'core', label: 'Abs & Core' },
          { id: 'yoga', label: 'Yoga' },
        ].map((cat) => (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold transition-all cursor-pointer ${
              categoryFilter === cat.id
                ? 'bg-[#0B5D45] text-white shadow-xs'
                : 'bg-[#F4F6F5] dark:bg-[#131A17] text-gray-600 dark:text-[#9EAEA6] border border-gray-200/60 dark:border-[#24322B] hover:border-emerald-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {viewMode === 'calendar' ? (
        /* Month Calendar View */
        <div className="space-y-3">
          {/* Calendar Month Selector & Controls */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#343A40] dark:text-[#F3F7F5]">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-[#0B5D45] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {currentMonthWorkouts.length} Workouts
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                id="prev-month-btn"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="p-2 rounded-xl border border-gray-200 dark:border-[#24322B] text-gray-500 dark:text-[#9EAEA6] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:bg-gray-50 dark:hover:bg-[#1F2B25] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="next-month-btn"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="p-2 rounded-xl border border-gray-200 dark:border-[#24322B] text-gray-500 dark:text-[#9EAEA6] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:bg-gray-50 dark:hover:bg-[#1F2B25] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-semibold text-gray-400 dark:text-[#72837B] pb-1 border-b border-gray-100 dark:border-[#24322B]">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((day) => {
              const isSelected = day.dateStr === selectedDateStr;
              const hasWorkouts = day.workouts.length > 0;
              const primaryWorkout = day.workouts[0];
              const theme = primaryWorkout ? getCategoryTheme(primaryWorkout.category) : null;

              // Filter check: If a filter is active, highlight only if it matches
              const matchesFilter =
                categoryFilter === 'all' ||
                day.workouts.some((w) => w.category === categoryFilter);

              return (
                <button
                  key={day.dateStr}
                  id={`calendar-cell-${day.dateStr}`}
                  onClick={() => setSelectedDateStr(day.dateStr)}
                  className={`min-h-[72px] sm:min-h-[88px] p-1.5 sm:p-2 rounded-2xl flex flex-col justify-between text-left transition-all duration-200 relative group cursor-pointer border ${
                    isSelected
                      ? 'border-[#0B5D45] dark:border-emerald-400 ring-2 ring-[#0B5D45]/20 dark:ring-emerald-400/20 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                      : day.isToday
                      ? 'border-[#0B5D45]/40 dark:border-emerald-600/40 bg-white dark:bg-[#18201D]'
                      : day.isCurrentMonth
                      ? 'border-gray-100 dark:border-[#24322B] bg-white dark:bg-[#18201D] hover:border-gray-300 dark:hover:border-gray-700'
                      : 'border-transparent bg-gray-50/50 dark:bg-[#121815]/40 opacity-40 hover:opacity-75'
                  }`}
                >
                  {/* Top Day Header */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-bold leading-none ${
                        day.isToday
                          ? 'w-5 h-5 rounded-full bg-[#0B5D45] text-white flex items-center justify-center'
                          : isSelected
                          ? 'text-[#0B5D45] dark:text-emerald-300'
                          : day.isCurrentMonth
                          ? 'text-[#343A40] dark:text-[#F3F7F5]'
                          : 'text-gray-400 dark:text-[#72837B]'
                      }`}
                    >
                      {day.dayNumber}
                    </span>

                    {/* Today indicator dot if not active */}
                    {day.isToday && (
                      <span className="hidden sm:inline-block text-[9px] font-bold text-[#0B5D45] dark:text-emerald-400 uppercase tracking-tighter">
                        Today
                      </span>
                    )}

                    {/* Streak flame badge for active consistency */}
                    {hasWorkouts && matchesFilter && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    )}
                  </div>

                  {/* Workout Info Badges in Day Cell */}
                  {hasWorkouts && matchesFilter ? (
                    <div className="space-y-1 w-full mt-1">
                      {day.workouts.slice(0, 1).map((w) => {
                        const wTheme = getCategoryTheme(w.category);
                        const Icon = wTheme.icon;

                        return (
                          <div
                            key={w.id}
                            className={`p-1 sm:p-1.5 rounded-xl ${wTheme.bg} ${wTheme.text} border ${wTheme.border} transition-transform group-hover:scale-[1.02]`}
                          >
                            <div className="flex items-center gap-1">
                              <Icon className="w-3 h-3 shrink-0" />
                              <span className="text-[10px] font-bold truncate leading-tight hidden sm:inline">
                                {w.name}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[9px] opacity-80 mt-0.5">
                              <span>{w.durationMinutes}m</span>
                              <span className="hidden sm:inline font-mono">{w.calories}cal</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Rest / Open day representation */
                    <div className="h-4 flex items-end">
                      {day.isCurrentMonth && !day.isToday && (
                        <span className="text-[9px] text-gray-300 dark:text-[#31423B] font-medium">
                          —
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Timeline / List View */
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {currentMonthWorkouts
            .filter((w) => categoryFilter === 'all' || w.category === categoryFilter)
            .map((workout) => {
              const theme = getCategoryTheme(workout.category);
              const Icon = theme.icon;

              return (
                <div
                  key={workout.id}
                  onClick={() => setSelectedDateStr(workout.date)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedDateStr === workout.date
                      ? 'border-[#0B5D45] dark:border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-gray-100 dark:border-[#24322B] bg-white dark:bg-[#18201D] hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#343A40] dark:text-[#F3F7F5]">
                          {workout.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${theme.bg} ${theme.text}`}>
                          {theme.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-[#9EAEA6]">
                        {workout.date} • {workout.timeOfDay} • {workout.feeling}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#0B5D45] dark:text-emerald-400 block">
                        {workout.durationMinutes} min
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-[#72837B]">
                        {workout.calories} kcal
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchWorkout(workout);
                      }}
                      className="w-8 h-8 rounded-full bg-[#0B5D45]/10 dark:bg-emerald-950 text-[#0B5D45] dark:text-emerald-300 hover:bg-[#0B5D45] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Replay Session"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Selected Day Workout Details Drawer Card */}
      <div className="pt-4 border-t border-gray-100 dark:border-[#24322B]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm sm:text-base text-[#343A40] dark:text-[#F3F7F5]">
              {formattedSelectedDate}
            </h3>
            {selectedDateStr === todayDateStr && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0B5D45] dark:text-emerald-300 text-[10px] font-bold">
                Today
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-gray-400 dark:text-[#72837B]">
            {selectedDayWorkouts.length} Session{selectedDayWorkouts.length === 1 ? '' : 's'}
          </span>
        </div>

        {selectedDayWorkouts.length > 0 ? (
          <div className="space-y-3">
            {selectedDayWorkouts.map((session) => {
              const theme = getCategoryTheme(session.category);
              const Icon = theme.icon;

              return (
                <div
                  key={session.id}
                  className="p-4 rounded-2xl bg-[#F4F6F5] dark:bg-[#131A17] border border-gray-200/80 dark:border-[#24322B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-2xl ${theme.bg} ${theme.text} flex items-center justify-center shrink-0 shadow-2xs`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-base text-[#343A40] dark:text-[#F3F7F5]">
                          {session.name}
                        </h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${theme.bg} ${theme.text} border ${theme.border}`}>
                          {theme.label}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white dark:bg-[#1F2B25] border border-gray-200 dark:border-[#24322B] text-[10px] font-medium text-gray-600 dark:text-[#9EAEA6]">
                          Feeling: {session.feeling}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-[#9EAEA6]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#0B5D45] dark:text-emerald-400" />
                          {session.durationMinutes} min
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          {session.calories} kcal
                        </span>
                        <span>•</span>
                        <span>{session.exercisesCompleted} exercises logged</span>
                        <span>•</span>
                        <span>{session.timeOfDay}</span>
                      </div>

                      {session.notes && (
                        <p className="text-xs text-gray-600 dark:text-[#9EAEA6] italic mt-1 bg-white/70 dark:bg-[#1F2B25]/70 p-2 rounded-xl border border-gray-100 dark:border-[#24322B]">
                          “{session.notes}”
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Replay or View Workout Action */}
                  <button
                    id={`replay-workout-${session.id}`}
                    onClick={() => handleLaunchWorkout(session)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B5D45] hover:bg-[#084A37] text-white font-semibold text-xs transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Train Again</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty or Rest Day state */
          <div className="p-6 rounded-2xl bg-[#F4F6F5]/60 dark:bg-[#131A17]/60 border border-dashed border-gray-200 dark:border-[#24322B] text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100/60 dark:bg-emerald-950/60 text-[#0B5D45] dark:text-emerald-300 flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#343A40] dark:text-[#F3F7F5]">
                {selectedDateStr === todayDateStr
                  ? "Today's Workout Awaiting Completion"
                  : 'Rest & Recovery Day'}
              </h4>
              <p className="text-xs text-gray-500 dark:text-[#9EAEA6] max-w-sm mx-auto leading-relaxed">
                {selectedDateStr === todayDateStr
                  ? 'Your scheduled session for today is "Full Body Strength" (35 mins). Ready to keep your 14-day streak alive?'
                  : 'Rest allows muscular fibers to repair, glycogen stores to reload, and energy to peak. Light stretching and hydration recommended.'}
              </p>
            </div>

            {selectedDateStr === todayDateStr && (
              <button
                id="start-today-session-btn"
                onClick={() => onSelectWorkout && onSelectWorkout(TODAYS_WORKOUT)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B5D45] hover:bg-[#084A37] text-white font-semibold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Today&apos;s Workout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
