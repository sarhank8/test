import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
          
          <div className="flex justify-between items-center pb-4 border-b border-[#EFE5E0]">
            <div className="flex items-center gap-2 text-[#2A2421] font-serif text-xl">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <span>Saved Wishlist</span>
              <span className="text-xs font-mono text-gray-500 font-sans">({wishlistIds.length})</span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Heart className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="text-gray-400 text-sm font-serif">No saved items in your wishlist yet.</p>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EFE5E0] flex gap-3 items-center justify-between">
                  <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-lg border border-gray-200" />
                  <div className="flex-1">
                    <h4 className="text-xs font-serif font-medium text-[#2A2421] line-clamp-1">{p.name}</h4>
                    <span className="text-xs font-mono font-bold text-[#2A2421] block mt-0.5">
                      Rs. {p.price.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onAddToCart(p)}
                      className="p-2 rounded-full bg-[#2A2421] text-white hover:bg-[#403632] transition"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(p.id)}
                      className="p-2 text-gray-400 hover:text-rose-500 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
