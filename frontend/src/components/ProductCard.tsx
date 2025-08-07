import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from '@phosphor-icons/react';
import { Product } from '../types';
import { useApp } from '../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = false }) => {
  const { state, dispatch } = useApp();
  const isInWishlist = state.wishlist.some(item => item.product.id === product.id);
  const [isHovered, setIsHovered] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, quantity: 1 } 
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toast Notification */}
      <div className={`absolute top-4 left-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium z-20 transition-all duration-300 ${
        showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        Added to cart!
      </div>

      <Link to={`/product/${product.id}`}>
        <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-t-xl overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {product.originalPrice && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Sale
            </div>
          )}
          {product.lowStock && (
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Low Stock
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-900 transition-colors duration-300 font-heading">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors duration-300 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-amber-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium px-3 py-1 bg-gray-100 rounded-full">
              {product.category}
            </span>
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isInWishlist
                  ? 'text-red-500 hover:text-red-600 bg-red-50'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </Link>
      
      {showAddToCart && (
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white to-transparent p-6 transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button
            onClick={handleAddToCart}
            className="w-full bg-amber-900 text-white py-3 px-4 rounded-xl hover:bg-amber-800 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold hover:shadow-lg transform hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;