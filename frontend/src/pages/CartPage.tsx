import { Link } from 'react-router-dom';
import { Minus, Plus, Trash, ShoppingBag, ArrowRight } from '@phosphor-icons/react';
import { useApp } from '../contexts/AppContext';

const CartPage = () => {
  const { state, dispatch } = useApp();
  const { cart } = state;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity: newQuantity } });
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Shopping Cart</span>
        </nav>

                <h1 className="text-3xl font-bold text-gray-900 mb-8 font-heading">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-amber-900 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      {item.selectedColor && (
                        <p>Color: {item.selectedColor}</p>
                      )}
                      {item.selectedSize && (
                        <p>Size: {item.selectedSize}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-amber-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-amber-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {shipping > 0 && (
                <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Add ${(150 - subtotal).toFixed(2)} more to qualify for free shipping!
                  </p>
                </div>
              )}
              
              <div className="mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="w-full bg-amber-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <Link
                  to="/shop"
                  className="w-full bg-white text-amber-900 py-3 px-4 rounded-lg font-semibold border-2 border-amber-900 hover:bg-amber-50 transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Secure checkout • Free returns • 30-day guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;