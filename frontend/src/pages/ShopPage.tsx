import React from 'react';
import { FunnelSimple, GridFour, List } from '@phosphor-icons/react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const ShopPage = () => {
  const [filteredProducts, setFunnelSimpleedProducts] = React.useState(products);
  const [sortBy, setSortBy] = React.useState('featured');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [filters, setFunnelSimples] = React.useState({
    category: '',
    material: '',
    color: '',
    priceRange: [0, 500],
    inStock: false,
  });
  const [showFunnelSimples, setShowFunnelSimples] = React.useState(false);

  const categories = ['All', 'Handbags', 'Bags', 'Accessories'];
  const materials = ['All', 'Full-grain leather', 'Canvas with leather trim', 'Premium leather', 'Handwoven textile with leather accents'];
  const colors = ['All', 'Brown', 'Black', 'Navy', 'Olive', 'Cognac', 'Tan', 'Natural', 'Charcoal'];

  const handleFunnelSimpleChange = (filterType: string, value: string | number[] | boolean) => {
    setFunnelSimples(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

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
      case 'newest':
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for featured
        break;
    }
    
    setFunnelSimpleedProducts(sorted);
  };

  const applyFunnelSimples = React.useCallback(() => {
    let filtered = products;

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.material && filters.material !== 'All') {
      filtered = filtered.filter(p => p.material === filters.material);
    }

    if (filters.color && filters.color !== 'All') {
      filtered = filtered.filter(p => p.colors.includes(filters.color));
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }

    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    setFunnelSimpleedProducts(filtered);
  }, [filters]);

  const clearFunnelSimples = () => {
    setFunnelSimples({
      category: '',
      material: '',
      color: '',
      priceRange: [0, 500],
      inStock: false,
    });
    setFunnelSimpleedProducts(products);
  };

  React.useEffect(() => {
    applyFunnelSimples();
  }, [filters, applyFunnelSimples]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <span>Home</span>
          <span>/</span>
          <span className="font-medium text-gray-900">Shop</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Shop All Products</h1>
            <p className="text-gray-600">Discover our complete collection of handcrafted leather goods</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              onClick={() => setShowFunnelSimples(!showFunnelSimples)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
            >
              <FunnelSimple className="h-4 w-4" />
              <span>FunnelSimples</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-amber-900 text-white' : 'bg-white text-gray-600'}`}
              >
                <GridFour className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-amber-900 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FunnelSimples Sidebar */}
          <div className={`lg:w-64 bg-white rounded-lg p-6 h-fit ${showFunnelSimples ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">FunnelSimples</h2>
              <button
                onClick={clearFunnelSimples}
                className="text-sm text-amber-900 hover:text-amber-700 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Category FunnelSimple */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category || (category === 'All' && !filters.category)}
                        onChange={(e) => handleFunnelSimpleChange('category', e.target.value === 'All' ? '' : e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material FunnelSimple */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Material</h3>
                <div className="space-y-2">
                  {materials.map(material => (
                    <label key={material} className="flex items-center">
                      <input
                        type="radio"
                        name="material"
                        value={material}
                        checked={filters.material === material || (material === 'All' && !filters.material)}
                        onChange={(e) => handleFunnelSimpleChange('material', e.target.value === 'All' ? '' : e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color FunnelSimple */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="space-y-2">
                  {colors.map(color => (
                    <label key={color} className="flex items-center">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={filters.color === color || (color === 'All' && !filters.color)}
                        onChange={(e) => handleFunnelSimpleChange('color', e.target.value === 'All' ? '' : e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFunnelSimpleChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* In Stock FunnelSimple */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFunnelSimpleChange('inStock', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products GridFour */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-900"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} showAddToCart />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button
                  onClick={clearFunnelSimples}
                  className="mt-4 px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
                >
                  Clear FunnelSimples
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;