import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';

interface LookbookEditorialProps {
  onQuickView: (product: Product) => void;
}

export const LookbookEditorial: React.FC<LookbookEditorialProps> = ({ onQuickView }) => {
  const [activeHotspot, setActiveHotspot] = useState<Product | null>(null);

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs uppercase tracking-widest font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Couture Lookbook</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-wide">
          Red Carpet Stories &amp; Hotspots
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto font-light">
          Click interactive glowing gold hotspots on our editorial high jewelry portraits to reveal and inspect featured pieces.
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/40 shadow-2xl min-h-[500px] flex items-center justify-center">
        {/* Editorial Photo */}
        <img
          src="/hero2.jpg"
          alt="Haute Joaillerie Editorial"
          className="w-full h-full object-cover object-center brightness-90 contrast-105 min-h-[500px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/60" />

        {/* Hotspot 1: Emerald Necklace */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => setActiveHotspot(PRODUCTS[1])}
            className="relative group p-3"
            title="Inspect Emerald Necklace"
          >
            <span className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-60 animate-ping" />
            <span className="relative w-6 h-6 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center shadow-2xl">
              <Sparkles className="w-3 h-3 text-black" />
            </span>
          </button>
        </div>

        {/* Hotspot 2: Diamond Earrings */}
        <div className="absolute top-1/4 right-1/3 z-20">
          <button
            onClick={() => setActiveHotspot(PRODUCTS[5])}
            className="relative group p-3"
            title="Inspect Constellation Earrings"
          >
            <span className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-60 animate-ping" />
            <span className="relative w-6 h-6 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center shadow-2xl">
              <Sparkles className="w-3 h-3 text-black" />
            </span>
          </button>
        </div>

        {/* Hotspot 3: Solitaire Ring */}
        <div className="absolute bottom-1/3 left-1/3 z-20">
          <button
            onClick={() => setActiveHotspot(PRODUCTS[0])}
            className="relative group p-3"
            title="Inspect Solitaire Ring"
          >
            <span className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-60 animate-ping" />
            <span className="relative w-6 h-6 rounded-full bg-[#D4AF37] border-2 border-white flex items-center justify-center shadow-2xl">
              <Sparkles className="w-3 h-3 text-black" />
            </span>
          </button>
        </div>

        {/* Active Hotspot Card Popup */}
        {activeHotspot && (
          <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-8 sm:w-96 glass-card p-5 rounded-2xl border border-[#D4AF37] z-30 shadow-2xl animate-fade-in flex gap-4 items-center">
            <img src={activeHotspot.image} alt={activeHotspot.name} className="w-20 h-20 object-cover rounded-xl border border-white/20" />
            <div className="flex-1">
              <span className="text-[10px] text-[#D4AF37] font-mono uppercase block">{activeHotspot.category}</span>
              <h4 className="text-sm font-serif font-bold text-white line-clamp-1">{activeHotspot.name}</h4>
              <span className="text-xs text-gold-gradient font-serif font-bold block mt-0.5">
                ${activeHotspot.price.toLocaleString()}
              </span>
              <button
                onClick={() => {
                  onQuickView(activeHotspot);
                  setActiveHotspot(null);
                }}
                className="mt-2 text-xs text-white hover:text-[#D4AF37] font-mono flex items-center gap-1 underline"
              >
                <span>View Full Specifications</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
