import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { collections } from '../data/products';
import ProductCard from '../components/ProductCard';

const CollectionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const collection = collections.find(c => c.id === id);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
          <Link to="/collections" className="text-amber-900 hover:text-amber-700">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-gray-900">Collections</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">{collection.name}</span>
        </nav>

        {/* Collection Hero */}
        <div className="relative mb-16">
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{collection.name}</h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
                {collection.description}
              </p>
            </div>
          </div>
        </div>

        {/* Collection Narrative */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="prose prose-lg mx-auto text-gray-600">
              {collection.id === 'heritage' && (
                <div>
                  <p className="text-xl leading-relaxed mb-6">
                    The Heritage Collection represents the pinnacle of traditional leather craftsmanship. 
                    Each piece is a testament to timeless design principles that have guided artisans 
                    for generations.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Using only the finest full-grain leather and time-honored techniques, these pieces 
                    are designed to become cherished heirlooms that tell the story of your journey through life.
                  </p>
                </div>
              )}
              
              {collection.id === 'voyager' && (
                <div>
                  <p className="text-xl leading-relaxed mb-6">
                    Born from the spirit of adventure, the Voyager Collection combines rugged durability 
                    with sophisticated style. These pieces are designed for those who refuse to compromise 
                    between function and elegance.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Whether you're navigating city streets or exploring mountain trails, Voyager products 
                    are built to withstand the elements while maintaining their refined appearance.
                  </p>
                </div>
              )}
              
              {collection.id === 'artisan' && (
                <div>
                  <p className="text-xl leading-relaxed mb-6">
                    The Artisan Collection celebrates the beauty of human craftsmanship. Each piece is 
                    individually created by skilled artisans who bring their unique vision and expertise 
                    to every stitch.
                  </p>
                  <p className="text-lg leading-relaxed">
                    No two pieces are exactly alike, making each item a unique work of art that reflects 
                    the personality and skill of its creator.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products GridFour */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {collection.name} Products
            </h2>
            <span className="text-gray-600">
              {collection.products.length} {collection.products.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.products.map(product => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover More Collections
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Each of our collections tells a unique story. Explore our other collections to find 
            the perfect piece for your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="inline-flex items-center px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              View All Collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-white text-amber-900 font-semibold rounded-lg border-2 border-amber-900 hover:bg-amber-50 transition-colors"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailPage;