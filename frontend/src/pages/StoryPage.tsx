import React from 'react';
import { Trophy, Users, Leaf, Heart } from '@phosphor-icons/react';

const StoryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Artisan crafting leather"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            A journey of passion, craftsmanship, and timeless design
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Where It All Began</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              In a small workshop overlooking the rolling hills of Tuscany, master craftsman Giovanni Rossi 
              began what would become a lifelong passion for leather artistry. What started as a simple 
              dream to create beautiful, functional pieces has evolved into KUDU - a brand that honors 
              traditional techniques while embracing modern innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Roots */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Roots</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 1987, KUDU emerged from a desire to preserve the ancient art of leather crafting 
                while making it accessible to the modern world. Our founder, inspired by the graceful antelope 
                that shares our name, envisioned products that embodied both strength and elegance.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                From our humble beginnings in a single workshop, we've grown into a global brand while 
                maintaining our commitment to handcrafted excellence. Every piece that bears the KUDU name 
                is a testament to our heritage and our unwavering standards.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-900">37</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-900">50+</div>
                  <div className="text-sm text-gray-600">Master Artisans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-900">100k+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Workshop origins"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Craft */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/1068766/pexels-photo-1068766.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Leather crafting process"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">The Craft</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our process begins with the careful selection of the finest full-grain leather, sourced 
                from ethical suppliers who share our commitment to quality and sustainability. Each hide 
                is inspected by hand, ensuring only the best materials make it to our workshop floor.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our master craftsmen employ techniques passed down through generations, combined with 
                modern innovations that enhance durability and functionality. From cutting and stitching 
                to finishing and quality control, every step is performed with meticulous attention to detail.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                The result is not just a product, but a piece of wearable art that improves with age, 
                developing a unique patina that tells the story of its journey with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our core values, which have remained unchanged since our founding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Trophy className="h-10 w-10 text-amber-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We never compromise on quality, ensuring every piece meets our exacting standards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="h-10 w-10 text-amber-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Heritage</h3>
              <p className="text-gray-600">
                Honoring traditional craftsmanship while embracing innovation for the future.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Leaf className="h-10 w-10 text-amber-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Committed to ethical sourcing and environmentally responsible practices.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Heart className="h-10 w-10 text-amber-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                Every piece is created with love, care, and an unwavering attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Sustainability Commitment</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At KUDU, we believe that true luxury lies not just in beauty and quality, but in 
                responsibility. Our commitment to sustainability runs deep, from the materials we 
                choose to the methods we employ.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We work exclusively with suppliers who share our values, ensuring that every hide 
                is ethically sourced and that our environmental impact is minimized. Our workshop 
                employs eco-friendly processes, and we continuously seek ways to reduce waste and 
                energy consumption.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By creating products that last for generations, we contribute to a more sustainable 
                future - one beautiful, durable piece at a time.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sustainable practices"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience Our Craftsmanship</h2>
          <p className="text-xl mb-8 text-amber-100">
            Discover the KUDU difference. Each piece tells a story of heritage, quality, and timeless design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-900 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
            >
              Shop Our Collection
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-amber-800 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Visit Our Workshop
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryPage;