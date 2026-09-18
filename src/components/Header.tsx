import React from 'react';
import { Bell, Settings, Moon, Sun } from 'lucide-react';
import { USER_PROFILE } from '../data/mockFitnessData';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenSettings,
  onOpenProfile,
  unreadCount = 1,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-[#F4F6F5]/90 dark:bg-[#0F1412]/90 backdrop-blur-md px-4 sm:px-6 pt-3 pb-3 border-b border-gray-200/60 dark:border-[#24322B] transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Profile Avatar & Greeting */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <button
            id="profile-avatar-btn"
            onClick={onOpenProfile}
            className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B5D45]/30 rounded-full transition-transform active:scale-95"
            title="View Sarah's Profile"
          >
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full p-0.5 bg-gradient-to-tr from-[#0B5D45] via-[#10B981] to-[#063C2E] shadow-sm">
              <img
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full bg-white dark:bg-[#18201D]"
              />
            </div>
            {/* Active status pulse */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#0F1412] rounded-full shadow-xs"></span>
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-bold text-[#343A40] dark:text-[#F3F7F5] tracking-tight flex items-center gap-1.5">
                Good Morning, {USER_PROFILE.name} <span className="inline-block animate-bounce origin-bottom text-base sm:text-lg">👋</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-[#9EAEA6]">
              Ready for today&apos;s workout?
            </p>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Switcher Button */}
          <button
            id="header-theme-toggle-btn"
            onClick={toggleTheme}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#18201D] border border-gray-200/80 dark:border-[#24322B] shadow-xs flex items-center justify-center text-[#343A40] dark:text-[#F3F7F5] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-[#1F2B25] active:scale-95 transition-all cursor-pointer group"
            title={isDark ? 'Switch to Soft Gray Theme' : 'Switch to Dark Mode'}
            aria-label={`Toggle Theme. Currently ${isDark ? 'Dark Mode' : 'Soft Gray'}`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Notification Button */}
          <button
            id="header-notification-btn"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#18201D] border border-gray-200/80 dark:border-[#24322B] shadow-xs flex items-center justify-center text-[#343A40] dark:text-[#F3F7F5] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-[#1F2B25] active:scale-95 transition-all cursor-pointer group"
            title="Notifications"
          >
            <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0B5D45] dark:bg-emerald-400"></span>
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            id="header-settings-btn"
            onClick={onOpenSettings}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#18201D] border border-gray-200/80 dark:border-[#24322B] shadow-xs flex items-center justify-center text-[#343A40] dark:text-[#F3F7F5] hover:text-[#0B5D45] dark:hover:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-[#1F2B25] active:scale-95 transition-all cursor-pointer"
            title="App Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

