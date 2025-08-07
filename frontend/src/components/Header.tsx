import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlass, User, Heart, ShoppingBag, List, X } from '@phosphor-icons/react';
import { useApp } from '../contexts/AppContext';

const Header = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(state.searchQuery)}`);
      dispatch({ type: 'TOGGLE_SEARCH', payload: false });
    }
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

        {/* Search Overlay */}
        <div className={`fixed inset-0 bg-black transition-all duration-300 z-50 ${
          state.isSearchOpen ? 'bg-opacity-50 visible' : 'bg-opacity-0 invisible'
        }`}>
          <div className={`flex items-start justify-center pt-20 transition-all duration-300 ${
            state.isSearchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-2xl overflow-hidden">
              <form onSubmit={handleSearchSubmit} className="p-8">
                <div className="flex items-center space-x-4">
                  <MagnifyingGlass className="h-6 w-6 text-gray-400" />
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
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;