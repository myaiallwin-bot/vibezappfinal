import React from 'react';
import { Button } from '../ui/button';
import { Home, ShoppingBag, User, Store, Settings } from 'lucide-react';
import { User as UserType } from '../../types';

interface BottomNavigationProps {
  user: UserType;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ user, onNavigate, currentPath }) => {
  const getNavItems = () => {
    if (user.role === 'customer') {
      return [
        { icon: Home, label: 'Home', path: '/' },
        { icon: ShoppingBag, label: 'Products', path: '/products' },
        { icon: ShoppingBag, label: 'Cart', path: '/cart' },
        { icon: User, label: 'Profile', path: '/profile' }
      ];
    } else if (user.role === 'vendor') {
      return [
        { icon: Home, label: 'Dashboard', path: '/vendor' },
        { icon: ShoppingBag, label: 'Products', path: '/vendor/products' },
        { icon: ShoppingBag, label: 'Orders', path: '/vendor/orders' },
        { icon: User, label: 'Profile', path: '/vendor/profile' }
      ];
    } else {
      return [
        { icon: Home, label: 'Dashboard', path: '/admin' },
        { icon: Store, label: 'Vendors', path: '/admin/vendors' },
        { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' }
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                isActive ? 'text-pink-500' : 'text-gray-600'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};