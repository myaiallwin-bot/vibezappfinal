import { ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-black border-b-4 border-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              VIBEZ
            </h1>
            <span className="text-xs text-pink-500 font-bold">SHOP</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-xs text-pink-500 font-bold">✨</span>
              <span className="text-xs text-gray-400">GENZ APPROVED</span>
              <span className="text-xs text-pink-500 font-bold">✨</span>
            </div>
            
            <Button
              onClick={onCartClick}
              className="relative bg-pink-500 hover:bg-pink-600 text-black font-bold border-2 border-pink-300 rounded-full transition-all hover:scale-105"
              size="sm"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};