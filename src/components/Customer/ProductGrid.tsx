import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, Star, Store } from 'lucide-react';
import { mockVendors } from '../../data/mockData';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  vendorId: string;
  status: string;
  sizes?: string[];
  rating?: number;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>({});

  const getVendorName = (vendorId: string) => {
    const vendor = mockVendors.find(v => v.id === vendorId);
    return vendor?.name || 'Unknown Vendor';
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSize[product.id] || product.sizes?.[0] || 'M';
    onAddToCart(product, size);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map(product => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">👕</span>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{product.rating || 4.5}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Store className="h-3 w-3" />
                <span>{getVendorName(product.vendorId)}</span>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex items-center space-x-1">
                  {product.sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize[product.id] === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: size }))}
                      className={`h-6 w-6 p-0 text-xs ${
                        selectedSize[product.id] === size ? 'bg-pink-500' : ''
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              )}

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-pink-500">₹{product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 line-through">₹{(product.price * 1.2).toFixed(2)}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};