import React, { useState } from 'react';
import { User, Gear, Package, Heart, SignOut, PencilSimple } from '@phosphor-icons/react';

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Gear', icon: Gear },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Profile Information</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <PencilSimple className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">John</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">Doe</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">john.doe@example.com</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-900">+1 (555) 123-4567</div>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Order History</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #ORD-{order}001</h3>
                      <p className="text-sm text-gray-600">Placed on March {order + 10}, 2024</p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                      Delivered
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">3 items</p>
                    <p className="font-semibold text-gray-900">${(order * 89.99).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2">Wishlist Item {item}</h3>
                  <p className="text-gray-600 text-sm mb-3">Beautiful product description</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">${(item * 25.99).toFixed(2)}</span>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Account Gear</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-3 text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-3 text-gray-700">SMS notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-3 text-gray-700">Marketing emails</span>
                  </label>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Privacy</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-3 text-gray-700">Make profile public</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-3 text-gray-700">Show online status</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">John Doe</h1>
                    <p className="text-gray-600">Member since March 2024</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <SignOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
            <nav className="px-6">
              <div className="flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;