export interface User {
  id: string;
  email: string;
  role: 'super_admin' | 'vendor' | 'customer';
  name: string;
  phone?: string;
  vendorId?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  vendorId: string;
  status: 'approved' | 'pending' | 'rejected';
  sizes?: string[];
  rating?: number;
  description?: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  status: 'approved' | 'pending' | 'rejected';
  commission: number;
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  products: Product[];
}

export interface CartItem {
  id: string;
  productId: number;
  vendorId: string;
  quantity: number;
  size: string;
  price: number;
}