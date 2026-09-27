import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const ValueProps: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#FFD6DF] my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        
        <div className="space-y-2 p-5 rounded-2xl bg-[#FFEEEF] border border-[#FFD6DF]">
          <Sparkles className="w-6 h-6 text-[#FF8DA1] mx-auto" />
          <h4 className="text-xs font-semibold text-[#3D282D] uppercase tracking-wider">18k Gold Plated</h4>
          <p className="text-[11px] text-[#6B444C]">Rich, lasting shine</p>
        </div>

        <div className="space-y-2 p-5 rounded-2xl bg-[#FFEEEF] border border-[#FFD6DF]">
          <ShieldCheck className="w-6 h-6 text-[#FF8DA1] mx-auto" />
          <h4 className="text-xs font-semibold text-[#3D282D] uppercase tracking-wider">Anti-Tarnish</h4>
          <p className="text-[11px] text-[#6B444C]">Skin-safe &amp; hypoallergenic</p>
        </div>

        <div className="space-y-2 p-5 rounded-2xl bg-[#FFEEEF] border border-[#FFD6DF]">
          <Truck className="w-6 h-6 text-[#FF8DA1] mx-auto" />
          <h4 className="text-xs font-semibold text-[#3D282D] uppercase tracking-wider">Free Shipping</h4>
          <p className="text-[11px] text-[#6B444C]">On orders above Rs. 1,499</p>
        </div>

        <div className="space-y-2 p-5 rounded-2xl bg-[#FFEEEF] border border-[#FFD6DF]">
          <RefreshCw className="w-6 h-6 text-[#FF8DA1] mx-auto" />
          <h4 className="text-xs font-semibold text-[#3D282D] uppercase tracking-wider">Easy Exchange</h4>
          <p className="text-[11px] text-[#6B444C]">Within 7 days</p>
        </div>

      </div>
    </section>
  );
};
