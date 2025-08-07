import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from '@phosphor-icons/react';
import { useApp } from '../contexts/AppContext';

const WishlistPage = () => {
  const { state, dispatch } = useApp();
  const { wishlist } = state;

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const handleAddToCart = (productId: string) => {
    const item = wishlist.find(item => item.product.id === productId);
    if (item) {
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { product: item.product, quantity: 1 } 
      });
    }
  };

  const handleClearWishlist = () => {
    wishlist.forEach(item => {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item.product.id });
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Start adding your favorite items to create your perfect collection.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-heading">Your Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleClearWishlist}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear All
            </button>
            <Link
              to="/shop"
              className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-6">
          {wishlist.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-6">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="text-xl font-semibold text-gray-900 hover:text-amber-900 transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  
                  <p className="text-gray-600 mt-1">{item.product.description}</p>
                  
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="text-lg font-bold text-amber-900">
                      ${item.product.price}
                    </span>
                    {item.product.originalPrice && (
                      <span className="text-gray-500 line-through">
                        ${item.product.originalPrice}
                      </span>
                    )}
                    <span className={`text-sm ${
                      item.product.inStock 
                        ? item.product.lowStock 
                          ? 'text-yellow-600' 
                          : 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {item.product.inStock 
                        ? item.product.lowStock 
                          ? 'Low Stock' 
                          : 'In Stock'
                        : 'Out of Stock'
                      }
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAddToCart(item.product.id)}
                    disabled={!item.product.inStock}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      item.product.inStock
                        ? 'bg-amber-900 text-white hover:bg-amber-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Batch Actions */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-gray-600">Manage all your wishlist items at once</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  wishlist.forEach(item => {
                    if (item.product.inStock) {
                      handleAddToCart(item.product.id);
                    }
                  });
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add All to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Share Wishlist */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Wishlist</h3>
          <p className="text-gray-600 mb-4">
            Let your friends and family know what you're hoping for
          </p>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            Share Wishlist
          </button>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-heading">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This would typically show related products */}
            <div className="text-center py-8 text-gray-500">
              <p>Related products would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;