import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppGeneralLink, DISPLAY_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={getWhatsAppGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group"
      title={`Enquire on WhatsApp (${DISPLAY_WHATSAPP_NUMBER})`}
    >
      <MessageCircle className="w-6 h-6 fill-current text-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold font-sans tracking-wide pr-1">
        Enquire on WhatsApp
      </span>
    </a>
  );
};
