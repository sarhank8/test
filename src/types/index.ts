export type Category = string;

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  galleryImages?: string[]; // Multiple extra images
  videos?: string[];        // Multiple video URLs (.mp4, .webm, etc.)
  description: string;
  material: string;
  inStock: boolean;
  isFewInStock?: boolean;   // Order fast, few in stock flag
  isNewArrival?: boolean;
  isOffer?: boolean;        // BOGO Offer
  rating?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  selectedSize?: string;
}

export interface ReferralCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 15 for 15% or 200 for Rs. 200 off
  minOrderAmount?: number;
  active: boolean;
  usesCount: number;
}
