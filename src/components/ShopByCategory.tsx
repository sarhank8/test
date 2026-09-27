import React from 'react';
import type { Category } from '../types';

interface ShopByCategoryProps {
  onSelectCategory: (cat: Category) => void;
}

const CATEGORIES: { name: Category; count: string; image: string }[] = [
  {
    name: 'Necklaces',
    count: '2 Items',
    image: '/rose_hero.jpg',
  },
  {
    name: 'Earrings',
    count: '3 Items',
    image: '/rose_pearl.jpg',
  },
  {
    name: 'Bracelets',
    count: '2 Items',
    image: 'https://images.unsplash.com/photo-1611591475281-b1c9c0b11565?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Rings',
    count: '3 Items',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Anklets',
    count: '1 Item',
    image: '/rose_pearl.jpg',
  },
  {
    name: 'Hair Accessories',
    count: '1 Item',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
  },
];

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2421] font-light">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className="group cursor-pointer rounded-2xl overflow-hidden rose-card hover:border-[#C88A80] transition-all duration-300 p-3 text-center space-y-3"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF7F5]">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#2A2421] group-hover:text-[#C88A80] transition">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
