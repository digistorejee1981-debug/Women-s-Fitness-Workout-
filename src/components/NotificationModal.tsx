import React from 'react';
import { X, Bell, Check, Clock, Sparkles } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockFitnessData';

interface NotificationModalProps {
  onClose: () => void;
  onClearAll: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ onClose, onClearAll }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        id="notification-modal-card"
        className="w-full max-w-md bg-white dark:bg-[#18201D] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#24322B] overflow-hidden"
      >
        <div className="p-4 bg-[#F4F6F5] dark:bg-[#131A17] border-b border-gray-200/80 dark:border-[#24322B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0B5D45] dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-[#343A40] dark:text-[#F3F7F5]">Notifications</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-[11px] font-semibold text-[#0B5D45] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Mark all read
            </button>
            <button
              id="close-notifications-btn"
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 dark:text-[#9EAEA6] hover:text-gray-600 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-[#24322B] max-h-96 overflow-y-auto">
          {NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 transition-colors ${
                notif.unread
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/25'
                  : 'bg-white dark:bg-[#18201D] hover:bg-gray-50 dark:hover:bg-[#1F2B25]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-[#343A40] dark:text-[#F3F7F5] flex items-center gap-1.5">
                  {notif.title}
                </p>
                <span className="text-[10px] text-gray-400 dark:text-[#72837B] shrink-0">{notif.time}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-[#9EAEA6] mt-1 leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#F4F6F5] dark:bg-[#131A17] text-center border-t border-gray-100 dark:border-[#24322B]">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#0B5D45] dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
