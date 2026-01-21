import { X, Minus, Plus, Trash2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-pink-50 to-purple-50 shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-lg font-black">YOUR CART</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-600 font-bold">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-2">Add some vibe to your cart! ✨</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="bg-white rounded-2xl p-4 shadow-lg border-2 border-pink-200">
                    <div className="flex space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-xl"
                      />
                      
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">{item.product.name}</h4>
                        <p className="text-lg font-black text-pink-600">₹{item.product.price.toLocaleString('en-IN')}</p>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-bold w-8 text-center bg-pink-100 rounded-full py-1">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t-4 border-purple-300 p-4 bg-white space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">TOTAL:</span>
                <span className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg">
                  CHECKOUT 🔥
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-pink-300 text-pink-600 hover:bg-pink-50 font-bold rounded-full"
                  onClick={clearCart}
                >
                  CLEAR CART
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};