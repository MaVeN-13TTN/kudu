import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlass, User, Heart, ShoppingBag, List, X } from '@phosphor-icons/react';
import { useApp } from '../contexts/AppContext';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const Header = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState(products);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search functionality
  React.useEffect(() => {
    if (state.searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      const timeoutId = setTimeout(() => {
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.collection.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.material.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults(products);
      setIsSearching(false);
    }
  }, [state.searchQuery]);

  // Prevent body scroll when search modal is open
  React.useEffect(() => {
    if (state.isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Keep the modal open to show results
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    dispatch({ type: 'TOGGLE_SEARCH', payload: false });
  };

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = state.wishlist.length;

  return (
    <>
      {/* Main Header */}
      <header className={`bg-white sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : 'shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <h1 className="text-2xl font-bold text-amber-900 tracking-wide transition-all duration-300 group-hover:scale-105 group-hover:text-amber-800 font-heading">
                KUDU
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/shop" className="relative text-gray-700 hover:text-amber-900 transition-all duration-300 font-medium group">
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/story" className="relative text-gray-700 hover:text-amber-900 transition-all duration-300 font-medium group">
                Our Story
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/collections" className="relative text-gray-700 hover:text-amber-900 transition-all duration-300 font-medium group">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/gifts" className="relative text-gray-700 hover:text-amber-900 transition-all duration-300 font-medium group">
                Gifts
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/contact" className="relative text-gray-700 hover:text-amber-900 transition-all duration-300 font-medium group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
                className="p-2 text-gray-700 hover:text-amber-900 transition-all duration-300 hover:bg-amber-50 rounded-full hover:scale-110"
              >
                <MagnifyingGlass className="h-5 w-5" />
              </button>
              
              {/* Conditional User Icon */}
              {state.isLoggedIn ? (
                <Link to="/account" className="p-2 text-gray-700 hover:text-amber-900 transition-all duration-300 hover:bg-amber-50 rounded-full hover:scale-110">
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <Link to="/login" className="p-2 text-gray-700 hover:text-amber-900 transition-all duration-300 hover:bg-amber-50 rounded-full hover:scale-110">
                  <User className="h-5 w-5" />
                </Link>
              )}
              
              <Link to="/wishlist" className="p-2 text-gray-700 hover:text-amber-900 transition-all duration-300 hover:bg-amber-50 rounded-full hover:scale-110 relative">
                <Heart className="h-5 w-5" />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 text-gray-700 hover:text-amber-900 transition-all duration-300 hover:bg-amber-50 rounded-full hover:scale-110 relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-amber-900 transition-all duration-300 hover:bg-amber-50 rounded-full"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/shop"
              className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/story"
              className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              to="/collections"
              className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/gifts"
              className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gifts
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-3 text-gray-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Search Modal */}
        <div 
          className={`fixed inset-0 backdrop-blur-md bg-black/30 transition-all duration-300 z-[60] ${
            state.isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              dispatch({ type: 'TOGGLE_SEARCH', payload: false });
            }
          }}
        >
          <div className={`flex items-start justify-center pt-8 px-4 transition-all duration-300 ${
            state.isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Search Header */}
              <div className="p-6 border-b border-gray-200">
                <form onSubmit={handleSearchSubmit}>
                  <div className="flex items-center space-x-4">
                    <MagnifyingGlass className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={state.searchQuery}
                      onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                      className="flex-1 outline-none text-xl placeholder-gray-400 bg-transparent"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'TOGGLE_SEARCH', payload: false })}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300 flex-shrink-0"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-hidden">
                {state.searchQuery.trim() ? (
                  <div className="h-full flex flex-col">
                    {/* Results Header */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          {isSearching ? (
                            'Searching...'
                          ) : (
                            `${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'} for "${state.searchQuery}"`
                          )}
                        </p>
                        {searchResults.length > 0 && (
                          <button
                            onClick={() => {
                              dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                            }}
                            className="text-sm text-amber-600 hover:text-amber-500"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Results Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {isSearching ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-900"></div>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {searchResults.slice(0, 12).map(product => (
                            <div 
                              key={product.id}
                              onClick={() => handleProductClick(product.id)}
                              className="cursor-pointer"
                            >
                              <ProductCard product={product} showAddToCart={false} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <MagnifyingGlass className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No products found for "{state.searchQuery}"
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Try adjusting your search terms
                          </p>
                          <button
                            onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })}
                            className="text-amber-600 hover:text-amber-500 font-medium"
                          >
                            Clear search
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Default State - Search Suggestions */
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Belt',
                        'Wallet',
                        'Bag',
                        'Handbag',
                        'Backpack',
                        'Purse',
                        'Briefcase',
                        'Jacket',
                        'Boots',
                        'Gloves',
                        'Watch Strap',
                        'Crossbody',
                        'Tote',
                        'Clutch',
                        'Messenger Bag',
                        'Card Holder'
                      ].map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            dispatch({ type: 'SET_SEARCH_QUERY', payload: suggestion });
                          }}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-full text-sm font-medium transition-colors duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;