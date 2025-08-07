import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Heart, User, CurrencyDollarSimple, Calendar, ArrowRight } from '@phosphor-icons/react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const GiftsPage = () => {
  const giftCategories = [
    {
      id: 'for-her',
      title: 'Gifts for Her',
      icon: <Heart className="h-8 w-8" />,
      description: 'Elegant handbags and accessories',
      image: 'https://images.pexels.com/photos/1068766/pexels-photo-1068766.jpeg?auto=compress&cs=tinysrgb&w=400',
      products: products.filter(p => p.category === 'Handbags' || p.name.includes('Tote')),
    },
    {
      id: 'for-him',
      title: 'Gifts for Him',
      icon: <User className="h-8 w-8" />,
      description: 'Wallets, briefcases, and travel gear',
      image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=400',
      products: products.filter(p => p.category === 'Accessories' || p.name.includes('Briefcase') || p.name.includes('Wallet')),
    },
    {
      id: 'under-200',
      title: 'Under $200',
      icon: <CurrencyDollarSimple className="h-8 w-8" />,
      description: 'Thoughtful gifts under $200',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
      products: products.filter(p => p.price < 200),
    },
    {
      id: 'occasions',
      title: 'Special Occasions',
      icon: <Calendar className="h-8 w-8" />,
      description: 'Perfect for anniversaries and celebrations',
      image: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=400',
      products: products.filter(p => p.originalPrice), // Sale items as special occasion gifts
    },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [displayedProducts, setDisplayedProducts] = React.useState(products);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setDisplayedProducts(products);
    } else {
      const category = giftCategories.find(c => c.id === categoryId);
      if (category) {
        setDisplayedProducts(category.products);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Gifts</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Gift className="h-16 w-16 mx-auto mb-6 text-amber-900" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">The Art of Gifting</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Give the gift of exceptional craftsmanship. Our curated gift collection features 
            timeless pieces that will be treasured for years to come.
          </p>
        </div>

        {/* Gift Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`group relative overflow-hidden rounded-lg p-6 text-left transition-transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-amber-900 text-white'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-amber-800'
                      : 'bg-amber-100'
                  }`}>
                    <div className={selectedCategory === category.id ? 'text-white' : 'text-amber-900'}>
                      {category.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className={`text-sm ${
                  selectedCategory === category.id ? 'text-amber-100' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                <div className="mt-4">
                  <span className={`text-sm font-medium ${
                    selectedCategory === category.id ? 'text-amber-200' : 'text-amber-900'
                  }`}>
                    {category.products.length} products
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FunnelSimple Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Gifts
          </button>
          {giftCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-amber-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Products GridFour */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' 
                ? 'All Gift Ideas' 
                : giftCategories.find(c => c.id === selectedCategory)?.title || 'Gift Ideas'
              }
            </h2>
            <span className="text-gray-600">
              {displayedProducts.length} {displayedProducts.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>
        </div>

        {/* Gift Features */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gift Services</h2>
            <p className="text-lg text-gray-600">
              Make your gift extra special with our premium gift services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gift Wrapping</h3>
              <p className="text-gray-600">
                Beautiful gift wrapping available for all orders. Add a personal touch with our 
                premium wrapping paper and ribbon.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Messages</h3>
              <p className="text-gray-600">
                Include a heartfelt message with your gift. Our handwritten cards add a 
                personal touch that makes gifts truly memorable.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarSimple className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gift Cards</h3>
              <p className="text-gray-600">
                Can't decide? Our digital gift cards are perfect for letting your loved ones 
                choose their favorite pieces.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              Purchase Gift Card
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Seasonal Promotions */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Holiday Gift Guide</h2>
          <p className="text-xl mb-6 text-amber-100">
            Discover our specially curated holiday collection featuring limited-edition pieces 
            and exclusive gift sets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-white text-amber-900 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
            >
              Shop Holiday Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-amber-800 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Get Gift Advice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftsPage;