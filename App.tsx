import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Login } from './components/Auth/Login';
import { AdminDashboard } from './components/Admin/Dashboard';
import { VendorDashboard } from './components/Vendor/Dashboard';
import { CustomerMarketplace } from './components/Customer/Marketplace';
import { MensCollection } from './components/Customer/MensCollection';
import { WomensCollection } from './components/Customer/WomensCollection';
import { PWAInstallPrompt } from './components/PWA/InstallPrompt';
import { OfflineIndicator } from './components/PWA/OfflineIndicator';
import { BottomNavigation } from './components/Navigation/BottomNav';
import { TopNavigation } from './components/Navigation/TopNav';
import { CartDrawer } from './components/Cart/CartDrawer';

// PWA Registration
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              if (window.confirm('New version available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  }
};

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [currentPath, setCurrentPath] = useState('/');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    registerServiceWorker();

    // Network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA Install Prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold">Loading Vibez Marketplace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    if (user.role === 'super_admin') {
      return <AdminDashboard />;
    } else if (user.role === 'vendor') {
      return <VendorDashboard />;
    } else if (user.role === 'customer') {
      switch (currentPath) {
        case '/mens':
          return <MensCollection />;
        case '/womens':
          return <WomensCollection />;
        default:
          return <CustomerMarketplace />;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <PWAInstallPrompt onInstall={handleInstallClick} onDismiss={() => setShowInstallPrompt(false)} />
      )}
      
      {/* Offline Indicator */}
      {!isOnline && <OfflineIndicator />}
      
      {/* Main Content */}
      <div className="pb-16 md:pb-0">
        <TopNavigation 
          user={user} 
          onCartClick={handleCartClick}
          onMenuToggle={() => console.log('Menu toggle')}
          currentPath={currentPath}
          onNavigate={handleNavigate}
        />
        
        <main className="container mx-auto px-4 py-6">
          {renderContent()}
        </main>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation 
        user={user} 
        onNavigate={handleNavigate}
        currentPath={currentPath}
      />
      
      {/* Cart Drawer */}
      {user.role === 'customer' && (
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;