import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Check } from '@phosphor-icons/react';
import { useApp } from '../contexts/AppContext';

const CheckoutPage = () => {
  const { state } = useApp();
  const { cart } = state;
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Billing
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States',
    
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Options
    shippingMethod: 'standard',
    saveAddress: false,
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = formData.shippingMethod === 'express' ? 25 : formData.shippingMethod === 'overnight' ? 45 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', formData);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-amber-900 hover:text-amber-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-amber-900">KUDU</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">
              Need Help?
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  num <= step ? 'bg-amber-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {num < step ? <Check className="h-4 w-4" /> : num}
                </div>
                <span className={`ml-2 text-sm ${
                  num <= step ? 'text-amber-900 font-medium' : 'text-gray-500'
                }`}>
                  {num === 1 ? 'Shipping' : num === 2 ? 'Billing' : num === 3 ? 'Review' : 'Payment'}
                </span>
                {num < 4 && <div className="w-8 h-px bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="saveAddress"
                        checked={formData.saveAddress}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Save this address for future orders</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Standard Shipping</span>
                          <span className="text-gray-600">$15.00</span>
                        </div>
                        <p className="text-sm text-gray-500">5-7 business days</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Express Shipping</span>
                          <span className="text-gray-600">$25.00</span>
                        </div>
                        <p className="text-sm text-gray-500">2-3 business days</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="overnight"
                        checked={formData.shippingMethod === 'overnight'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Overnight Shipping</span>
                          <span className="text-gray-600">$45.00</span>
                        </div>
                        <p className="text-sm text-gray-500">Next business day</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}<br />
                        {formData.country}
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Method</h3>
                      <p className="text-sm text-gray-600">
                        {formData.shippingMethod === 'standard' ? 'Standard Shipping (5-7 business days)' :
                         formData.shippingMethod === 'express' ? 'Express Shipping (2-3 business days)' :
                         'Overnight Shipping (Next business day)'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    step === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Place Order
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.selectedColor && `${item.selectedColor} • `}
                      {item.selectedSize && `${item.selectedSize} • `}
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-6 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span className="text-amber-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;