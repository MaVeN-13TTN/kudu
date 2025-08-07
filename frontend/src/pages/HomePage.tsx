import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, EnvelopeSimple, Star, Trophy, Truck, Shield } from '@phosphor-icons/react';
import ProductCard from '../components/ProductCard';
import { products, collections } from '../data/products';

const HomePage = () => {
  const featuredProducts = products.slice(0, 3);
  const [email, setEmail] = React.useState('');
  const [isVisible, setIsVisible] = React.useState<{
    collections?: boolean;
    products?: boolean;
    story?: boolean;
    newsletter?: boolean;
  }>({});

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-cream-100 to-amber-100 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1068766/pexels-photo-1068766.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury leather goods"
            className="w-full h-full object-cover opacity-70 scale-105 hover:scale-100 transition-transform duration-[10s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 animate-fade-in-up">
          <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-amber-900 font-medium">
            <Star className="h-4 w-4 mr-2 fill-current" />
            Handcrafted Excellence Since 1987
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-amber-900 mb-8 leading-tight tracking-tight font-heading">
            Crafted with Heritage,
            <br />
            <span className="bg-gradient-to-r from-amber-700 to-amber-800 bg-clip-text text-transparent">
              Designed for Today
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover our collection of handcrafted leather goods, where traditional 
            craftsmanship meets contemporary design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-amber-900 text-white text-lg font-semibold rounded-xl hover:bg-amber-800 transition-all duration-300 group hover:shadow-2xl hover:scale-105"
            >
              Shop New Arrivals
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/story"
              className="inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-sm text-amber-900 text-lg font-semibold rounded-xl hover:bg-white transition-all duration-300 group hover:shadow-xl"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <Trophy className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Premium Quality</h3>
              <p className="text-sm text-gray-600">Handcrafted Excellence</p>
            </div>
            <div className="text-center group">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <Truck className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">Orders Over $150</p>
            </div>
            <div className="text-center group">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <Shield className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Lifetime Warranty</h3>
              <p className="text-sm text-gray-600">Craftsmanship Guarantee</p>
            </div>
            <div className="text-center group">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <Star className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">5-Star Rated</h3>
              <p className="text-sm text-gray-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section 
        id="collections" 
        data-animate
        className={`py-24 bg-white transition-all duration-1000 ${
          isVisible.collections ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight font-heading">Featured Collections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collections, each telling a unique story of craftsmanship and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-amber-300 transition-colors duration-300 font-heading">
                    {collection.name}
                  </h3>
                  <p className="text-gray-200 mb-6 text-lg leading-relaxed">{collection.description}</p>
                  <span className="inline-flex items-center text-amber-300 font-semibold text-lg group-hover:text-white transition-colors duration-300">
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section 
        id="products" 
        data-animate
        className={`py-24 bg-gray-50 transition-all duration-1000 delay-200 ${
          isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight font-heading">Best Sellers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our most loved pieces, chosen by customers for their exceptional quality and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-900 font-semibold rounded-xl border-2 border-amber-900 hover:bg-amber-900 hover:text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Snippet */}
      <section 
        id="story" 
        data-animate
        className={`py-24 bg-white transition-all duration-1000 delay-400 ${
          isVisible.story ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="group">
              <img
                src="https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artisan crafting leather"
                className="w-full rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8 tracking-tight font-heading">Our Story</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Behind every stitch lies a legacy of passion and precision. Our journey began with 
                a simple belief: that quality craftsmanship should never compromise on style. 
                Each piece in our collection is meticulously handcrafted by skilled artisans 
                who honor traditional techniques while embracing modern innovation.
              </p>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                From selecting the finest materials to the final finishing touches, we ensure 
                that every product tells a story of heritage, sustainability, and timeless elegance.
              </p>
              <Link
                to="/story"
                className="inline-flex items-center px-8 py-4 bg-amber-900 text-white font-semibold rounded-xl hover:bg-amber-800 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Read Our Full Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section 
        id="newsletter" 
        data-animate
        className={`py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white relative overflow-hidden transition-all duration-1000 delay-600 ${
          isVisible.newsletter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-amber-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
            <EnvelopeSimple className="h-10 w-10 text-amber-200" />
          </div>
          <h2 className="text-5xl font-bold mb-6 tracking-tight font-heading">Stay Connected, Be Inspired</h2>
          <p className="text-xl mb-10 text-amber-100 max-w-2xl mx-auto leading-relaxed">
            Join our community for exclusive updates, new arrivals, and special offers.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-amber-700 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;