import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Minus, Plus, ShareNetwork, Truck, ArrowCounterClockwise } from '@phosphor-icons/react';
import { products } from '../data/products';
import { useApp } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const product = products.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState('');
  const [selectedSize, setSelectedSize] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);

  const isInWishlist = state.wishlist.some(item => item.product.id === id);
  const relatedProducts = products.filter(p => p.id !== id && p.category === product?.category).slice(0, 3);

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || '');
      setSelectedSize(product.sizes[0] || '');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-amber-900 hover:text-amber-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity,
        selectedColor,
        selectedSize,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gray-900">Shop</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-amber-900' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-amber-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.lowStock && (
                  <span className="text-sm text-red-600 font-medium">Low Stock</span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? 'border-amber-900 bg-amber-900 text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-amber-900 bg-amber-900 text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  isInWishlist
                    ? 'border-red-500 text-red-500 hover:bg-red-50'
                    : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-colors">
                <ShareNetwork className="h-5 w-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="h-5 w-5" />
                <span>Free shipping on orders over $150</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <ArrowCounterClockwise className="h-5 w-5" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
            <div className="prose text-gray-600">
              <p className="mb-4">{product.details}</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Material & Care</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Material: {product.material}</li>
                <li>Clean with a soft, damp cloth</li>
                <li>Avoid prolonged exposure to direct sunlight</li>
                <li>Store in a cool, dry place</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">Sarah M.</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Absolutely love this piece! The craftsmanship is exceptional and it gets better with age. 
                    Worth every penny."
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">David R.</span>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Great quality and beautiful design. Shipping was fast and packaging was excellent."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} showAddToCart />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;