import React, { useState } from 'react';
import { X, Check, Bell, Moon, Sun, Smartphone, Shield, Heart, Palette } from 'lucide-react';
import { USER_PROFILE } from '../data/mockFitnessData';
import { useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { theme, setTheme, isDark } = useTheme();
  const [dailyGoal, setDailyGoal] = useState(USER_PROFILE.weeklyGoalCount);
  const [reminders, setReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        id="settings-modal-card"
        className="w-full max-w-md bg-white dark:bg-[#18201D] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#24322B] overflow-hidden transition-colors"
      >
        <div className="p-5 bg-gradient-to-r from-[#0B5D45] to-[#063C2E] text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Preferences & Settings</h3>
            <p className="text-xs text-emerald-100/80">Customize your workout experience & theme</p>
          </div>
          <button
            id="close-settings-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Theme & Appearance Switcher */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5] uppercase tracking-wide flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#0B5D45] dark:text-emerald-400" />
                <span>App Theme</span>
              </label>
              <span className="text-[11px] font-semibold text-[#0B5D45] dark:text-emerald-400">
                {isDark ? 'Dark Mode Active' : 'Soft Gray Active'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Soft Gray Option */}
              <button
                type="button"
                id="theme-option-soft-gray"
                onClick={() => setTheme('light')}
                className={`relative p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  !isDark
                    ? 'border-[#0B5D45] bg-[#F4F6F5] shadow-xs'
                    : 'border-gray-200 dark:border-[#27342F] bg-white dark:bg-[#131A17] hover:border-emerald-600/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-2xs">
                    <Sun className="w-4 h-4 text-amber-500" />
                  </div>
                  {!isDark && (
                    <span className="w-4 h-4 rounded-full bg-[#0B5D45] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5]">Soft Gray</p>
                <p className="text-[10px] text-gray-500 dark:text-[#9EAEA6] mt-0.5">Calming & serene daytime contrast</p>
                
                {/* Palette Swatches */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#F4F6F5] border border-gray-300" title="#F4F6F5"></span>
                  <span className="w-3 h-3 rounded-full bg-white border border-gray-300" title="#FFFFFF"></span>
                  <span className="w-3 h-3 rounded-full bg-[#0B5D45]" title="#0B5D45"></span>
                </div>
              </button>

              {/* Dark Mode Option */}
              <button
                type="button"
                id="theme-option-dark-mode"
                onClick={() => setTheme('dark')}
                className={`relative p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  isDark
                    ? 'border-[#10B981] bg-[#1F2B25] shadow-xs'
                    : 'border-gray-200 dark:border-[#27342F] bg-white dark:bg-[#131A17] hover:border-emerald-600/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#0F1412] border border-[#27342F] flex items-center justify-center text-emerald-400 shadow-2xs">
                    <Moon className="w-4 h-4 text-emerald-300" />
                  </div>
                  {isDark && (
                    <span className="w-4 h-4 rounded-full bg-[#10B981] text-[#063C2E] flex items-center justify-center font-bold">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5]">Dark Mode</p>
                <p className="text-[10px] text-gray-500 dark:text-[#9EAEA6] mt-0.5">Deep obsidian gym focus & battery saver</p>
                
                {/* Palette Swatches */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#0F1412] border border-[#27342F]" title="#0F1412"></span>
                  <span className="w-3 h-3 rounded-full bg-[#18201D] border border-[#27342F]" title="#18201D"></span>
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" title="#10B981"></span>
                </div>
              </button>
            </div>
          </div>

          {/* Weekly Workouts Target */}
          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-[#24322B]">
            <label className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5] uppercase tracking-wide">
              Weekly Workout Goal: <span className="text-[#0B5D45] dark:text-emerald-400 font-extrabold">{dailyGoal} days</span>
            </label>
            <div className="flex gap-2">
              {[3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setDailyGoal(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dailyGoal === num
                      ? 'bg-[#0B5D45] text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-[#131A17] text-gray-600 dark:text-[#9EAEA6] hover:bg-gray-200 dark:hover:bg-[#1F2B25]'
                  }`}
                >
                  {num} Days
                </button>
              ))}
            </div>
          </div>

          {/* Units */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5] uppercase tracking-wide">
              Units of Measurement
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUnitSystem('metric')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'border-[#0B5D45] dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-[#0B5D45] dark:text-emerald-300'
                    : 'border-gray-200 dark:border-[#27342F] text-gray-600 dark:text-[#9EAEA6] hover:bg-gray-50 dark:hover:bg-[#131A17]'
                }`}
              >
                Metric (kg, cm)
              </button>
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  unitSystem === 'imperial'
                    ? 'border-[#0B5D45] dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-[#0B5D45] dark:text-emerald-300'
                    : 'border-gray-200 dark:border-[#27342F] text-gray-600 dark:text-[#9EAEA6] hover:bg-gray-50 dark:hover:bg-[#131A17]'
                }`}
              >
                Imperial (lbs, in)
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-[#24322B]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5]">Workout Reminders</p>
                <p className="text-[11px] text-gray-500 dark:text-[#9EAEA6]">Daily morning reminder at 7:30 AM</p>
              </div>
              <button
                onClick={() => setReminders(!reminders)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  reminders ? 'bg-[#0B5D45] dark:bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    reminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5]">Haptic & Sound Cues</p>
                <p className="text-[11px] text-gray-500 dark:text-[#9EAEA6]">Audio countdown during exercise intervals</p>
              </div>
              <button
                onClick={() => setSoundEffects(!soundEffects)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  soundEffects ? 'bg-[#0B5D45] dark:bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    soundEffects ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#F4F6F5] dark:bg-[#131A17] border-t border-gray-100 dark:border-[#24322B] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-[#9EAEA6] hover:bg-gray-200/60 dark:hover:bg-[#1F2B25] rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            id="save-settings-btn"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold bg-[#0B5D45] hover:bg-[#084A37] text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            {savedToast ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

