import React, { useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { CartDrawer } from '../Cart/CartDrawer';
import { AdvertisementBanner } from '../Banner/AdvertisementBanner';
import { SidebarBanner } from '../Banner/SidebarBanner';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/mockData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Filter, Sparkles, Shirt, Users } from 'lucide-react';

export const CustomerMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'tops', name: 'Tops', icon: '👕' },
    { id: 'bottoms', name: 'Bottoms', icon: '👖' },
    { id: 'shoes', name: 'Shoes', icon: '👟' },
    { id: 'accessories', name: 'Accessories', icon: '👜' },
    { id: 'outerwear', name: 'Outerwear', icon: '🧥' },
    { id: 'dresses', name: 'Dresses', icon: '👗' }
  ];

  const genderOptions = [
    { id: 'all', name: 'All', icon: <Users className="h-4 w-4" /> },
    { id: 'men', name: 'Men', icon: <Shirt className="h-4 w-4" /> },
    { id: 'women', name: 'Women', icon: <Shirt className="h-4 w-4" /> }
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
    const matchesGender = selectedGender === 'all' || product.gender === selectedGender;
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
      {/* Hero Banner */}
      <AdvertisementBanner position="homepage" />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Gender Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">Gender:</span>
              <div className="flex space-x-1">
                {genderOptions.map(gender => (
                  <Button
                    key={gender.id}
                    variant={selectedGender === gender.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGender(gender.id as any)}
                    className={`flex items-center space-x-1 ${
                      selectedGender === gender.id ? 'bg-blue-500 hover:bg-blue-600' : ''
                    }`}
                  >
                    {gender.icon}
                    <span className="hidden sm:inline">{gender.name}</span>
                  </Button>
                ))}
              </div>
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

          {/* Category Banner */}
          {selectedCategory !== 'all' && (
            <AdvertisementBanner position="category" className="h-48" />
          )}

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

          {/* Products Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {filteredProducts.length} Products Found
                {selectedGender !== 'all' && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({selectedGender === 'men' ? "Men's" : "Women's"} Collection)
                  </span>
                )}
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedGender('men')}
                  className={selectedGender === 'men' ? 'bg-blue-100 border-blue-300' : ''}
                >
                  <Shirt className="h-4 w-4 mr-1" />
                  Men's Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedGender('women')}
                  className={selectedGender === 'women' ? 'bg-pink-100 border-pink-300' : ''}
                >
                  <Shirt className="h-4 w-4 mr-1" />
                  Women's Only
                </Button>
              </div>
            </div>
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sidebar Banner */}
          <SidebarBanner />
          
          {/* Additional Sidebar Content */}
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-3">Trending Now</h3>
            <div className="space-y-3">
              {['Summer Collection', 'New Arrivals', 'Sale Items'].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div>
                    <p className="text-sm font-medium">{item}</p>
                    <p className="text-xs text-gray-500">View products</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Banner */}
          <AdvertisementBanner position="sidebar" />
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};