export const WHATSAPP_NUMBER = '919313825670';
export const DISPLAY_WHATSAPP_NUMBER = '+91 9313825670';

export function getWhatsAppProductLink(product: {
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  material?: string;
}): string {
  const fullImageUrl = product.image.startsWith('http')
    ? product.image
    : `${window.location.origin}${product.image}`;

  let text = `Hi Rosé Atelier, I am interested in inquiring about this product:\n\n`;
  text += `*Product:* ${product.name}\n`;
  text += `*Price:* Rs. ${product.price.toLocaleString()}.00\n`;

  if (product.category) {
    text += `*Category:* ${product.category}\n`;
  }
  if (product.material) {
    text += `*Material:* ${product.material}\n`;
  }
  if (product.description) {
    text += `*Description:* ${product.description}\n`;
  }

  text += `\n*Product Image Link:* ${fullImageUrl}\n`;
  text += `*Website Link:* ${window.location.origin}\n\n`;
  text += `Could you please share more details, stock availability, or ordering process?`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppGeneralLink(): string {
  const text = `Hi Rosé Atelier, I have an enquiry about your jewellery collection.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
