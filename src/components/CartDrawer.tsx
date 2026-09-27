import React, { useState } from 'react';
import { X, Trash2, Check, ArrowRight, ShoppingBag, Truck, Tag } from 'lucide-react';
import type { CartItem, ReferralCode } from '../types';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  appliedReferral?: ReferralCode | null;
  onApplyReferral?: (code: string) => { success: boolean; message: string };
  onRemoveReferral?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  appliedReferral = null,
  onApplyReferral,
  onRemoveReferral,
}) => {
  if (!isOpen) return null;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // BOGO Discount calculation: If user has 2+ BOGO items, lowest price item is free!
  const bogoItems = cartItems.filter((item) => item.product.isOffer);
  let bogoDiscount = 0;
  if (bogoItems.length >= 2) {
    const minPrice = Math.min(...bogoItems.map((i) => i.unitPrice));
    bogoDiscount = minPrice;
  }

  // Promo Referral Discount calculation
  let promoDiscount = 0;
  if (appliedReferral && appliedReferral.active) {
    if (appliedReferral.discountType === 'percentage') {
      promoDiscount = Math.round((subtotal * appliedReferral.discountValue) / 100);
    } else {
      promoDiscount = appliedReferral.discountValue;
    }
  }

  const freeShippingThreshold = 1499;
  const grandTotal = Math.max(0, subtotal - bogoDiscount - promoDiscount);
  const shippingProgress = Math.min(100, (grandTotal / freeShippingThreshold) * 100);
  const isFreeShipping = grandTotal >= freeShippingThreshold;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    if (onApplyReferral) {
      const res = onApplyReferral(promoInput.trim());
      setPromoFeedback({ isError: !res.success, message: res.message });
      if (res.success) {
        setPromoInput('');
      }
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C88A80', '#2A2421', '#E8C3B9'],
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-[#EFE5E0]">
            <div className="flex items-center gap-2 text-[#2A2421] font-serif text-xl">
              <ShoppingBag className="w-5 h-5 text-[#C88A80]" />
              <span>Your Cart</span>
              <span className="text-xs font-mono text-gray-500 font-sans">({cartItems.length})</span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {!orderComplete && cartItems.length > 0 && (
            <div className="py-3 px-4 bg-[#FAF7F5] rounded-2xl border border-[#EFE5E0] my-3 space-y-1.5 text-xs">
              <div className="flex justify-between items-center font-mono">
                <span className="flex items-center gap-1.5 text-[#2A2421]">
                  <Truck className="w-3.5 h-3.5 text-[#C88A80]" />
                  {isFreeShipping ? (
                    <strong className="text-emerald-600">You unlocked FREE Shipping!</strong>
                  ) : (
                    <span>Add Rs. {(freeShippingThreshold - grandTotal).toLocaleString()}.00 for Free Shipping</span>
                  )}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#EFE5E0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C88A80] transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto py-2 space-y-3">
            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F5] border border-[#C88A80] flex items-center justify-center mx-auto text-[#C88A80]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-[#2A2421]">Thank You for Your Order!</h3>
                <p className="text-xs text-[#6E5F57] font-light">
                  Your Rosé Atelier order has been confirmed and is being hand-packaged with love. Order tracking sent to your email.
                </p>
                <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EFE5E0] text-xs font-mono text-[#2A2421]">
                  Order ID: #ROSE-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-rose-accent text-white font-bold text-xs uppercase tracking-widest"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="text-gray-400 text-sm font-serif">Your cart is currently empty.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EFE5E0] flex gap-3 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                  />

                  <div className="flex-1">
                    <h4 className="text-xs font-serif font-medium text-[#2A2421] line-clamp-1">
                      {item.product.name}
                    </h4>
                    {item.product.isOffer && (
                      <span className="text-[10px] text-[#C88A80] font-mono flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> BOGO Offer Item
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-[#2A2421] block mt-0.5">
                      Rs. {item.unitPrice.toLocaleString()}.00
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-full px-2 py-0.5 text-xs font-mono">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-1 text-gray-500 hover:text-black font-bold"
                    >
                      -
                    </button>
                    <span className="px-2 text-[#2A2421] font-bold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-1 text-gray-500 hover:text-black font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-400 hover:text-rose-500 p-1 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && !orderComplete && (
            <div className="pt-3 border-t border-[#FFD6DF] space-y-3">
              
              {/* Promo / Referral Code Box */}
              <div className="space-y-1.5">
                {appliedReferral ? (
                  <div className="flex justify-between items-center text-xs font-mono bg-[#FFE5EC] border border-[#FF8DA1] p-2.5 rounded-xl text-[#9E4B5C]">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5 text-[#FF8DA1]" />
                      <span>Code "{appliedReferral.code}" Applied!</span>
                    </div>
                    <button
                      onClick={onRemoveReferral}
                      className="text-xs text-rose-600 hover:underline font-sans"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Referral / Promo Code (e.g. ROSE10)"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        setPromoFeedback(null);
                      }}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] font-mono text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#3D282D] text-white text-xs font-mono font-bold rounded-xl hover:bg-[#573A41] transition"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoFeedback && (
                  <p
                    className={`text-[10px] font-mono ${
                      promoFeedback.isError ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Discounts */}
              {bogoDiscount > 0 && (
                <div className="flex justify-between items-center text-xs font-mono text-emerald-700 bg-emerald-50 p-2 rounded-xl">
                  <span>Buy 1 Get 1 Free Discount:</span>
                  <span>-Rs. {bogoDiscount.toLocaleString()}.00</span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div className="flex justify-between items-center text-xs font-mono text-emerald-700 bg-emerald-50 p-2 rounded-xl">
                  <span>Referral Promo ({appliedReferral?.code}):</span>
                  <span>-Rs. {promoDiscount.toLocaleString()}.00</span>
                </div>
              )}

              <div className="flex justify-between items-baseline font-serif pt-1">
                <span className="text-gray-500 text-sm">Subtotal:</span>
                <span className="text-xl font-bold font-mono text-[#3D282D]">
                  Rs. {grandTotal.toLocaleString()}.00
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-full bg-[#3D282D] text-white font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#573A41] transition shadow-md flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
