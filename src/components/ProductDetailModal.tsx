import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Truck, RefreshCw, Tag, MessageCircle, Video, Zap } from 'lucide-react';
import type { Product } from '../types';
import { getWhatsAppProductLink, DISPLAY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  // Build unified media items (Images & Videos)
  const allMedia: { type: 'image' | 'video'; url: string }[] = [];
  if (product.image) allMedia.push({ type: 'image', url: product.image });
  if (product.secondaryImage) allMedia.push({ type: 'image', url: product.secondaryImage });
  if (product.galleryImages) {
    product.galleryImages.forEach((img) => {
      if (!allMedia.some((m) => m.url === img)) {
        allMedia.push({ type: 'image', url: img });
      }
    });
  }
  if (product.videos) {
    product.videos.forEach((vid) => {
      if (!allMedia.some((m) => m.url === vid)) {
        allMedia.push({ type: 'video', url: vid });
      }
    });
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video'; url: string }>(
    allMedia[0] || { type: 'image', url: product.image }
  );

  const whatsappUrl = getWhatsAppProductLink(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#EFE5E0] shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F5] text-[#2A2421] hover:bg-[#EFE5E0] transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Media Gallery Viewer */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF7F5] border border-[#F0E6E2] relative flex items-center justify-center">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              )}

              {product.isFewInStock && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-mono font-bold shadow-md flex items-center gap-1 z-10 animate-pulse">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Order Fast, Few in Stock!</span>
                </span>
              )}
            </div>

            {/* Thumbnail Navigation Bar */}
            {allMedia.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {allMedia.map((m, idx) => {
                  const isSelected = selectedMedia.url === m.url;
                  return (
                    <button
                      key={`${m.url}-${idx}`}
                      onClick={() => setSelectedMedia(m)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border flex-shrink-0 relative transition ${
                        isSelected ? 'border-[#FF8DA1] ring-2 ring-[#FF8DA1]/30' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {m.type === 'video' ? (
                        <div className="w-full h-full bg-[#3D282D] text-white flex flex-col items-center justify-center text-[9px] font-mono">
                          <Video className="w-4 h-4 text-[#FF8DA1]" />
                          <span>Video</span>
                        </div>
                      ) : (
                        <img src={m.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] text-[#8C655E] uppercase tracking-widest font-mono">
                  {product.category}
                </span>
                {product.isOffer && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C88A80] text-white text-[10px] font-mono flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" /> Buy 1 Get 1
                  </span>
                )}
                {product.isFewInStock && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-mono font-bold flex items-center gap-1">
                    ⚡ Low Stock
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-serif font-light text-[#2A2421]">{product.name}</h2>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold font-mono text-[#2A2421]">
                Rs. {product.price.toLocaleString()}.00
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through font-mono">
                  Rs. {product.originalPrice.toLocaleString()}.00
                </span>
              )}
            </div>

            {/* Order Fast Urgency Banner */}
            {product.isFewInStock && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 fill-current flex-shrink-0 animate-bounce" />
                <span>
                  <strong>Order fast!</strong> High demand design with only a few pieces left in stock.
                </span>
              </div>
            )}

            <p className="text-xs text-[#6E5F57] leading-relaxed font-light">{product.description}</p>

            {/* Material Tag */}
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EFE5E0] text-xs space-y-1">
              <span className="text-[10px] text-[#8C655E] font-mono uppercase block">Material Craftsmanship:</span>
              <span className="text-[#2A2421] font-medium block">{product.material}</span>
            </div>

            {/* Quantity Controls & Add to Cart */}
            <div className="pt-2 flex gap-3 items-center">
              <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 text-xs font-mono">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-gray-500 hover:text-black font-bold"
                >
                  -
                </button>
                <span className="px-3 text-[#2A2421] font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-gray-500 hover:text-black font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="flex-1 py-3.5 rounded-full bg-rose-accent text-white font-medium text-xs uppercase tracking-wider hover:bg-[#403632] transition shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-full border transition ${
                  isWishlisted ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-[#2A2421] border-gray-300'
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Direct WhatsApp Product Enquiry Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition shadow-sm flex items-center justify-center gap-2 font-sans"
              title={`Ask about this product on WhatsApp (${DISPLAY_WHATSAPP_NUMBER})`}
            >
              <MessageCircle className="w-4 h-4 fill-current text-white" />
              <span>Enquire on WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
            </a>

            {/* Value Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6E5F57] pt-2 border-t border-[#EFE5E0]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C88A80]" /> Free shipping above Rs. 1,499
              </span>
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#C88A80]" /> 7-Day Easy Exchange
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
