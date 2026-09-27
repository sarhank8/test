import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';

interface BogoBannerProps {
  onShopOffer: () => void;
}

export const BogoBanner: React.FC<BogoBannerProps> = ({ onShopOffer }) => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-pink-bogo rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-[#FFC0CB] relative overflow-hidden shadow-xs">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#9E4B5C] text-xs font-mono uppercase tracking-widest shadow-xs">
          <Tag className="w-3.5 h-3.5 text-[#FF8DA1]" />
          <span>Limited offer</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#3D282D]">
          Buy 1, Get 1 Free
        </h2>

        <p className="text-sm text-[#6B444C] max-w-lg mx-auto font-light">
          Pick any two styles from the offer edit — the second one is on us.
        </p>

        <div className="pt-2">
          <button
            onClick={onShopOffer}
            className="px-8 py-3.5 rounded-full bg-rose-accent text-[#3D282D] text-xs uppercase tracking-[0.2em] font-bold hover:brightness-105 transition shadow-sm inline-flex items-center gap-2 group"
          >
            <span>Shop the offer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
