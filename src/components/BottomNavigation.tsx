import React from 'react';
import { Home, Dumbbell, LineChart, CalendarRange, User } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavigationProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onChangeTab,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: LineChart },
    { id: 'plans', label: 'Plans', icon: CalendarRange },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-6 pb-3 pt-2 bg-gradient-to-t from-[#F4F6F5] dark:from-[#0F1412] via-[#F4F6F5]/90 dark:via-[#0F1412]/90 to-transparent pointer-events-none transition-colors"
    >
      <div className="max-w-md sm:max-w-lg mx-auto bg-white/95 dark:bg-[#18201D]/95 backdrop-blur-xl border border-gray-200/80 dark:border-[#24322B] rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-400/15 dark:shadow-black/40 p-1.5 flex items-center justify-around pointer-events-auto transition-colors">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onChangeTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 sm:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer group focus:outline-none ${
                isActive ? 'text-[#0B5D45] dark:text-emerald-400' : 'text-gray-400 dark:text-[#72837B] hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              {/* Active animated background pill */}
              {isActive && (
                <span className="absolute inset-0 bg-[#0B5D45]/10 dark:bg-emerald-500/15 rounded-xl sm:rounded-2xl transition-all duration-300"></span>
              )}

              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#0B5D45] dark:text-emerald-400 stroke-[2.4]' : 'group-hover:scale-105 stroke-[1.8]'
                  }`}
                />
                <span
                  className={`text-[10px] mt-1 tracking-tight transition-all duration-200 ${
                    isActive
                      ? 'font-bold text-[#0B5D45] dark:text-emerald-400 opacity-100'
                      : 'font-medium text-gray-500 dark:text-[#9EAEA6] opacity-80 group-hover:opacity-100'
                  }`}
                >
                  {item.label}
                </span>

                {/* Subtle active indicator dot */}
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#0B5D45] dark:bg-emerald-400 mt-0.5"></span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
