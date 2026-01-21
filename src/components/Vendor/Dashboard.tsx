import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ShoppingBag, TrendingUp, Package, DollarSign, Star, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VendorDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = {
    totalProducts: 12,
    activeProducts: 8,
    pendingOrders: 5,
    totalRevenue: 45678,
    monthlyRevenue: 12345,
    averageRating: 4.6,
    totalViews: 2341
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-pink-50 hover:bg-pink-100 rounded-lg text-center transition-colors">
                <Package className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                <span className="text-sm font-medium">Add Product</span>
              </button>
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
                <ShoppingBag className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <span className="text-sm font-medium">View Orders</span>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
                <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                <DollarSign className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <span className="text-sm font-medium">Payouts</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Product viewed</p>
                    <p className="text-xs text-gray-600">Classic Cotton T-Shirt</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">New order</p>
                    <p className="text-xs text-gray-600">Order #1234</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">15 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">New review</p>
                    <p className="text-xs text-gray-600">5 stars on Slim Fit Jeans</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};