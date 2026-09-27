import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, User as UserIcon } from 'lucide-react';
import type { Category } from '../types';
import type { UserProfile } from './AuthModal';

interface NavbarProps {
  currentCategory: string;
  onSelectCategory: (cat: string) => void;
  cartCount: number;
  wishlistCount: number;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  user,
  onOpenAuth,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; cat: Category | 'Home' }[] = [
    { label: 'Home', cat: 'Home' },
    { label: 'Catalog', cat: 'All' },
    { label: 'Offers', cat: 'Buy 1 Get 1' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Glass Nav */}
      <div className={`rose-nav transition-all duration-300 ${isScrolled ? 'py-3 shadow-sm' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#3D282D] hover:text-[#FF8DA1]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left / Center Logo */}
          <div
            onClick={() => onSelectCategory('Home')}
            className="cursor-pointer text-center group"
          >
            <h1 className="text-2xl sm:text-3xl font-serif font-light tracking-wide text-[#3D282D]">
              Rosé Atelier
            </h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#9E4B5C] font-semibold mt-0.5">
              Minimal Everyday Jewellery
            </p>
          </div>

          {/* Desktop Links Bar */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium text-[#6B444C]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onSelectCategory(link.cat);
                  setMobileMenuOpen(false);
                }}
                className={`py-1 border-b-2 transition ${
                  (currentCategory === link.cat) || (link.cat === 'Home' && currentCategory === 'Home')
                    ? 'border-[#FF8DA1] text-[#3D282D] font-bold'
                    : 'border-transparent hover:text-[#3D282D] hover:border-[#FFC0CB]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#3D282D] hover:text-[#FF8DA1] transition"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Google / User Account Login Button */}
            <button
              onClick={onOpenAuth}
              className="p-1 rounded-full text-[#3D282D] hover:text-[#FF8DA1] transition flex items-center gap-2"
              title={user?.isLoggedIn ? `Account (${user.name})` : 'Sign In / Sign Up'}
            >
              {user && user.isLoggedIn ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#FF8DA1] shadow-xs"
                />
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5EC] border border-[#FFC0CB] text-[#9E4B5C] text-xs font-semibold">
                  <UserIcon className="w-3.5 h-3.5 text-[#FF8DA1]" />
                  <span className="hidden sm:inline">Sign In</span>
                </div>
              )}
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#3D282D] hover:text-[#FF8DA1] transition"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF8DA1] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#3D282D] text-white hover:bg-[#573A41] transition flex items-center justify-center shadow-sm"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF8DA1] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#FFD6DF] bg-[#FFF5F7] px-6 py-4 space-y-3 text-xs uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onSelectCategory(link.cat);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-[#3D282D] hover:text-[#FF8DA1]"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
