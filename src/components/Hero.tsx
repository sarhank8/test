import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-pink-hero rounded-3xl p-8 sm:p-12 border border-[#FFD6DF] relative overflow-hidden shadow-sm">
        
        {/* Left Text */}
        <div className="lg:col-span-6 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#FFC0CB] text-[#9E4B5C] text-xs font-mono uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8DA1]" />
            <span>New Collection — 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-light text-[#3D282D] leading-tight">
            Quiet pieces, <br />
            made to stay.
          </h1>

          <p className="text-sm sm:text-base text-[#6B444C] font-light leading-relaxed max-w-lg">
            Delicate gold, freshwater pearls and sparkling stones — designed for every day and kept for a lifetime.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={onShopClick}
              className="px-8 py-4 rounded-full bg-rose-accent text-[#3D282D] text-xs uppercase tracking-[0.2em] font-bold hover:brightness-105 transition shadow-md flex items-center gap-3 group"
            >
              <span>Shop the collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="lg:col-span-6 z-10">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-white/80 group">
            <img
              src="/rose_hero.jpg"
              alt="Rosé Atelier Jewellery"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
