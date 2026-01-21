import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Edit, Trash2, Eye, Star, Package, TrendingUp, Percent } from 'lucide-react';

interface ProductGridProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (productId: number) => void;
  onDiscountUpdate: (productId: number, discount: any) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onEdit, 
  onDelete, 
  onDiscountUpdate 
}) => {
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [discountData, setDiscountData] = useState({
    type: 'percentage',
    value: '',
    startDate: '',
    endDate: '',
    minQuantity: 1
  });

  const handleDiscountClick = (product: any) => {
    setSelectedProduct(product);
    setDiscountData({
      type: product.discount?.type || 'percentage',
      value: product.discount?.value || '',
      startDate: product.discount?.startDate || '',
      endDate: product.discount?.endDate || '',
      minQuantity: product.discount?.minQuantity || 1
    });
    setShowDiscountModal(true);
  };

  const handleSaveDiscount = () => {
    if (selectedProduct && discountData.value) {
      onDiscountUpdate(selectedProduct.id, {
        ...discountData,
        value: parseFloat(discountData.value)
      });
      setShowDiscountModal(false);
      setSelectedProduct(null);
    }
  };

  const calculateDiscountedPrice = (product: any) => {
    if (!product.discount) return product.price;
    
    if (product.discount.type === 'percentage') {
      return product.price * (1 - product.discount.value / 100);
    } else {
      return Math.max(0, product.price - product.discount.value);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => {
          const discountedPrice = calculateDiscountedPrice(product);
          const hasDiscount = product.discount && product.discount.value > 0;
          
          return (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/300x400/3b82f6/ffffff?text=${encodeURIComponent(product.name)}`;
                      }}
                    />
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </div>
                  
                  {/* Discount Badge */}
                  {hasDiscount && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white">
                        {product.discount.type === 'percentage' 
                          ? `${product.discount.value}% OFF`
                          : `₹${product.discount.value} OFF`
                        }
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center space-x-2">
                    {hasDiscount ? (
                      <>
                        <p className="text-lg font-bold text-green-600">₹{discountedPrice.toFixed(2)}</p>
                        <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Stock: {product.stock || 0}</span>
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Views: {product.views || 0}</span>
                    <span>Sales: {product.sales || 0}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => onEdit(product)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleDiscountClick(product)}
                    >
                      <Percent className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-red-600 hover:text-red-700"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Discount Modal */}
      {showDiscountModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Manage Discount - {selectedProduct.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Discount Type</Label>
                <select
                  value={discountData.type}
                  onChange={(e) => setDiscountData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                </select>
              </div>
              
              <div>
                <Label>Discount Value</Label>
                <Input
                  type="number"
                  value={discountData.value}
                  onChange={(e) => setDiscountData(prev => ({ ...prev, value: e.target.value }))}
                  placeholder={discountData.type === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                  min="0"
                  max={discountData.type === 'percentage' ? '100' : selectedProduct.price}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={discountData.startDate}
                    onChange={(e) => setDiscountData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={discountData.endDate}
                    onChange={(e) => setDiscountData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label>Minimum Quantity</Label>
                <Input
                  type="number"
                  value={discountData.minQuantity}
                  onChange={(e) => setDiscountData(prev => ({ ...prev, minQuantity: parseInt(e.target.value) }))}
                  min="1"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDiscountModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleSaveDiscount}
                  disabled={!discountData.value}
                >
                  Apply Discount
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};