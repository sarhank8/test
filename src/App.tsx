import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { BogoBanner } from './components/BogoBanner';
import { EditorialCards } from './components/EditorialCards';
import { ValueProps } from './components/ValueProps';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import type { UserProfile } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { INITIAL_REFERRALS } from './data/referrals';
import type { Product, CartItem, ReferralCode } from './types';

export function App() {
  const [currentCategory, setCurrentCategory] = useState<string>('Home');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<string[]>([
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Rings',
    'Anklets',
    'Hair Accessories',
  ]);
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>(INITIAL_REFERRALS);
  const [appliedReferral, setAppliedReferral] = useState<ReferralCode | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['celeste-pearl-necklace']);
  
  // User Auth State
  const [user, setUser] = useState<UserProfile | null>(null);

  // Modals & View State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Check URL path or hash for /admin on load or popstate
  useEffect(() => {
    const checkAdminPath = () => {
      if (
        window.location.pathname.includes('/admin') ||
        window.location.hash === '#admin' ||
        window.location.search.includes('admin=true')
      ) {
        setIsAdminOpen(true);
      } else {
        setIsAdminOpen(false);
      }
    };
    checkAdminPath();
    window.addEventListener('popstate', checkAdminPath);
    return () => window.removeEventListener('popstate', checkAdminPath);
  }, []);

  // Active Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add standard product to cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          product,
          quantity,
          unitPrice: product.price,
        },
      ];
    });
    showToast(`Added "${product.name}" to your Cart.`);
    setIsCartOpen(true);
  };

  // Wishlist toggle
  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed item from Saved Wishlist.');
        return prev.filter((item) => item !== id);
      }
      showToast('Saved item to your Wishlist.');
      return [...prev, id];
    });
  };

  // Admin Product Handlers
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created!`);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    showToast(`Product "${updatedProduct.name}" updated!`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.');
  };

  // Admin Catalog Handlers
  const handleAddCategory = (catName: string) => {
    if (!categories.includes(catName)) {
      setCategories((prev) => [...prev, catName]);
      showToast(`Catalog category "${catName}" created!`);
    }
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
    setCategories((prev) => prev.map((c) => (c === oldName ? newName : c)));
    setProducts((prev) =>
      prev.map((p) => (p.category === oldName ? { ...p, category: newName } : p))
    );
    showToast(`Renamed catalog "${oldName}" to "${newName}"`);
  };

  const handleDeleteCategory = (catName: string) => {
    setCategories((prev) => prev.filter((c) => c !== catName));
    showToast(`Catalog category "${catName}" deleted.`);
  };

  // Admin Referral Handlers
  const handleAddReferralCode = (code: ReferralCode) => {
    setReferralCodes((prev) => [code, ...prev]);
    showToast(`Referral code "${code.code}" activated!`);
  };

  const handleToggleReferralCode = (id: string) => {
    setReferralCodes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleDeleteReferralCode = (id: string) => {
    setReferralCodes((prev) => prev.filter((r) => r.id !== id));
  };

  // Cart Apply Referral Handler
  const handleApplyReferral = (codeStr: string) => {
    const found = referralCodes.find(
      (r) => r.code.toUpperCase() === codeStr.toUpperCase() && r.active
    );
    if (!found) {
      return { success: false, message: 'Invalid or inactive promo referral code.' };
    }
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    if (found.minOrderAmount && subtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Order subtotal must be at least Rs. ${found.minOrderAmount} for code ${found.code}.`,
      };
    }
    setAppliedReferral(found);
    return {
      success: true,
      message: `Promo code ${found.code} applied successfully!`,
    };
  };

  // Smooth Navigation helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If Admin Panel view is active, check authentication status
  if (isAdminOpen) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
            showToast('Admin Credentials Verified!');
          }}
          onBackToStore={() => {
            setIsAdminOpen(false);
            window.history.pushState({}, '', '/');
          }}
        />
      );
    }

    return (
      <AdminPanel
        products={products}
        categories={categories}
        referralCodes={referralCodes}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddCategory={handleAddCategory}
        onRenameCategory={handleRenameCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddReferralCode={handleAddReferralCode}
        onToggleReferralCode={handleToggleReferralCode}
        onDeleteReferralCode={handleDeleteReferralCode}
        onClose={() => {
          setIsAdminOpen(false);
          setIsAdminAuthenticated(false);
          window.history.pushState({}, '', '/');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#3D282D] relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[#3D282D] text-white text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#FF8DA1] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          if (cat !== 'Home') {
            scrollToSection('catalog-section');
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Hero Section */}
      {currentCategory === 'Home' && (
        <>
          <Hero onShopClick={() => scrollToSection('catalog-section')} />

          {/* Shop By Category */}
          <ShopByCategory
            onSelectCategory={(cat) => {
              setCurrentCategory(cat);
              scrollToSection('catalog-section');
            }}
          />

          {/* New Arrivals Section */}
          <ProductGrid
            currentCategory="New Arrivals"
            onSelectCategory={setCurrentCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            title="New Arrivals"
            products={products}
            categories={categories}
          />

          {/* BOGO Promo Banner */}
          <BogoBanner
            onShopOffer={() => {
              setCurrentCategory('Buy 1 Get 1');
              scrollToSection('catalog-section');
            }}
          />

          {/* Offer Favourites Section */}
          <ProductGrid
            currentCategory="Buy 1 Get 1"
            onSelectCategory={setCurrentCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            title="Offer Favourites"
            filterOfferOnly={true}
            products={products}
            categories={categories}
          />

          {/* Editorial Dual Cards */}
          <EditorialCards
            onSelectCategory={(cat) => {
              setCurrentCategory(cat);
              scrollToSection('catalog-section');
            }}
          />

          {/* Value Props */}
          <ValueProps />
        </>
      )}

      {/* Filtered Catalog View (when not Home) */}
      {currentCategory !== 'Home' && (
        <div className="pt-28">
          <ProductGrid
            currentCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            products={products}
            categories={categories}
          />
          <ValueProps />
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLoginSuccess={(profile) => {
          setUser(profile);
          showToast(`Welcome back, ${profile.name}!`);
        }}
        onLogout={() => {
          setUser(null);
          showToast('Signed out of account.');
        }}
      />

      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
        onUpdateQuantity={(id, delta) =>
          setCartItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
          )
        }
        onClearCart={() => setCartItems([])}
        appliedReferral={appliedReferral}
        onApplyReferral={handleApplyReferral}
        onRemoveReferral={() => setAppliedReferral(null)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Floating WhatsApp Enquiry Widget */}
      <WhatsAppFloat />

    </div>
  );
}

export default App;
