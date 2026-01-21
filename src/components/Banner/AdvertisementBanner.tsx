import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, ChevronLeft, ChevronRight, Eye, TrendingUp } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  vendorId: string;
  vendorName: string;
  packageName: string;
  priority: number;
  link?: string;
  views: number;
  clicks: number;
}

interface AdvertisementBannerProps {
  position: 'homepage' | 'category' | 'product' | 'sidebar';
  className?: string;
}

export const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({ 
  position, 
  className = '' 
}) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Mock banner data - in real app, this would come from API
  const banners: Banner[] = [
    {
      id: 'banner1',
      title: 'Summer Sale - Up to 50% Off',
      description: 'Get amazing discounts on our summer collection',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
      vendorId: 'vendor1',
      vendorName: 'Fashion Hub',
      packageName: 'Premium Banner',
      priority: 2,
      link: '/vendor/fashion-hub',
      views: 12500,
      clicks: 890
    },
    {
      id: 'banner2',
      title: 'New Collection Launch',
      description: 'Check out our latest fashion trends',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=300&fit=crop',
      vendorId: 'vendor2',
      vendorName: 'Style Studio',
      packageName: 'Basic Banner',
      priority: 1,
      link: '/vendor/style-studio',
      views: 8900,
      clicks: 456
    },
    {
      id: 'banner3',
      title: 'Mega Fashion Festival',
      description: 'Biggest sale of the year with exclusive offers',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=300&fit=crop',
      vendorId: 'vendor3',
      vendorName: 'Trend Zone',
      packageName: 'Platinum Banner',
      priority: 3,
      link: '/vendor/trend-zone',
      views: 45600,
      clicks: 3200
    }
  ];

  // Filter banners based on position and priority
  const getBannersForPosition = () => {
    return banners.filter(banner => {
      // In real app, this would check banner placement settings
      return position === 'homepage' || banner.priority >= 2;
    }).sort((a, b) => b.priority - a.priority);
  };

  const activeBanners = getBannersForPosition();

  useEffect(() => {
    if (activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const handleBannerClick = (banner: Banner) => {
    // Track click analytics
    console.log(`Banner clicked: ${banner.id}`);
    
    // Navigate to vendor page or product
    if (banner.link) {
      window.location.href = banner.link;
    }
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  if (!isVisible || activeBanners.length === 0) {
    return null;
  }

  const currentBanner = activeBanners[currentBannerIndex];

  const getBannerSize = () => {
    switch (position) {
      case 'homepage':
        return 'h-64 md:h-80';
      case 'category':
        return 'h-48 md:h-56';
      case 'product':
        return 'h-40 md:h-48';
      case 'sidebar':
        return 'h-32 w-full';
      default:
        return 'h-64 md:h-80';
    }
  };

  return (
    <Card className={`relative overflow-hidden ${getBannerSize()} ${className}`}>
      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-20 bg-white/80 hover:bg-white"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Banner Content */}
      <div 
        className="relative h-full cursor-pointer group"
        onClick={() => handleBannerClick(currentBanner)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient if image fails
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center p-6 md:p-8">
          <div className="max-w-lg">
            {/* Vendor Badge */}
            <Badge className="mb-3 bg-white/20 text-white border-white/30">
              {currentBanner.vendorName}
            </Badge>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentBanner.title}
            </h2>

            {/* Description */}
            <p className="text-white/90 text-sm md:text-base mb-4">
              {currentBanner.description}
            </p>

            {/* CTA Button */}
            <Button className="bg-white text-black hover:bg-gray-100 group-hover:scale-105 transition-transform">
              Shop Now
            </Button>
          </div>
        </div>

        {/* Analytics Badge (visible on hover) */}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center space-x-2">
            <Eye className="h-3 w-3" />
            <span>{currentBanner.views.toLocaleString()}</span>
            <TrendingUp className="h-3 w-3" />
            <span>{currentBanner.clicks.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (only if multiple banners) */}
      {activeBanners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-10"
            onClick={handlePrevBanner}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-10"
            onClick={handleNextBanner}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentBannerIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentBannerIndex(index)}
              />
            ))}
          </div>
        </>
      )}

      {/* Ad Badge */}
      <div className="absolute top-2 left-2">
        <Badge variant="secondary" className="text-xs">
          Ad
        </Badge>
      </div>
    </Card>
  );
};