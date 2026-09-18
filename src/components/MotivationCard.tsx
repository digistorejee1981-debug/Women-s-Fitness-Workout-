import React, { useState } from 'react';
import { Heart, Sparkles, Check, Flame } from 'lucide-react';
import { MOTIVATION_DATA } from '../data/mockFitnessData';

export const MotivationCard: React.FC = () => {
  const [cheered, setCheered] = useState(false);
  const [affirmationCount, setAffirmationCount] = useState(1);

  const affirmations = [
    '“Small steps every day create big results.”',
    '“Strength does not come from what you can do. It comes from overcoming what you once couldn’t.”',
    '“Consistency over intensity. You’re building lifelong energy.”',
    '“Honor your body today with movement that feels powerful.”',
  ];

  const handleKeepGoing = () => {
    setCheered(true);
    setAffirmationCount((prev) => (prev + 1) % affirmations.length);
    setTimeout(() => setCheered(false), 2000);
  };

  const currentQuote = affirmations[affirmationCount];

  return (
    <div
      id="motivation-card"
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0B5D45] via-[#084A37] to-[#063C2E] p-6 sm:p-7 text-white shadow-xl shadow-[#0B5D45]/15 border border-emerald-800/40 group"
    >
      {/* Background illustration overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 mix-blend-luminosity pointer-events-none overflow-hidden hidden sm:block">
        <img
          src={MOTIVATION_DATA.imageUrl}
          alt="Fitness inspiration"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-110 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B5D45] via-transparent to-transparent"></div>
      </div>

      {/* Subtle glowing orbs */}
      <div className="pointer-events-none absolute -left-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-2xl"></div>

      <div className="relative z-10 max-w-lg space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-emerald-200 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Daily Boost</span>
        </div>

        <blockquote className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
          {currentQuote}
        </blockquote>

        <p className="text-xs sm:text-sm text-emerald-100/80 font-normal">
          Every rep, every stretch, and every healthy choice compounds into the strongest, most radiant version of you.
        </p>

        <div className="pt-1 flex items-center gap-3">
          <button
            id="keep-going-btn"
            onClick={handleKeepGoing}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 active:scale-95 cursor-pointer ${
              cheered
                ? 'bg-emerald-300 text-[#063C2E]'
                : 'bg-white text-[#0B5D45] hover:bg-emerald-50'
            }`}
          >
            {cheered ? (
              <>
                <Check className="w-4 h-4" />
                <span>Affirmation Logged! 🔥</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Keep Going</span>
              </>
            )}
          </button>

          <span className="text-xs text-emerald-200/70 font-medium">
            Tap for your next spark ✨
          </span>
        </div>
      </div>
    </div>
  );
};
