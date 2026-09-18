export interface Workout {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'hiit' | 'yoga' | 'core';
  durationMinutes: number;
  calories: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  exerciseCount: number;
  imageUrl: string;
  description: string;
  focusAreas: string[];
  exercises?: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  targetMuscle: string;
  tips?: string;
}

export interface DailyActivityStat {
  id: string;
  label: string;
  value: string;
  unit: string;
  target: string;
  percent: number;
  icon: 'flame' | 'clock' | 'footprints' | 'dumbbell';
  change: string;
  color: string;
}

export interface DayActivity {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dayName: string;
  minutes: number;
  calories: number;
  completed: boolean;
  isToday?: boolean;
}

export interface ProgressMetric {
  date: string;
  weightKg: number;
  waistCm: number;
  hipsCm: number;
  squatKg: number;
  hipThrustKg: number;
}

export type NavTab = 'home' | 'workouts' | 'progress' | 'plans' | 'profile';
