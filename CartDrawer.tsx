import React from 'react';
import { useCart } from '../../context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Minus, Plus, Trash2, Store, Receipt, X } from 'lucide-react';
import { mockVendors } from '../../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, cartTotal, gstBreakdown } = useCart();

  const getVendorName = (vendorId: string) => {
    const vendor = mockVendors.find(v => v.id === vendorId);
    return vendor?.name || 'Unknown Vendor';
  };

  const groupItemsByVendor = () => {
    const grouped: { [vendorId: string]: typeof items } = {};
    items.forEach(item => {
      if (!grouped[item.vendorId]) {
        grouped[item.vendorId] = [];
      }
      grouped[item.vendorId].push(item);
    });
    return grouped;
  };

  const vendorGroups = groupItemsByVendor();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-600 font-bold">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(vendorGroups).map(([vendorId, vendorItems]) => (
                  <div key={vendorId} className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                      <Store className="h-4 w-4" />
                      <span>{getVendorName(vendorId)}</span>
                    </div>
                    {vendorItems.map(item => (
                      <Card key={item.id} className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">👕</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">Product #{item.productId}</h4>
                            <p className="text-xs text-gray-500">Size: {item.size}</p>
                            <p className="font-bold text-pink-500">₹{item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 p-0 text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST (9%):</span>
                  <span>₹{gstBreakdown.cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (9%):</span>
                  <span>₹{gstBreakdown.sgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-pink-500">₹{(cartTotal + gstBreakdown.cgst + gstBreakdown.sgst).toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold">
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};