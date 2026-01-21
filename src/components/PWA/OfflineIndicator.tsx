import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white px-4 py-3 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <WifiOff className="h-5 w-5" />
          <span className="font-medium">You're offline. Some features may be limited.</span>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="text-sm">Retry</span>
        </button>
      </div>
    </div>
  );
};