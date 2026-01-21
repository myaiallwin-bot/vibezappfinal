import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Eye, Search, Filter, X, Check, Clock, Ban, Star, TrendingUp, Package, DollarSign } from 'lucide-react';
import { VendorForm } from './VendorForm';
import { VendorDetails } from './VendorDetails';

interface Vendor {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  businessType: string;
  category: string;
  gstNumber: string;
  panNumber: string;
  bankAccount: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  registrationDate: string;
  lastActive: string;
  totalProducts: number;
  totalRevenue: number;
  rating: number;
  commission: number;
  documents: {
    gstCertificate: string;
    panCard: string;
    addressProof: string;
    bankStatement: string;
    businessLicense: string;
  };
  socialLinks: {
    website: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  description: string;
  logo: string;
  banner: string;
}

export const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 'vendor1',
      businessName: 'Fashion Hub India',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@fashionhub.com',
      phone: '+91 9876543210',
      address: '123, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
      businessType: 'Proprietorship',
      category: 'clothing',
      gstNumber: '29AAAPL1234C1ZV',
      panNumber: 'AAAPL1234C',
      bankAccount: {
        accountNumber: '1234567890123456',
        bankName: 'State Bank of India',
        ifscCode: 'SBIN0001234',
        accountHolderName: 'Rajesh Kumar'
      },
      status: 'active',
      registrationDate: '2024-01-15',
      lastActive: '2024-12-20',
      totalProducts: 156,
      totalRevenue: 2456789,
      rating: 4.5,
      commission: 10,
      documents: {
        gstCertificate: 'verified',
        panCard: 'verified',
        addressProof: 'verified',
        bankStatement: 'verified',
        businessLicense: 'verified'
      },
      socialLinks: {
        website: 'https://fashionhub.com',
        instagram: '@fashionhub_india',
        facebook: 'FashionHubIndia',
        twitter: '@fashionhub'
      },
      description: 'Leading fashion retailer specializing in ethnic and western wear',
      logo: 'https://placehold.co/100x100/3b82f6/ffffff?text=FH',
      banner: 'https://placehold.co/800x200/3b82f6/ffffff?text=Fashion+Hub+India'
    },
    {
      id: 'vendor2',
      businessName: 'Style Studio',
      contactPerson: 'Priya Sharma',
      email: 'priya@stylestudio.com',
      phone: '+91 9876543211',
      address: '456, Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560025',
      country: 'India',
      businessType: 'Private Limited',
      category: 'accessories',
      gstNumber: '29AAAPL5678C1ZV',
      panNumber: 'AAAPL5678C',
      bankAccount: {
        accountNumber: '2345678901234567',
        bankName: 'HDFC Bank',
        ifscCode: 'HDFC0001234',
        accountHolderName: 'Style Studio Pvt Ltd'
      },
      status: 'pending',
      registrationDate: '2024-02-20',
      lastActive: '2024-12-19',
      totalProducts: 89,
      totalRevenue: 1234567,
      rating: 4.2,
      commission: 12,
      documents: {
        gstCertificate: 'pending',
        panCard: 'verified',
        addressProof: 'verified',
        bankStatement: 'pending',
        businessLicense: 'verified'
      },
      socialLinks: {
        website: 'https://stylestudio.com',
        instagram: '@stylestudio_official',
        facebook: 'StyleStudio',
        twitter: '@stylestudio'
      },
      description: 'Premium accessories and jewelry store',
      logo: 'https://placehold.co/100x100/ec4899/ffffff?text=SS',
      banner: 'https://placehold.co/800x200/ec4899/ffffff?text=Style+Studio'
    }
  ]);

  const [showVendorForm, setShowVendorForm] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showVendorDetails, setShowVendorDetails] = useState(false);

  const handleAddVendor = (vendorData: Partial<Vendor>) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: `vendor${Date.now()}`,
      status: 'pending',
      registrationDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      totalProducts: 0,
      totalRevenue: 0,
      rating: 0,
      commission: 10
    } as Vendor;

    setVendors(prev => [...prev, newVendor]);
    setShowVendorForm(false);
    console.log('Vendor added successfully:', newVendor);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowVendorForm(true);
  };

  const handleUpdateVendor = (updatedVendor: Partial<Vendor>) => {
    setVendors(prev => 
      prev.map(v => v.id === updatedVendor.id ? { ...v, ...updatedVendor } : v)
    );
    setShowVendorForm(false);
    setSelectedVendor(null);
    console.log('Vendor updated successfully:', updatedVendor);
  };

  const handleDeleteVendor = (vendorId: string) => {
    if (window.confirm('Are you sure you want to delete this vendor? This action cannot be undone.')) {
      setVendors(prev => prev.filter(v => v.id !== vendorId));
      console.log('Vendor deleted:', vendorId);
    }
  };

  const handleStatusChange = (vendorId: string, status: Vendor['status']) => {
    setVendors(prev => 
      prev.map(v => v.id === vendorId ? { ...v, status } : v)
    );
    console.log('Vendor status updated:', vendorId, status);
  };

  const handleViewDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowVendorDetails(true);
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: Vendor['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Vendor['status']) => {
    switch (status) {
      case 'active': return <Check className="h-3 w-3" />;
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'suspended': return <Ban className="h-3 w-3" />;
      case 'rejected': return <X className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendor Management</h1>
          <p className="text-gray-600">Manage vendors and their business details</p>
        </div>
        <Button 
          onClick={() => {
            setSelectedVendor(null);
            setShowVendorForm(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Vendor</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold">{vendors.length}</p>
                <p className="text-xs text-green-600">+3 this month</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-green-600">
                  {vendors.filter(v => v.status === 'active').length}
                </p>
                <p className="text-xs text-gray-600">Currently selling</p>
              </div>
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {vendors.filter(v => v.status === 'pending').length}
                </p>
                <p className="text-xs text-gray-600">Awaiting review</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{vendors.reduce((sum, v) => sum + v.totalRevenue, 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-1 h-1 bg-current"></div>
                  <div className="w-1 h-1 bg-current"></div>
                  <div className="w-1 h-1 bg-current"></div>
                  <div className="w-1 h-1 bg-current"></div>
                </div>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <div className="space-y-1">
                  <div className="w-4 h-0.5 bg-current"></div>
                  <div className="w-4 h-0.5 bg-current"></div>
                  <div className="w-4 h-0.5 bg-current"></div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor List/Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={vendor.logo}
                        alt={vendor.businessName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/48x48/3b82f6/ffffff?text=${vendor.businessName.charAt(0)}`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{vendor.businessName}</h3>
                      <p className="text-sm text-gray-600">{vendor.contactPerson}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(vendor.status)}>
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(vendor.status)}
                      <span>{vendor.status}</span>
                    </span>
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Email:</span>
                    <span className="truncate ml-2">{vendor.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Phone:</span>
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Products:</span>
                    <span>{vendor.totalProducts}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium">₹{vendor.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewDetails(vendor)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEditVendor(vendor)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteVendor(vendor.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm">Vendor</th>
                    <th className="text-left p-4 font-medium text-sm">Contact</th>
                    <th className="text-left p-4 font-medium text-sm">Category</th>
                    <th className="text-left p-4 font-medium text-sm">Products</th>
                    <th className="text-left p-4 font-medium text-sm">Revenue</th>
                    <th className="text-left p-4 font-medium text-sm">Rating</th>
                    <th className="text-left p-4 font-medium text-sm">Status</th>
                    <th className="text-left p-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.map(vendor => (
                    <tr key={vendor.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={vendor.logo}
                              alt={vendor.businessName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/40x40/3b82f6/ffffff?text=${vendor.businessName.charAt(0)}`;
                              }}
                            />
                          </div>
                          <div>
                            <p className="font-medium">{vendor.businessName}</p>
                            <p className="text-sm text-gray-600">{vendor.contactPerson}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">{vendor.email}</p>
                          <p className="text-sm text-gray-600">{vendor.phone}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{vendor.category}</Badge>
                      </td>
                      <td className="p-4">{vendor.totalProducts}</td>
                      <td className="p-4">₹{vendor.totalRevenue.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{vendor.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Select
                          value={vendor.status}
                          onValueChange={(value) => handleStatusChange(vendor.id, value as Vendor['status'])}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(vendor)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditVendor(vendor)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteVendor(vendor.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vendor Form Modal */}
      {showVendorForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <VendorForm
              vendor={selectedVendor}
              onSubmit={selectedVendor ? handleUpdateVendor : handleAddVendor}
              onCancel={() => {
                setShowVendorForm(false);
                setSelectedVendor(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Vendor Details Modal */}
      {showVendorDetails && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <VendorDetails
              vendor={selectedVendor}
              onClose={() => {
                setShowVendorDetails(false);
                setSelectedVendor(null);
              }}
              onEdit={() => {
                setShowVendorDetails(false);
                handleEditVendor(selectedVendor);
              }}
              onDelete={() => {
                setShowVendorDetails(false);
                handleDeleteVendor(selectedVendor.id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};