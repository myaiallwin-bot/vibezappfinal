import React, { useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { CartDrawer } from '../Cart/CartDrawer';
import { AdvertisementBanner } from '../Banner/AdvertisementBanner';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Filter, Heart, ArrowLeft } from 'lucide-react';

export const WomensCollection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All', icon: '🛍️' },
    { id: 'tops', name: 'Tops & Blouses', icon: '👚' },
    { id: 'bottoms', name: 'Skirts & Pants', icon: '👖' },
    { id: 'dresses', name: 'Dresses', icon: '👗' },
    { id: 'shoes', name: 'Heels & Flats', icon: '👠' },
    { id: 'accessories', name: 'Accessories', icon: '👜' },
    { id: 'outerwear', name: 'Coats & Jackets', icon: '🧥' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesGender = product.gender === 'women';
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const isApproved = product.status === 'approved';
    
    return matchesSearch && matchesCategory && matchesGender && matchesPrice && isApproved;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: any, size: string) => {
    addToCart({
      productId: product.id,
      vendorId: product.vendorId,
      quantity: 1,
      size,
      price: product.price
    });
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span>Women's Collection</span>
          </h1>
          <p className="text-gray-600">Elegant fashion for the modern woman</p>
        </div>
      </div>

      {/* Hero Section with Banner */}
      <div className="space-y-4">
        <AdvertisementBanner position="category" />
        
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Women's Fashion Paradise</h2>
          <p className="text-white/90">Discover our stunning collection of women's clothing and accessories</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search women's products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {sortOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>

        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 whitespace-nowrap ${
              selectedCategory === category.id ? 'bg-pink-500 hover:bg-pink-600' : ''
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Price Range</span>
          <span className="text-sm text-gray-600">
            ₹{priceRange.min} - ₹{priceRange.max}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
            className="flex-1"
          />
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
            className="flex-1"
          />
        </div>
      </div>

      {/* Mid-page Banner */}
      <AdvertisementBanner position="product" className="h-48" />

      {/* Products Grid */}
      <div>
        <h3 className="text-xl font-bold mb-4">
          {filteredProducts.length} Products in Women's Collection
        </h3>
        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};