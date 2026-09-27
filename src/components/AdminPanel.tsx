import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Tag,
  ArrowLeft,
  Package,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  DollarSign,
  Upload,
  X
} from 'lucide-react';
import type { Product, ReferralCode } from '../types';

interface AdminPanelProps {
  products: Product[];
  categories: string[];
  referralCodes: ReferralCode[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddCategory: (categoryName: string) => void;
  onRenameCategory: (oldName: string, newName: string) => void;
  onDeleteCategory: (categoryName: string) => void;
  onAddReferralCode: (code: ReferralCode) => void;
  onToggleReferralCode: (id: string) => void;
  onDeleteReferralCode: (id: string) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  categories,
  referralCodes,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
  onAddReferralCode,
  onToggleReferralCode,
  onDeleteReferralCode,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'referrals'>('products');

  // Product Form State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Necklaces');
  const [price, setPrice] = useState<number>(799);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  
  // Product Images array (Max 6 images)
  const [productImages, setProductImages] = useState<string[]>(['/rose_hero.jpg']);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const [videosStr, setVideosStr] = useState('');
  const [material, setMaterial] = useState('18k Gold Plated');
  const [description, setDescription] = useState('');
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [isFewInStock, setIsFewInStock] = useState(false);

  // Category Rename State
  const [newCatName, setNewCatName] = useState('');
  const [renamingCat, setRenamingCat] = useState<string | null>(null);
  const [renamedCatValue, setRenamedCatValue] = useState('');

  // Referral Code Form State
  const [refCode, setRefCode] = useState('');
  const [refType, setRefType] = useState<'percentage' | 'fixed'>('percentage');
  const [refValue, setRefValue] = useState<number>(15);
  const [refMinOrder, setRefMinOrder] = useState<number>(1499);

  // Feedback Toast
  const [adminToast, setAdminToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3000);
  };

  // Image Upload File Handler (Base64)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (productImages.length >= 6) {
      triggerToast('Maximum 6 images allowed per product.');
      return;
    }

    const availableSlots = 6 - productImages.length;
    const filesToProcess = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      triggerToast(`Only added ${availableSlots} image(s). Maximum limit is 6 images.`);
    }

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          setProductImages((prev) => {
            if (prev.length >= 6) return prev;
            return [...prev, resultStr];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    if (productImages.length >= 6) {
      triggerToast('Maximum 6 images allowed per product.');
      return;
    }
    setProductImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productImages.length === 0) {
      triggerToast('Please upload or provide at least 1 image for the product.');
      return;
    }

    const primaryImg = productImages[0];
    const secImg = productImages[1] || undefined;
    const galImgs = productImages.slice(2);

    const parsedVideos = videosStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name,
        category,
        price,
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        image: primaryImg,
        secondaryImage: secImg,
        galleryImages: galImgs.length > 0 ? galImgs : undefined,
        videos: parsedVideos.length > 0 ? parsedVideos : undefined,
        material,
        description,
        isNewArrival,
        isOffer,
        isFewInStock,
      };
      onUpdateProduct(updated);
      triggerToast(`Updated product "${name}"`);
      setEditingProduct(null);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name,
        category,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        image: primaryImg,
        secondaryImage: secImg,
        galleryImages: galImgs.length > 0 ? galImgs : undefined,
        videos: parsedVideos.length > 0 ? parsedVideos : undefined,
        material,
        description,
        inStock: true,
        isNewArrival,
        isOffer,
        isFewInStock,
      };
      onAddProduct(newProd);
      triggerToast(`Added new product "${name}"`);
      setIsAddingProduct(false);
    }
    resetProductForm();
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    
    const imgs: string[] = [];
    if (p.image) imgs.push(p.image);
    if (p.secondaryImage) imgs.push(p.secondaryImage);
    if (p.galleryImages) {
      p.galleryImages.forEach((img) => {
        if (!imgs.includes(img)) imgs.push(img);
      });
    }
    setProductImages(imgs.slice(0, 6));

    setVideosStr(p.videos ? p.videos.join(', ') : '');
    setMaterial(p.material);
    setDescription(p.description);
    setIsNewArrival(!!p.isNewArrival);
    setIsOffer(!!p.isOffer);
    setIsFewInStock(!!p.isFewInStock);
    setIsAddingProduct(true);
  };

  const resetProductForm = () => {
    setName('');
    setCategory(categories[0] || 'Necklaces');
    setPrice(799);
    setOriginalPrice(undefined);
    setProductImages(['/rose_hero.jpg']);
    setImageUrlInput('');
    setVideosStr('');
    setMaterial('18k Gold Plated');
    setDescription('');
    setIsNewArrival(false);
    setIsOffer(false);
    setIsFewInStock(false);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim());
      triggerToast(`Added catalog category "${newCatName.trim()}"`);
      setNewCatName('');
    }
  };

  const handleRenameCategorySubmit = (oldName: string) => {
    if (renamedCatValue.trim() && renamedCatValue !== oldName) {
      onRenameCategory(oldName, renamedCatValue.trim());
      triggerToast(`Renamed catalog "${oldName}" to "${renamedCatValue.trim()}"`);
      setRenamingCat(null);
    }
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refCode.trim()) {
      const newRef: ReferralCode = {
        id: `ref-${Date.now()}`,
        code: refCode.trim().toUpperCase(),
        discountType: refType,
        discountValue: Number(refValue),
        minOrderAmount: Number(refMinOrder),
        active: true,
        usesCount: 0,
      };
      onAddReferralCode(newRef);
      triggerToast(`Created promo code "${newRef.code}"`);
      setRefCode('');
      setRefValue(15);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#3D282D] pb-16 pt-6">
      
      {/* Toast Notification */}
      {adminToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#3D282D] text-white text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#FF8DA1]" />
          <span>{adminToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#FFD6DF] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#FFF5F7] hover:bg-[#FFE5EC] transition text-[#3D282D]"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF8DA1]" />
                <h1 className="text-2xl font-serif font-light text-[#3D282D]">
                  Rosé Atelier Admin Center
                </h1>
              </div>
              <p className="text-xs text-[#9E4B5C] font-mono">
                Storefront Inventory &amp; Catalog Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#3D282D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#573A41] transition"
          >
            Back to Storefront ↗
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#FFD6DF] flex items-center gap-3 shadow-xs">
            <div className="p-3 rounded-xl bg-[#FFE5EC] text-[#FF8DA1]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 block">Products</span>
              <span className="text-xl font-bold font-mono text-[#3D282D]">{products.length}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#FFD6DF] flex items-center gap-3 shadow-xs">
            <div className="p-3 rounded-xl bg-[#FFE5EC] text-[#FF8DA1]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 block">Catalogs</span>
              <span className="text-xl font-bold font-mono text-[#3D282D]">{categories.length}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#FFD6DF] flex items-center gap-3 shadow-xs">
            <div className="p-3 rounded-xl bg-[#FFE5EC] text-[#FF8DA1]">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 block">Promo Codes</span>
              <span className="text-xl font-bold font-mono text-[#3D282D]">
                {referralCodes.filter((r) => r.active).length} Active
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#FFD6DF] flex items-center gap-3 shadow-xs">
            <div className="p-3 rounded-xl bg-[#FFE5EC] text-[#FF8DA1]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 block">Total Inventory Value</span>
              <span className="text-xl font-bold font-mono text-[#3D282D]">
                Rs. {products.reduce((acc, p) => acc + p.price, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#FFD6DF] gap-4 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-2 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#FF8DA1] text-[#3D282D] font-bold'
                : 'border-transparent text-gray-400 hover:text-[#3D282D]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Manager ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`pb-3 px-2 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'border-[#FF8DA1] text-[#3D282D] font-bold'
                : 'border-transparent text-gray-400 hover:text-[#3D282D]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Catalog Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('referrals')}
            className={`pb-3 px-2 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'referrals'
                ? 'border-[#FF8DA1] text-[#3D282D] font-bold'
                : 'border-transparent text-gray-400 hover:text-[#3D282D]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Referral Codes &amp; Offers ({referralCodes.length})</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-serif font-medium text-[#3D282D]">Store Inventory</h3>
              <button
                onClick={() => {
                  resetProductForm();
                  setEditingProduct(null);
                  setIsAddingProduct(!isAddingProduct);
                }}
                className="px-4 py-2 rounded-full bg-[#FF8DA1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#ff748b] transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingProduct ? 'Cancel Form' : 'Add New Product'}</span>
              </button>
            </div>

            {/* Add / Edit Product Form Drawer */}
            {isAddingProduct && (
              <form
                onSubmit={handleProductSubmit}
                className="p-6 rounded-3xl bg-white border border-[#FF8DA1] shadow-lg space-y-4 animate-fade-in"
              >
                <h4 className="text-sm font-serif font-bold text-[#3D282D] border-b border-[#FFD6DF] pb-2">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-mono text-gray-600 block mb-1">Product Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Céleste Pearl Necklace"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-mono text-gray-600 block mb-1">Catalog Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-gray-600 block mb-1">Price (Rs.) *</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-mono text-gray-600 block mb-1">Original Price (Rs.) (Optional for Sale Strikethrough)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1799"
                      value={originalPrice || ''}
                      onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    />
                  </div>

                  {/* Image Upload Manager (Max 6 Images) */}
                  <div className="sm:col-span-2 space-y-3 p-4 rounded-2xl bg-[#FFF5F7] border border-[#FFD6DF]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#FFD6DF] pb-3">
                      <div>
                        <label className="font-serif font-bold text-[#3D282D] text-sm block">
                          Product Images ({productImages.length}/6 Max)
                        </label>
                        <span className="text-[11px] text-[#9E4B5C] font-mono">
                          Upload image files directly or paste web URLs. Image #1 will be the Primary Cover.
                        </span>
                      </div>

                      {/* File Upload Button */}
                      {productImages.length < 6 && (
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageFileUpload}
                            className="hidden"
                            id="admin-image-upload-input"
                          />
                          <label
                            htmlFor="admin-image-upload-input"
                            className="px-4 py-2 rounded-full bg-[#FF8DA1] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#ff748b] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Images</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Image URL Paste Fallback */}
                    {productImages.length < 6 && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Or paste image URL (e.g. /rose_hero.jpg or https://...)"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          className="flex-1 px-4 py-2 rounded-xl bg-white border border-[#FFD6DF] text-xs font-mono text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                        />
                        <button
                          type="button"
                          onClick={handleAddImageUrl}
                          className="px-4 py-2 bg-[#3D282D] text-white text-xs font-mono font-bold rounded-xl hover:bg-[#573A41] transition"
                        >
                          Add URL
                        </button>
                      </div>
                    )}

                    {/* Uploaded Images Grid (Max 6) */}
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
                      {productImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-xl overflow-hidden bg-white border border-[#FFD6DF] group shadow-xs"
                        >
                          <img
                            src={imgUrl}
                            alt={`Product ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Badge */}
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-[#3D282D]/80 text-white text-[9px] font-mono">
                            {idx === 0 ? '#1 Cover' : idx === 1 ? '#2 Sec' : `#${idx + 1}`}
                          </span>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition shadow"
                            title="Remove Image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {productImages.length === 0 && (
                        <div className="col-span-full text-center py-6 border-2 border-dashed border-[#FFD6DF] rounded-xl text-xs text-gray-400 font-mono">
                          No images uploaded yet. Please upload up to 6 product images.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Multiple Videos Input */}
                  <div className="sm:col-span-2">
                    <label className="font-mono text-gray-600 block mb-1">
                      Multiple Video Showcase URLs (Separated by commas)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://assets.mixkit.co/videos/preview/mixkit-gold-jewelry-close-up-42861-large.mp4"
                      value={videosStr}
                      onChange={(e) => setVideosStr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-gray-600 block mb-1">Material &amp; Finish</label>
                    <input
                      type="text"
                      placeholder="18k Gold Plated & Freshwater Pearls"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-gray-600 block mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="Product details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-xs font-mono pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewArrival}
                      onChange={(e) => setIsNewArrival(e.target.checked)}
                      className="w-4 h-4 accent-[#FF8DA1]"
                    />
                    <span>Mark as New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOffer}
                      onChange={(e) => setIsOffer(e.target.checked)}
                      className="w-4 h-4 accent-[#FF8DA1]"
                    />
                    <span>Include in Buy 1 Get 1 Offer</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-600">
                    <input
                      type="checkbox"
                      checked={isFewInStock}
                      onChange={(e) => setIsFewInStock(e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span>⚡ Order Fast, Few in Stock Alert</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#3D282D] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#573A41] transition"
                  >
                    {editingProduct ? 'Save Changes' : 'Publish Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 text-xs font-semibold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#FFD6DF] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF5F7] border-b border-[#FFD6DF] text-[#9E4B5C] font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Catalog</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Badges</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FFD6DF]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FFF5F7]/50 transition">
                        <td className="p-4">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-xl border border-[#FFD6DF]"
                          />
                        </td>
                        <td className="p-4">
                          <span className="font-serif font-bold text-[#3D282D] block">{p.name}</span>
                          <span className="text-[10px] text-gray-500 font-mono block">{p.material}</span>
                        </td>
                        <td className="p-4 font-mono font-medium text-[#9E4B5C]">{p.category}</td>
                        <td className="p-4 font-mono font-bold text-[#3D282D]">
                          Rs. {p.price.toLocaleString()}.00
                          {p.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through block">
                              Rs. {p.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {p.isFewInStock && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-mono font-bold border border-amber-300">
                                ⚡ Few In Stock
                              </span>
                            )}
                            {p.isNewArrival && (
                              <span className="px-2 py-0.5 rounded-full bg-[#FFE5EC] text-[#9E4B5C] text-[9px] font-mono">
                                New Arrival
                              </span>
                            )}
                            {p.isOffer && (
                              <span className="px-2 py-0.5 rounded-full bg-[#FF8DA1] text-white text-[9px] font-mono">
                                BOGO Offer
                              </span>
                            )}
                            {p.galleryImages && p.galleryImages.length > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[9px] font-mono">
                                🖼️ {p.galleryImages.length} Images
                              </span>
                            )}
                            {p.videos && p.videos.length > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[9px] font-mono">
                                🎥 {p.videos.length} Videos
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-2 rounded-lg bg-[#FFF5F7] hover:bg-[#FFE5EC] text-[#3D282D] transition"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              onDeleteProduct(p.id);
                              triggerToast(`Deleted product "${p.name}"`);
                            }}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG CATEGORIES MANAGER */}
        {activeTab === 'categories' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Add New Category Form */}
            <form
              onSubmit={handleAddCategorySubmit}
              className="p-6 rounded-3xl bg-white border border-[#FFD6DF] shadow-xs space-y-3"
            >
              <h3 className="text-sm font-serif font-bold text-[#3D282D]">Add New Catalog Category</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. Hair Accessories, Piercings, Charms..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-xs text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#FF8DA1] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff748b] transition"
                >
                  Add Catalog
                </button>
              </div>
            </form>

            {/* Categories List */}
            <div className="bg-white rounded-3xl border border-[#FFD6DF] overflow-hidden shadow-xs divide-y divide-[#FFD6DF]">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                const isEditing = renamingCat === cat;

                return (
                  <div key={cat} className="p-4 flex items-center justify-between gap-4">
                    {isEditing ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={renamedCatValue}
                          onChange={(e) => setRenamedCatValue(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-[#FF8DA1] text-xs"
                          autoFocus
                        />
                        <button
                          onClick={() => handleRenameCategorySubmit(cat)}
                          className="px-4 py-1.5 rounded-xl bg-[#3D282D] text-white text-xs font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setRenamingCat(null)}
                          className="px-3 py-1.5 rounded-xl border border-gray-300 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h4 className="text-sm font-serif font-bold text-[#3D282D]">{cat}</h4>
                          <span className="text-[11px] text-[#9E4B5C] font-mono">
                            {count} products linked to this catalog
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setRenamingCat(cat);
                              setRenamedCatValue(cat);
                            }}
                            className="px-3 py-1.5 rounded-full bg-[#FFF5F7] hover:bg-[#FFE5EC] text-xs font-mono text-[#3D282D] transition flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Rename
                          </button>
                          {cat !== 'All' && (
                            <button
                              onClick={() => {
                                onDeleteCategory(cat);
                                triggerToast(`Deleted catalog "${cat}"`);
                              }}
                              className="p-1.5 rounded-full hover:bg-rose-100 text-rose-600 transition"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: REFERRAL CODES & OFFERS CREATOR */}
        {activeTab === 'referrals' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Create Referral Code Form */}
            <form
              onSubmit={handleReferralSubmit}
              className="p-6 rounded-3xl bg-white border border-[#FFD6DF] shadow-xs space-y-4"
            >
              <h3 className="text-sm font-serif font-bold text-[#3D282D]">Create New Referral &amp; Offer Promo Code</h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="font-mono text-gray-600 block mb-1">Promo Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. VIP2026"
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] font-mono font-bold focus:outline-none focus:border-[#FF8DA1]"
                    required
                  />
                </div>

                <div>
                  <label className="font-mono text-gray-600 block mb-1">Discount Type</label>
                  <select
                    value={refType}
                    onChange={(e) => setRefType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                  >
                    <option value="percentage">Percentage Off (%)</option>
                    <option value="fixed">Fixed Amount Off (Rs.)</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-gray-600 block mb-1">
                    Discount Value ({refType === 'percentage' ? '%' : 'Rs.'}) *
                  </label>
                  <input
                    type="number"
                    value={refValue}
                    onChange={(e) => setRefValue(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                    required
                  />
                </div>

                <div>
                  <label className="font-mono text-gray-600 block mb-1">Min Order Threshold (Rs.)</label>
                  <input
                    type="number"
                    value={refMinOrder}
                    onChange={(e) => setRefMinOrder(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-full bg-[#FFF5F7] border border-[#FFD6DF] text-[#3D282D] focus:outline-none focus:border-[#FF8DA1]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#3D282D] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#573A41] transition"
              >
                Create Promo Code
              </button>
            </form>

            {/* Codes List */}
            <div className="bg-white rounded-3xl border border-[#FFD6DF] overflow-hidden shadow-xs divide-y divide-[#FFD6DF]">
              {referralCodes.map((r) => (
                <div key={r.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm px-3 py-1 rounded-lg bg-[#FFE5EC] text-[#9E4B5C]">
                        {r.code}
                      </span>
                      {r.active ? (
                        <span className="text-[10px] text-emerald-600 font-mono font-bold">● Active</span>
                      ) : (
                        <span className="text-[10px] text-gray-400 font-mono">● Inactive</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B444C]">
                      Discount:{' '}
                      <strong className="text-[#3D282D]">
                        {r.discountType === 'percentage' ? `${r.discountValue}% OFF` : `Rs. ${r.discountValue} OFF`}
                      </strong>{' '}
                      • Min Order: Rs. {r.minOrderAmount?.toLocaleString()} • Used {r.usesCount} times
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleReferralCode(r.id)}
                      className="p-1.5 text-gray-600 hover:text-[#3D282D] transition"
                      title="Toggle Active Status"
                    >
                      {r.active ? (
                        <ToggleRight className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-gray-400" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onDeleteReferralCode(r.id);
                        triggerToast(`Deleted code "${r.code}"`);
                      }}
                      className="p-1.5 text-rose-500 hover:text-rose-700 transition"
                      title="Delete Code"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
