import React from 'react';
import { Button } from '../ui/button';
import { X, Download, Smartphone } from 'lucide-react';

interface PWAInstallPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onInstall, onDismiss }) => {
  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-2xl border-2 border-pink-200 p-4 z-50 animate-bounce-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Install Vibez App</h3>
            <p className="text-sm text-gray-600">Get the best experience!</p>
          </div>
        </div>
        <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span>Works offline</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span>Push notifications</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span>Faster loading</span>
        </div>
      </div>
      
      <Button
        onClick={onInstall}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full"
      >
        <Download className="h-4 w-4 mr-2" />
        Install App
      </Button>
    </div>
  );
};