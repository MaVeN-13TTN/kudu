import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { collections } from '../data/products';

const CollectionsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Collections</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Collections</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each collection tells a unique story, crafted with passion and designed for those who 
            appreciate the finest in leather goods.
          </p>
        </div>

        {/* Collections GridFour */}
        <div className="space-y-24">
          {collections.map((collection, index) => (
            <div key={collection.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`${index % 2 === 1 ? 'order-2' : 'order-1'}`}>
                <div className="relative overflow-hidden rounded-lg shadow-lg group">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-gray-200">{collection.products.length} Products</p>
                  </div>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'order-1' : 'order-2'}`}>
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-gray-900">{collection.name}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{collection.description}</p>
                  
                  {/* Collection highlights based on name */}
                  <div className="space-y-4">
                    {collection.id === 'heritage' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Full-grain leather construction</li>
                          <li>• Traditional hand-stitching techniques</li>
                          <li>• Timeless designs that age beautifully</li>
                          <li>• Lifetime craftsmanship guarantee</li>
                        </ul>
                      </div>
                    )}
                    
                    {collection.id === 'voyager' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Perfect For</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Travel and adventure</li>
                          <li>• Outdoor activities</li>
                          <li>• Daily commuting</li>
                          <li>• Weekend getaways</li>
                        </ul>
                      </div>
                    )}
                    
                    {collection.id === 'artisan' && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Artisan Details</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Hand-woven by skilled craftspeople</li>
                          <li>• Unique patterns and textures</li>
                          <li>• Limited production runs</li>
                          <li>• Supports traditional artisans</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/collections/${collection.id}`}
                    className="inline-flex items-center px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors group"
                  >
                    Explore {collection.name}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Decide?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our complete collection or speak with our specialists to find the perfect piece for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-amber-900 font-semibold rounded-lg border-2 border-amber-900 hover:bg-amber-50 transition-colors"
            >
              Get Expert Advice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;