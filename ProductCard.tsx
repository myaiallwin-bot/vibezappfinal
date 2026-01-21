import { Plus, Star, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-pink-300">
      {product.badge && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        </div>
      )}
      
      {product.trending && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>TRENDING</span>
          </div>
        </div>
      )}
      
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4 bg-gradient-to-b from-white to-pink-50">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-900 flex-1">{product.name}</h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600">4.8</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-black text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-pink-500 font-bold">✨ POPULAR</span>
        </div>
        
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};