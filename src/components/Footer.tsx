import React, { useState } from 'react';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppGeneralLink, DISPLAY_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#FFF5F7] text-[#3D282D] border-t border-[#FFD6DF] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Newsletter Section */}
        <div className="bg-[#FFE5EC] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4 border border-[#FFC0CB]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#9E4B5C] text-xs font-mono uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8DA1]" />
            <span>Join the Atelier</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif font-light">
            Early access to new drops &amp; 10% off
          </h3>
          <p className="text-xs text-[#6B444C] max-w-md mx-auto font-light">
            Subscribe for exclusive previews of new collection drops and private discounts.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-white border border-[#FF8DA1] text-[#9E4B5C] text-xs font-mono max-w-sm mx-auto">
              ✓ Welcome to Rosé Atelier! Check your inbox for your 10% voucher code.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full bg-white border border-[#FFD6DF] text-[#3D282D] text-xs focus:outline-none focus:border-[#FF8DA1]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#3D282D] text-white font-medium text-xs uppercase tracking-widest hover:bg-[#573A41] transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-light text-[#6B444C]">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <h4 className="text-xl font-serif text-[#3D282D] font-light">
              Rosé Atelier
            </h4>
            <p className="text-[11px] leading-relaxed text-[#6B444C]">
              Minimal, everyday jewellery in 18k gold plating and freshwater pearls. Designed for every day and kept for a lifetime.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-2">
            <h5 className="text-xs uppercase tracking-widest font-mono text-[#3D282D] font-semibold">Shop</h5>
            <ul className="space-y-1.5">
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Necklaces</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Earrings</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Bracelets</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Rings</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Anklets</li>
            </ul>
          </div>

          {/* Help & Enquiry */}
          <div className="space-y-2">
            <h5 className="text-xs uppercase tracking-widest font-mono text-[#3D282D] font-semibold">Help &amp; Enquiry</h5>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={getWhatsAppGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#25D366] font-bold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp: {DISPLAY_WHATSAPP_NUMBER}</span>
                </a>
              </li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Shipping policy</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Returns &amp; exchanges</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Jewellery care</li>
            </ul>
          </div>

          {/* Follow */}
          <div className="space-y-2">
            <h5 className="text-xs uppercase tracking-widest font-mono text-[#3D282D] font-semibold">Follow Us</h5>
            <ul className="space-y-1.5">
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Instagram</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Facebook</li>
              <li className="hover:text-[#FF8DA1] cursor-pointer transition">Pinterest</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFD6DF] flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#9E4B5C] gap-4">
          <p>© 2026 Rosé Atelier. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-[#3D282D] cursor-pointer">18k Gold Plated Guarantee</span>
            <span className="hover:text-[#3D282D] cursor-pointer">Anti-Tarnish Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
