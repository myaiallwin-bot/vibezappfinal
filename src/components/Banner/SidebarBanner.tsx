import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ExternalLink } from 'lucide-react';

interface SidebarBannerProps {
  className?: string;
}

export const SidebarBanner: React.FC<SidebarBannerProps> = ({ className = '' }) => {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">Sponsored</Badge>
          <ExternalLink className="h-3 w-3 text-gray-400" />
        </div>
        
        <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <div className="text-white text-center p-4">
            <h3 className="font-bold text-lg mb-1">Special Offer!</h3>
            <p className="text-sm opacity-90">Get 30% off on selected items</p>
          </div>
        </div>
        
        <Button size="sm" className="w-full">
          Learn More
        </Button>
      </div>
    </Card>
  );
};