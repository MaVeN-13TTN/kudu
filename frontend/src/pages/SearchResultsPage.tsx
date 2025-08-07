import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [filteredProducts, setFunnelSimpleedProducts] = React.useState(products);
  const [sortBy, setSortBy] = React.useState('relevance');

  React.useEffect(() => {
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.collection.toLowerCase().includes(query.toLowerCase()) ||
        product.material.toLowerCase().includes(query.toLowerCase())
      );
      setFunnelSimpleedProducts(filtered);
    } else {
      setFunnelSimpleedProducts(products);
    }
  }, [query]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredProducts];
    
    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    setFunnelSimpleedProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">MagnifyingGlass Results</span>
        </nav>

        {/* MagnifyingGlass Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MagnifyingGlass className="h-6 w-6 text-gray-400" />
            <h1 className="text-3xl font-bold text-gray-900 font-heading">
              Search Results for "{query}"
            </h1>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredProducts.length === 0 
                ? 'No products found'
                : `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'}`
              }
            </p>
            
            {filteredProducts.length > 0 && (
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-900"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MagnifyingGlass className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
              No products found for "{query}"
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any products matching your search. Try adjusting your search terms or browse our collections.
            </p>
            
            <div className="space-y-4">
              <div className="text-gray-600">
                <p className="font-medium mb-2">Suggestions:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Check your spelling</li>
                  <li>• Try a broader keyword</li>
                  <li>• Use different keywords</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
                >
                  Browse All Products
                </Link>
                <Link
                  to="/collections"
                  className="inline-flex items-center px-6 py-3 bg-white text-amber-900 font-semibold rounded-lg border-2 border-amber-900 hover:bg-amber-50 transition-colors"
                >
                  View Collections
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Popular Products */}
        {filteredProducts.length === 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-heading">
              Popular Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} showAddToCart />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;