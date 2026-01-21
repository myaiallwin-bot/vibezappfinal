import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { Bell, ShoppingCart, Menu, LogOut, Sparkles, Shirt, Heart } from 'lucide-react';
import { User } from '../../types';

interface TopNavigationProps {
  user: User;
  onMenuToggle?: () => void;
  onCartClick?: () => void;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  user, 
  onMenuToggle, 
  onCartClick,
  currentPath,
  onNavigate 
}) => {
  const { logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="md:hidden" onClick={onMenuToggle}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <h1 className="text-xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                VIBEZ
              </h1>
            </div>
          </div>

          {/* Navigation for Customers */}
          {user.role === 'customer' && (
            <nav className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('/')}
                className={currentPath === '/' ? 'text-pink-500' : 'text-gray-600'}
              >
                All Products
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('/mens')}
                className={currentPath === '/mens' ? 'text-blue-500' : 'text-gray-600'}
              >
                <Shirt className="h-4 w-4 mr-1" />
                Men
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('/womens')}
                className={currentPath === '/womens' ? 'text-pink-500' : 'text-gray-600'}
              >
                <Heart className="h-4 w-4 mr-1" />
                Women
              </Button>
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {user.role === 'customer' && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            )}
            
            {user.role === 'customer' && (
              <Button variant="ghost" size="sm" className="relative" onClick={onCartClick}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};