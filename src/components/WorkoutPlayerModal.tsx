import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, RotateCcw, CheckCircle, Volume2, VolumeX, Flame, Clock, Award, Sparkles } from 'lucide-react';
import { Workout, Exercise } from '../types';

interface WorkoutPlayerModalProps {
  workout: Workout;
  onClose: () => void;
  onComplete: () => void;
}

export const WorkoutPlayerModal: React.FC<WorkoutPlayerModalProps> = ({
  workout,
  onClose,
  onComplete,
}) => {
  const exercises = workout.exercises || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const currentExercise: Exercise | undefined = exercises[currentIndex];
  const totalExercises = exercises.length;

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isRunning) {
      // Timer finished
      if (isResting) {
        // Finished rest, resume exercise
        setIsResting(false);
        setTimerSeconds(45);
      } else {
        // Finished exercise set
        handleNextSet();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds, isResting]);

  const handleNextSet = () => {
    if (!currentExercise) return;
    if (currentSet < currentExercise.sets) {
      setCurrentSet((prev) => prev + 1);
      setIsResting(true);
      setTimerSeconds(currentExercise.restSeconds || 30);
    } else {
      // Next exercise
      if (currentIndex < totalExercises - 1) {
        setCurrentIndex((prev) => prev + 1);
        setCurrentSet(1);
        setIsResting(false);
        setTimerSeconds(45);
      } else {
        // Workout finished!
        setIsFinished(true);
        setIsRunning(false);
      }
    }
  };

  const handleSkipExercise = () => {
    if (currentIndex < totalExercises - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
      setTimerSeconds(45);
    } else {
      setIsFinished(true);
      setIsRunning(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round(((currentIndex + (currentSet / (currentExercise?.sets || 1))) / (totalExercises || 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div
        id="workout-player-container"
        className="relative w-full max-w-lg bg-white dark:bg-[#18201D] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-[#24322B] flex flex-col max-h-[92vh] transition-colors"
      >
        {/* Header Bar */}
        <div className="px-5 py-4 bg-[#063C2E] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              {isResting ? 'Rest Period' : 'Live Workout Session'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-full hover:bg-white/10 text-emerald-200 transition-colors cursor-pointer"
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              id="close-workout-player-btn"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-emerald-200 transition-colors cursor-pointer"
              title="Close Workout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#084A37] h-1.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-[#10B981] transition-all duration-300"
            style={{ width: `${isFinished ? 100 : Math.min(100, progressPercent)}%` }}
          ></div>
        </div>

        {!isFinished ? (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Workout Info Header */}
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-[#72837B] mb-1">
                <span>{workout.name}</span>
                <span className="font-bold text-[#0B5D45] dark:text-emerald-400">
                  Exercise {currentIndex + 1} of {totalExercises}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#343A40] dark:text-[#F3F7F5] tracking-tight">
                {currentExercise?.name || 'Workout in Progress'}
              </h2>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                Target: {currentExercise?.targetMuscle}
              </p>
            </div>

            {/* Main Timer & Set Display */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F4F6F5] to-gray-100 dark:from-[#131A17] dark:to-[#17221D] border border-gray-200/70 dark:border-[#24322B] flex flex-col items-center justify-center text-center relative overflow-hidden">
              <span className="text-xs font-semibold text-gray-500 dark:text-[#9EAEA6] uppercase tracking-widest mb-1">
                {isResting ? 'Catch Your Breath' : `Set ${currentSet} of ${currentExercise?.sets || 3}`}
              </span>

              <div className="text-5xl sm:text-6xl font-extrabold text-[#0B5D45] dark:text-emerald-400 tracking-tight font-mono py-2">
                {formatTime(timerSeconds)}
              </div>

              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white dark:bg-[#1F2B25] border border-gray-200 dark:border-[#24322B] text-xs font-semibold text-[#343A40] dark:text-[#F3F7F5] shadow-xs">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Reps: {currentExercise?.reps}</span>
              </div>

              {currentExercise?.tips && (
                <p className="text-xs text-gray-500 dark:text-[#9EAEA6] mt-4 max-w-xs italic">
                  💡 Pro Tip: {currentExercise.tips}
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                id="reset-timer-btn"
                onClick={() => setTimerSeconds(45)}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-[#24322B] text-gray-600 dark:text-[#9EAEA6] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:border-emerald-300 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                id="play-pause-timer-btn"
                onClick={() => setIsRunning(!isRunning)}
                className="w-16 h-16 rounded-full bg-[#0B5D45] hover:bg-[#084A37] text-white flex items-center justify-center shadow-lg shadow-[#0B5D45]/25 transition-all transform active:scale-90 cursor-pointer"
                title={isRunning ? 'Pause' : 'Play'}
              >
                {isRunning ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white ml-0.5" />
                )}
              </button>

              <button
                id="skip-exercise-btn"
                onClick={handleSkipExercise}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-[#24322B] text-gray-600 dark:text-[#9EAEA6] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:border-emerald-300 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs"
                title="Next Exercise"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Exercise Overview list preview */}
            <div className="pt-2 border-t border-gray-100 dark:border-[#24322B]">
              <p className="text-xs font-semibold text-gray-400 dark:text-[#72837B] mb-2 uppercase tracking-wide">
                Routine Exercises ({exercises.length})
              </p>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {exercises.map((ex, idx) => (
                  <div
                    key={ex.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setCurrentSet(1);
                      setIsResting(false);
                      setTimerSeconds(45);
                    }}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                      idx === currentIndex
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#0B5D45] dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800'
                        : idx < currentIndex
                        ? 'text-gray-400 dark:text-[#72837B] line-through bg-gray-50 dark:bg-[#131A17]'
                        : 'text-gray-600 dark:text-[#9EAEA6] hover:bg-gray-100 dark:hover:bg-[#1F2B25]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 text-center font-mono">{idx + 1}.</span>
                      <span>{ex.name}</span>
                    </div>
                    <span className="text-[11px] opacity-75">{ex.sets} sets • {ex.reps}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Workout Celebration Screen */
          <div className="p-8 text-center space-y-5 flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#0B5D45] dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#0B5D45] dark:text-emerald-300 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Workout Complete! 🎉
              </span>
              <h3 className="text-2xl font-extrabold text-[#343A40] dark:text-[#F3F7F5] mt-3">
                Magnificent Effort, Sarah!
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-[#9EAEA6] max-w-xs mx-auto mt-1">
                You just finished <span className="font-semibold text-[#0B5D45] dark:text-emerald-400">{workout.name}</span> and burned an estimated{' '}
                <span className="font-semibold text-amber-600 dark:text-amber-400">{workout.calories} kcal</span>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full py-2">
              <div className="p-3 bg-[#F4F6F5] dark:bg-[#131A17] rounded-xl text-center">
                <Clock className="w-4 h-4 text-[#0B5D45] dark:text-emerald-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-[#343A40] dark:text-[#F3F7F5]">{workout.durationMinutes}m</p>
                <p className="text-[10px] text-gray-400 dark:text-[#72837B]">Total Time</p>
              </div>

              <div className="p-3 bg-[#F4F6F5] dark:bg-[#131A17] rounded-xl text-center">
                <Flame className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-sm font-bold text-[#343A40] dark:text-[#F3F7F5]">{workout.calories}</p>
                <p className="text-[10px] text-gray-400 dark:text-[#72837B]">Calories</p>
              </div>

              <div className="p-3 bg-[#F4F6F5] dark:bg-[#131A17] rounded-xl text-center">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-[#0B5D45] dark:text-emerald-400">+150 XP</p>
                <p className="text-[10px] text-gray-400 dark:text-[#72837B]">Streak Bonus</p>
              </div>
            </div>

            <button
              id="finish-workout-btn"
              onClick={() => {
                onComplete();
                onClose();
              }}
              className="w-full py-3.5 rounded-xl bg-[#0B5D45] hover:bg-[#084A37] text-white font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Save & Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
