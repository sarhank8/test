import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../types';

interface EditorialCardsProps {
  onSelectCategory: (cat: Category) => void;
}

export const EditorialCards: React.FC<EditorialCardsProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: The Pearl Edit */}
        <div
          onClick={() => onSelectCategory('Earrings')}
          className="group cursor-pointer relative aspect-[16/9] rounded-3xl overflow-hidden shadow-sm border border-[#EFE5E0] flex items-end p-8"
        >
          <img
            src="/rose_pearl.jpg"
            alt="The Pearl Edit"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/80 via-transparent to-transparent" />
          <div className="relative z-10 text-white space-y-1">
            <h3 className="text-2xl font-serif font-light">The Pearl Edit</h3>
            <span className="text-xs uppercase tracking-widest font-mono text-[#E8C3B9] flex items-center gap-1 group-hover:underline">
              <span>Discover</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Card 2: Everyday Gold */}
        <div
          onClick={() => onSelectCategory('Bracelets')}
          className="group cursor-pointer relative aspect-[16/9] rounded-3xl overflow-hidden shadow-sm border border-[#EFE5E0] flex items-end p-8"
        >
          <img
            src="https://images.unsplash.com/photo-1611591475281-b1c9c0b11565?auto=format&fit=crop&q=80&w=1000"
            alt="Everyday Gold"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2421]/80 via-transparent to-transparent" />
          <div className="relative z-10 text-white space-y-1">
            <h3 className="text-2xl font-serif font-light">Everyday Gold</h3>
            <span className="text-xs uppercase tracking-widest font-mono text-[#E8C3B9] flex items-center gap-1 group-hover:underline">
              <span>Discover</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
