import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Eye, Star, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { mockVendors } from '../../data/mockData';

interface BannerPackage {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
  priority: number;
  isActive: boolean;
}

interface BannerRequest {
  id: string;
  vendorId: string;
  vendorName: string;
  packageName: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerImage: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'expired';
  startDate: string;
  endDate: string;
  amount: number;
  views: number;
  clicks: number;
}

export const BannerManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'packages' | 'requests' | 'analytics'>('packages');
  const [selectedRequest, setSelectedRequest] = useState<BannerRequest | null>(null);

  const bannerPackages: BannerPackage[] = [
    {
      id: 'basic',
      name: 'Basic Banner',
      price: 2999,
      duration: 7,
      features: ['Homepage placement', 'Basic analytics', 'Standard size'],
      priority: 1,
      isActive: true
    },
    {
      id: 'premium',
      name: 'Premium Banner',
      price: 6999,
      duration: 14,
      features: ['Homepage placement', 'Category pages', 'Advanced analytics', 'Large size'],
      priority: 2,
      isActive: true
    },
    {
      id: 'platinum',
      name: 'Platinum Banner',
      price: 14999,
      duration: 30,
      features: ['All pages placement', 'Premium positioning', 'Real-time analytics', 'Video support', 'Custom size'],
      priority: 3,
      isActive: true
    }
  ];

  const [bannerRequests, setBannerRequests] = useState<BannerRequest[]>([
    {
      id: 'req1',
      vendorId: 'vendor1',
      vendorName: 'Fashion Hub',
      packageName: 'Premium Banner',
      bannerTitle: 'Summer Sale - Up to 50% Off',
      bannerDescription: 'Get amazing discounts on our summer collection',
      bannerImage: '/images/banner1.jpg',
      status: 'pending',
      startDate: '2024-01-15',
      endDate: '2024-01-29',
      amount: 6999,
      views: 0,
      clicks: 0
    },
    {
      id: 'req2',
      vendorId: 'vendor2',
      vendorName: 'Style Studio',
      packageName: 'Basic Banner',
      bannerTitle: 'New Collection Launch',
      bannerDescription: 'Check out our latest fashion trends',
      bannerImage: '/images/banner2.jpg',
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-01-17',
      amount: 2999,
      views: 12500,
      clicks: 890
    },
    {
      id: 'req3',
      vendorId: 'vendor3',
      vendorName: 'Trend Zone',
      packageName: 'Platinum Banner',
      bannerTitle: 'Mega Fashion Festival',
      bannerDescription: 'Biggest sale of the year with exclusive offers',
      bannerImage: '/images/banner3.jpg',
      status: 'active',
      startDate: '2024-01-05',
      endDate: '2024-02-04',
      amount: 14999,
      views: 45600,
      clicks: 3200
    }
  ]);

  const handleApproveRequest = (requestId: string) => {
    setBannerRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'active' as const }
          : req
      )
    );
  };

  const handleRejectRequest = (requestId: string) => {
    setBannerRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
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

  const totalRevenue = bannerRequests
    .filter(req => req.status === 'active' || req.status === 'expired')
    .reduce((sum, req) => sum + req.amount, 0);

  const activeBanners = bannerRequests.filter(req => req.status === 'active').length;
  const pendingRequests = bannerRequests.filter(req => req.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Banner Management</h1>
        <p className="text-gray-600">Manage vendor marketing banners and pricing</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Banners</p>
                <p className="text-2xl font-bold text-blue-600">{activeBanners}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-600">{pendingRequests}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">
                  {bannerRequests.reduce((sum, req) => sum + req.views, 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
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
          Banner Packages
        </Button>
        <Button
          variant={activeTab === 'requests' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('requests')}
          className="flex-1"
        >
          Vendor Requests
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('analytics')}
          className="flex-1"
        >
          Analytics
        </Button>
      </div>

      {/* Banner Packages */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bannerPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative ${pkg.priority === 3 ? 'border-purple-500 border-2' : ''}`}>
              {pkg.priority === 3 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {pkg.name}
                  <div className="flex items-center space-x-1">
                    {[...Array(pkg.priority)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </CardTitle>
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
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant={pkg.isActive ? "destructive" : "default"} 
                    size="sm" 
                    className="flex-1"
                  >
                    {pkg.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vendor Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {bannerRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold">{request.bannerTitle}</h3>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{request.bannerDescription}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Vendor:</span>
                        <p className="font-medium">{request.vendorName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Package:</span>
                        <p className="font-medium">{request.packageName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <p className="font-medium">{request.startDate} to {request.endDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <p className="font-medium text-green-600">₹{request.amount.toLocaleString()}</p>
                      </div>
                    </div>

                    {(request.status === 'active' || request.status === 'expired') && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span>Views: {request.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span>Clicks: {request.clicks.toLocaleString()}</span>
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
                    
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="w-full bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Package</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bannerPackages.map((pkg) => {
                  const revenue = bannerRequests
                    .filter(req => req.packageName === pkg.name && (req.status === 'active' || req.status === 'expired'))
                    .reduce((sum, req) => sum + req.amount, 0);
                  
                  return (
                    <div key={pkg.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {pkg.priority}
                        </div>
                        <div>
                          <p className="font-medium">{pkg.name}</p>
                          <p className="text-sm text-gray-600">{pkg.duration} days</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          {bannerRequests.filter(req => req.packageName === pkg.name).length} requests
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bannerRequests
                  .filter(req => req.status === 'active')
                  .sort((a, b) => b.clicks - a.clicks)
                  .slice(0, 5)
                  .map((request, index) => (
                    <div key={request.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{request.bannerTitle}</p>
                        <p className="text-xs text-gray-600">{request.vendorName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{request.clicks.toLocaleString()} clicks</p>
                        <p className="text-xs text-gray-600">{request.views.toLocaleString()} views</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};