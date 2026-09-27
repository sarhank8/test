import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#EFE5E0] shadow-2xl p-6 overflow-hidden space-y-4">
        
        {/* Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-[#C88A80]" />
          <input
            type="text"
            placeholder="Search pearl necklaces, gold rings, bracelets, anklets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-full bg-[#FAF7F5] border border-[#EFE5E0] text-[#2A2421] text-sm focus:outline-none focus:border-[#C88A80] font-serif"
            autoFocus
          />
          <button onClick={onClose} className="absolute right-4 text-gray-400 hover:text-black p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="space-y-2 max-h-96 overflow-y-auto pt-2">
          <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">
            {query.trim() ? `Search Results (${results.length})` : 'Popular Pieces:'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="p-3 rounded-xl border border-[#EFE5E0] bg-[#FAF7F5] hover:border-[#C88A80] transition text-left flex gap-3 items-center group"
              >
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                <div className="truncate">
                  <span className="text-xs font-serif font-medium text-[#2A2421] group-hover:text-[#C88A80] transition block truncate">
                    {p.name}
                  </span>
                  <span className="text-[10px] text-[#8C655E] font-mono block">
                    Rs. {p.price.toLocaleString()}.00
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
