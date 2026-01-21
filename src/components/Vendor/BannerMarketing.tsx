import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Star, TrendingUp, Eye, Calendar, DollarSign, Zap, Crown, Gem } from 'lucide-react';

interface BannerPackage {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  priority: number;
  icon: React.ReactNode;
  popular?: boolean;
}

interface BannerRequest {
  id: string;
  packageName: string;
  bannerTitle: string;
  bannerDescription: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'expired';
  startDate: string;
  endDate: string;
  amount: number;
  views: number;
  clicks: number;
}

export const BannerMarketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'packages' | 'my-banners' | 'create'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [bannerData, setBannerData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const bannerPackages: BannerPackage[] = [
    {
      id: 'basic',
      name: 'Basic Banner',
      price: 2999,
      duration: 7,
      features: ['Homepage placement', 'Basic analytics', 'Standard size (728x90)'],
      priority: 1,
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: 'premium',
      name: 'Premium Banner',
      price: 6999,
      duration: 14,
      features: ['Homepage placement', 'Category pages', 'Advanced analytics', 'Large size (1200x300)'],
      priority: 2,
      icon: <Crown className="h-6 w-6" />,
      popular: true
    },
    {
      id: 'platinum',
      name: 'Platinum Banner',
      price: 14999,
      duration: 30,
      features: ['All pages placement', 'Premium positioning', 'Real-time analytics', 'Video support', 'Custom size'],
      priority: 3,
      icon: <Gem className="h-6 w-6" />
    }
  ];

  const [myBanners, setMyBanners] = useState<BannerRequest[]>([
    {
      id: 'banner1',
      packageName: 'Premium Banner',
      bannerTitle: 'Summer Sale - Up to 50% Off',
      bannerDescription: 'Get amazing discounts on our summer collection',
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-01-24',
      amount: 6999,
      views: 12500,
      clicks: 890
    },
    {
      id: 'banner2',
      packageName: 'Basic Banner',
      bannerTitle: 'New Collection Launch',
      bannerDescription: 'Check out our latest fashion trends',
      status: 'pending',
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      amount: 2999,
      views: 0,
      clicks: 0
    }
  ]);

  const handleCreateBanner = () => {
    const pkg = bannerPackages.find(p => p.id === selectedPackage);
    if (!pkg || !bannerData.title || !bannerData.description) return;

    const newBanner: BannerRequest = {
      id: `banner${Date.now()}`,
      packageName: pkg.name,
      bannerTitle: bannerData.title,
      bannerDescription: bannerData.description,
      status: 'pending',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + pkg.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: pkg.price,
      views: 0,
      clicks: 0
    };

    setMyBanners(prev => [...prev, newBanner]);
    setBannerData({ title: '', description: '', image: '' });
    setSelectedPackage('');
    setActiveTab('my-banners');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSpent = myBanners
    .filter(banner => banner.status === 'active' || banner.status === 'expired')
    .reduce((sum, banner) => sum + banner.amount, 0);

  const totalViews = myBanners.reduce((sum, banner) => sum + banner.views, 0);
  const totalClicks = myBanners.reduce((sum, banner) => sum + banner.clicks, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Banner Marketing</h1>
        <p className="text-gray-600">Promote your products with premium banner placements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-purple-600">₹{totalSpent.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-green-600">{totalClicks.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Banners</p>
                <p className="text-2xl font-bold text-orange-600">
                  {myBanners.filter(b => b.status === 'active').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'packages' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('packages')}
          className="flex-1"
        >
          Choose Package
        </Button>
        <Button
          variant={activeTab === 'my-banners' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('my-banners')}
          className="flex-1"
        >
          My Banners
        </Button>
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('create')}
          className="flex-1"
        >
          Create Banner
        </Button>
      </div>

      {/* Banner Packages */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bannerPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                pkg.popular ? 'border-purple-500 border-2 scale-105' : ''
              } ${selectedPackage === pkg.id ? 'ring-2 ring-purple-500' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                    {pkg.icon}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(pkg.priority)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle>{pkg.name}</CardTitle>
                <div className="text-3xl font-bold">₹{pkg.price.toLocaleString()}</div>
                <p className="text-sm text-gray-600">For {pkg.duration} days</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPackage(pkg.id);
                    setActiveTab('create');
                  }}
                >
                  Select Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* My Banners */}
      {activeTab === 'my-banners' && (
        <div className="space-y-4">
          {myBanners.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Eye className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Banners Yet</h3>
                <p className="text-gray-600 mb-4">Create your first banner to start promoting your products</p>
                <Button onClick={() => setActiveTab('packages')}>
                  Create Your First Banner
                </Button>
              </CardContent>
            </Card>
          ) : (
            myBanners.map((banner) => (
              <Card key={banner.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold">{banner.bannerTitle}</h3>
                        <Badge className={getStatusColor(banner.status)}>
                          {banner.status.charAt(0).toUpperCase() + banner.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{banner.bannerDescription}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Package:</span>
                          <p className="font-medium">{banner.packageName}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <p className="font-medium">{banner.startDate} to {banner.endDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Cost:</span>
                          <p className="font-medium text-purple-600">₹{banner.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">CTR:</span>
                          <p className="font-medium text-green-600">
                            {banner.views > 0 ? ((banner.clicks / banner.views) * 100).toFixed(2) : 0}%
                          </p>
                        </div>
                      </div>

                      {(banner.status === 'active' || banner.status === 'expired') && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-blue-500" />
                              <span>Views: {banner.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              <span>Clicks: {banner.clicks.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 space-y-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      
                      {banner.status === 'pending' && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Create Banner */}
      {activeTab === 'create' && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Banner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="package">Select Package</Label>
                <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {bannerPackages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id}>
                        {pkg.name} - ₹{pkg.price.toLocaleString()} ({pkg.duration} days)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Package Details</Label>
                {selectedPackage && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    {(() => {
                      const pkg = bannerPackages.find(p => p.id === selectedPackage);
                      return pkg ? (
                        <div>
                          <p className="font-medium">{pkg.name}</p>
                          <p className="text-sm text-gray-600">₹{pkg.price.toLocaleString()} for {pkg.duration} days</p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="title">Banner Title</Label>
              <Input
                id="title"
                placeholder="Enter your banner title"
                value={bannerData.title}
                onChange={(e) => setBannerData(prev => ({ ...prev, title: e.target.value }))}
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-1">
                {bannerData.title.length}/100 characters
              </p>
            </div>

            <div>
              <Label htmlFor="description">Banner Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your promotion or offer"
                value={bannerData.description}
                onChange={(e) => setBannerData(prev => ({ ...prev, description: e.target.value }))}
                maxLength={300}
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">
                {bannerData.description.length}/300 characters
              </p>
            </div>

            <div>
              <Label htmlFor="image">Banner Image</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-gray-400 mb-2">
                  <Plus className="h-8 w-8 mx-auto" />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG up to 10MB (Recommended: 1200x300px)
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleCreateBanner}
                disabled={!selectedPackage || !bannerData.title || !bannerData.description}
                className="flex-1"
              >
                Submit for Approval
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setBannerData({ title: '', description: '', image: '' });
                  setSelectedPackage('');
                }}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};