import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Edit, Trash2, TrendingUp, Package, DollarSign, Eye, Star, Percent, Grid, List, X } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { ProductGrid } from './ProductGrid';
import { ProductListView } from './ProductListView';
import { DiscountManager } from './DiscountManager';
import { VendorAnalytics } from './VendorAnalytics';
import { BannerMarketing } from './BannerMarketing';
import { mockProducts } from '../../data/mockData';

export const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add-product' | 'discounts' | 'analytics' | 'marketing'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState(mockProducts.filter(p => p.vendorId === 'vendor1'));

  const vendorStats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'approved').length,
    pendingProducts: products.filter(p => p.status === 'pending').length,
    totalRevenue: 456789,
    monthlyRevenue: 67890,
    averageRating: 4.3,
    totalViews: 125678,
    totalOrders: 2345,
    conversionRate: 2.3
  };

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      vendorId: 'vendor1',
      status: 'pending',
      views: 0,
      sales: 0,
      rating: 0,
      image: productData.images?.[0] || `https://placehold.co/300x400/3b82f6/ffffff?text=${encodeURIComponent(productData.name)}`
    };
    setProducts(prev => [...prev, newProduct]);
    setShowProductForm(false);
    setActiveTab('products');
    console.log('Product added successfully:', newProduct);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? { ...updatedProduct, image: updatedProduct.images?.[0] || p.image } : p)
    );
    setShowProductForm(false);
    setSelectedProduct(null);
    console.log('Product updated successfully:', updatedProduct);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      console.log('Product deleted:', productId);
    }
  };

  const handleDiscountUpdate = (productId: number, discount: any) => {
    setProducts(prev => 
      prev.map(p => p.id === productId ? { ...p, discount } : p)
    );
    console.log('Discount updated for product:', productId, discount);
  };

  // Custom Tab Component since Tabs might not be available
  const CustomTabs = ({ value, onValueChange, children }: any) => {
    return <div>{children}</div>;
  };

  const CustomTabsList = ({ children }: any) => {
    return (
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {children}
      </div>
    );
  };

  const CustomTabsTrigger = ({ value, activeTab, onClick, children }: any) => {
    return (
      <button
        onClick={() => onClick(value)}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeTab === value
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {children}
      </button>
    );
  };

  const CustomTabsContent = ({ value, activeTab, children }: any) => {
    if (value !== activeTab) return null;
    return <div>{children}</div>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-gray-600">Manage your products and track performance</p>
        </div>
        <Button 
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{vendorStats.totalProducts}</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{vendorStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+23% from last month</p>
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
                <p className="text-2xl font-bold text-yellow-600">{vendorStats.averageRating}</p>
                <p className="text-xs text-gray-600">Based on 234 reviews</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-600">{vendorStats.conversionRate}%</p>
                <p className="text-xs text-green-600">+0.5% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <CustomTabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <CustomTabsList>
          <CustomTabsTrigger value="overview" activeTab={activeTab} onClick={setActiveTab}>
            Overview
          </CustomTabsTrigger>
          <CustomTabsTrigger value="products" activeTab={activeTab} onClick={setActiveTab}>
            Products
          </CustomTabsTrigger>
          <CustomTabsTrigger value="add-product" activeTab={activeTab} onClick={setActiveTab}>
            Add Product
          </CustomTabsTrigger>
          <CustomTabsTrigger value="discounts" activeTab={activeTab} onClick={setActiveTab}>
            Discounts
          </CustomTabsTrigger>
          <CustomTabsTrigger value="analytics" activeTab={activeTab} onClick={setActiveTab}>
            Analytics
          </CustomTabsTrigger>
          <CustomTabsTrigger value="marketing" activeTab={activeTab} onClick={setActiveTab}>
            Marketing
          </CustomTabsTrigger>
        </CustomTabsList>

        <CustomTabsContent value="overview" activeTab={activeTab}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.slice(0, 5).map(product => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-gray-600">₹{product.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <Badge className={product.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {product.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => {
                        setSelectedProduct(null);
                        setShowProductForm(true);
                      }}
                    >
                      <Plus className="h-6 w-6 mb-2" />
                      <span>Add Product</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('discounts')}
                    >
                      <Percent className="h-6 w-6 mb-2" />
                      <span>Manage Discounts</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('analytics')}
                    >
                      <TrendingUp className="h-6 w-6 mb-2" />
                      <span>View Analytics</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('marketing')}
                    >
                      <Eye className="h-6 w-6 mb-2" />
                      <span>Marketing</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="products" activeTab={activeTab}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">My Products ({products.length})</h2>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <ProductGrid 
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onDiscountUpdate={handleDiscountUpdate}
              />
            ) : (
              <ProductListView 
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onDiscountUpdate={handleDiscountUpdate}
              />
            )}
          </div>
        </CustomTabsContent>

        <CustomTabsContent value="add-product" activeTab={activeTab}>
          <ProductForm 
            product={selectedProduct}
            onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setShowProductForm(false);
              setSelectedProduct(null);
              setActiveTab('products');
            }}
          />
        </CustomTabsContent>

        <CustomTabsContent value="discounts" activeTab={activeTab}>
          <DiscountManager 
            products={products}
            onDiscountUpdate={handleDiscountUpdate}
          />
        </CustomTabsContent>

        <CustomTabsContent value="analytics" activeTab={activeTab}>
          <VendorAnalytics products={products} />
        </CustomTabsContent>

        <CustomTabsContent value="marketing" activeTab={activeTab}>
          <BannerMarketing />
        </CustomTabsContent>
      </CustomTabs>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <ProductForm 
                product={selectedProduct}
                onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
                onCancel={() => {
                  setShowProductForm(false);
                  setSelectedProduct(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};