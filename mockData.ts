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

export const mockVendors: Vendor[] = [
  {
    id: 'vendor1',
    name: 'Fashion Hub',
    email: 'vendor1@example.com',
    status: 'approved',
    commission: 10,
    subscriptionPlan: 'premium',
    products: []
  },
  {
    id: 'vendor2',
    name: 'Style Studio',
    email: 'vendor2@example.com',
    status: 'approved',
    commission: 12,
    subscriptionPlan: 'basic',
    products: []
  },
  {
    id: 'vendor3',
    name: 'Trend Zone',
    email: 'vendor3@example.com',
    status: 'pending',
    commission: 8,
    subscriptionPlan: 'enterprise',
    products: []
  }
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Classic Cotton T-Shirt',
    price: 499,
    image: '/images/tshirt1.jpg',
    category: 'tops',
    vendorId: 'vendor1',
    status: 'approved',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    description: 'Comfortable cotton t-shirt for everyday wear'
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    price: 1299,
    image: '/images/jeans1.jpg',
    category: 'bottoms',
    vendorId: 'vendor1',
    status: 'approved',
    sizes: ['28', '30', '32', '34'],
    rating: 4.7,
    description: 'Modern slim fit jeans with stretch'
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 2499,
    image: '/images/shoes1.jpg',
    category: 'shoes',
    vendorId: 'vendor2',
    status: 'approved',
    sizes: ['7', '8', '9', '10'],
    rating: 4.8,
    description: 'Comfortable running shoes for athletes'
  },
  {
    id: 4,
    name: 'Leather Wallet',
    price: 899,
    image: '/images/wallet1.jpg',
    category: 'accessories',
    vendorId: 'vendor2',
    status: 'approved',
    sizes: ['One Size'],
    rating: 4.3,
    description: 'Genuine leather wallet with multiple compartments'
  },
  {
    id: 5,
    name: 'Summer Dress',
    price: 1599,
    image: '/images/dress1.jpg',
    category: 'tops',
    vendorId: 'vendor3',
    status: 'pending',
    sizes: ['S', 'M', 'L'],
    rating: 4.6,
    description: 'Light and breezy summer dress'
  },
  {
    id: 6,
    name: 'Sports Jacket',
    price: 2999,
    image: '/images/jacket1.jpg',
    category: 'tops',
    vendorId: 'vendor1',
    status: 'approved',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    description: 'Waterproof sports jacket for outdoor activities'
  },
  {
    id: 7,
    name: 'Casual Shorts',
    price: 799,
    image: '/images/shorts1.jpg',
    category: 'bottoms',
    vendorId: 'vendor2',
    status: 'approved',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.2,
    description: 'Comfortable casual shorts for summer'
  },
  {
    id: 8,
    name: 'Sunglasses',
    price: 599,
    image: '/images/sunglasses1.jpg',
    category: 'accessories',
    vendorId: 'vendor3',
    status: 'approved',
    sizes: ['One Size'],
    rating: 4.4,
    description: 'UV protection sunglasses with stylish design'
  }
];

export const mockUsers = [
  {
    id: '1',
    email: 'admin@vibez.com',
    password: 'admin123',
    role: 'super_admin' as const,
    name: 'Super Admin',
    phone: '+919876543210'
  },
  {
    id: '2',
    email: 'vendor1@vibez.com',
    password: 'vendor123',
    role: 'vendor' as const,
    name: 'Fashion Hub',
    phone: '+919876543211',
    vendorId: 'vendor1'
  },
  {
    id: '3',
    email: 'customer@vibez.com',
    password: 'customer123',
    role: 'customer' as const,
    name: 'John Doe',
    phone: '+919876543212'
  }
];