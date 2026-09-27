import React, { useMemo } from 'react';
import { Heart, Eye, ShoppingBag, Tag, MessageCircle, Zap } from 'lucide-react';
import type { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { getWhatsAppProductLink } from '../utils/whatsapp';

interface ProductGridProps {
  currentCategory: string;
  onSelectCategory: (cat: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  title?: string;
  filterOfferOnly?: boolean;
  products?: Product[];
  categories?: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  currentCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  title,
  filterOfferOnly = false,
  products = PRODUCTS,
  categories: customCategories,
}) => {
  const defaultCategories: string[] = [
    'All',
    'New Arrivals',
    'Buy 1 Get 1',
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Rings',
    'Anklets',
    'Hair Accessories',
  ];

  const categories = customCategories
    ? ['All', 'New Arrivals', 'Buy 1 Get 1', ...customCategories.filter((c) => c !== 'All')]
    : defaultCategories;

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (filterOfferOnly) {
      return list.filter((p) => p.isOffer);
    }

    if (currentCategory === 'New Arrivals') {
      return list.filter((p) => p.isNewArrival);
    }
    if (currentCategory === 'Buy 1 Get 1') {
      return list.filter((p) => p.isOffer);
    }
    if (currentCategory !== 'All' && currentCategory !== 'Home') {
      return list.filter((p) => p.category === currentCategory);
    }

    return list;
  }, [currentCategory, filterOfferOnly, products]);

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto" id="catalog-section">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#FFD6DF] pb-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#3D282D]">
            {title || (currentCategory === 'All' || currentCategory === 'Home' ? 'All Jewellery' : currentCategory)}
          </h2>
          <span className="text-xs text-[#9E4B5C] font-mono mt-1 block">
            Showing {filteredProducts.length} pieces
          </span>
        </div>

        {/* Category Pills */}
        {!filterOfferOnly && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition whitespace-nowrap border ${
                  currentCategory === cat
                    ? 'bg-[#3D282D] text-white border-[#3D282D] font-medium'
                    : 'bg-white text-[#6B444C] border-[#FFD6DF] hover:border-[#FF8DA1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          return (
            <div
              key={product.id}
              className="group rounded-2xl rose-card overflow-hidden hover:border-[#FF8DA1] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative aspect-square overflow-hidden bg-[#FFF5F7]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                  {product.isFewInStock && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-mono tracking-wider shadow flex items-center gap-1 font-bold">
                      <Zap className="w-2.5 h-2.5 fill-current animate-pulse" />
                      <span>Order Fast</span>
                    </span>
                  )}
                  {product.isOffer && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FF8DA1] text-white text-[10px] font-mono tracking-wider shadow flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      <span>Buy 1 Get 1</span>
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2 py-0.5 rounded-full bg-[#3D282D] text-white text-[10px] font-mono">
                      Sale
                    </span>
                  )}
                </div>

                {/* Wishlist Heart */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full transition backdrop-blur-sm ${
                    isWishlisted
                      ? 'bg-rose-500 text-white shadow'
                      : 'bg-white/80 text-[#3D282D] hover:text-[#FF8DA1] hover:bg-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                {/* Quick View Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => onQuickView(product)}
                    className="px-4 py-2 rounded-full bg-white text-[#3D282D] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-[#FF8DA1] hover:text-white transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-[#9E4B5C] uppercase tracking-widest font-mono block mb-1">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => onQuickView(product)}
                    className="text-sm font-serif font-medium text-[#3D282D] group-hover:text-[#FF8DA1] transition cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                </div>

                <div className="pt-2 border-t border-[#FFE5EC] flex items-center justify-between">
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-sm font-bold text-[#3D282D]">
                      Rs. {product.price.toLocaleString()}.00
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        Rs. {product.originalPrice.toLocaleString()}.00
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={getWhatsAppProductLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] transition shadow-xs"
                      title="Enquire on WhatsApp (+91 9313825670)"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-full bg-[#FFE5EC] text-[#3D282D] hover:bg-[#3D282D] hover:text-white transition"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
