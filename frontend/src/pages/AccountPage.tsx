import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Gear, 
  Package, 
  Heart, 
  SignOut, 
  PencilSimple, 
  MapPin, 
  CreditCard, 
  Bell,
  Shield,
  Eye,
  EyeSlash,
  Check,
  Plus,
  Star,
  Calendar,
  Truck,
  Camera,
  Trash
} from '@phosphor-icons/react';
import { useApp } from '../contexts/AppContext';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    avatar: ''
  });
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Gear },
  ];

  const handleSignOut = () => {
    // In a real app, this would clear auth tokens and redirect
    navigate('/login');
  };

  const handleProfileSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Profile saved:', profileData);
  };

  const handlePasswordChange = () => {
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // In a real app, this would update password via API
    console.log('Password changed');
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB.');
      return;
    }

    setIsUploadingPhoto(true);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      
      // Simulate upload delay
      setTimeout(() => {
        setProfileData(prev => ({ ...prev, avatar: result }));
        setIsUploadingPhoto(false);
        console.log('Photo uploaded:', file.name);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoRemove = () => {
    setProfileData(prev => ({ ...prev, avatar: '' }));
    setPreviewImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const mockOrders = [
    {
      id: 'ORD-001',
      date: 'March 15, 2024',
      status: 'Delivered',
      total: 295.00,
      items: 2,
      image: 'https://images.pexels.com/photos/1068766/pexels-photo-1068766.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ORD-002',
      date: 'March 8, 2024',
      status: 'In Transit',
      total: 185.00,
      items: 1,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'ORD-003',
      date: 'February 28, 2024',
      status: 'Processing',
      total: 125.00,
      items: 1,
      image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Profile Information</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <PencilSimple className="w-4 h-4" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Profile Avatar - Only show when editing */}
            {isEditing && (
              <div className="space-y-4">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center overflow-hidden">
                      {profileData.avatar || previewImage ? (
                        <img 
                          src={previewImage || profileData.avatar} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>
                    {isUploadingPhoto && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={triggerPhotoUpload}
                      disabled={isUploadingPhoto}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Camera className="w-4 h-4" />
                      {isUploadingPhoto ? 'Uploading...' : 'Change Photo'}
                    </button>
                    
                    {(profileData.avatar || previewImage) && (
                      <button 
                        onClick={handlePhotoRemove}
                        disabled={isUploadingPhoto}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash className="w-4 h-4" />
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 ml-30">
                  JPG, PNG or GIF. Maximum file size 5MB.
                </p>
              </div>
            )}

            {isEditing ? (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleProfileSave}
                    className="flex items-center gap-2 px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.firstName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.lastName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">
                    {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-900">March 2024</div>
                </div>
              </div>
            )}

            {/* Change Password Section */}
            <div className="border-t pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                <button
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="text-sm text-amber-600 hover:text-amber-500 font-medium"
                >
                  Change Password
                </button>
              </div>

              {showChangePassword && (
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPasswords.current ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPasswords.new ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPasswords.confirm ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handlePasswordChange}
                      className="px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => setShowChangePassword(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Order History</h2>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={order.image}
                        alt="Order"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Order {order.id}</h3>
                        <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {order.date}
                          </span>
                          <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.status === 'In Transit' && (
                        <button className="flex items-center text-sm text-amber-600 hover:text-amber-500">
                          <Truck className="w-4 h-4 mr-1" />
                          Track Package
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button className="text-sm text-amber-600 hover:text-amber-500 font-medium">
                      View Details
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-500">
                      Reorder Items
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="text-sm text-gray-600 hover:text-gray-500">
                        Write Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">My Wishlist</h2>
              <p className="text-sm text-gray-600">{state.wishlist.length} item{state.wishlist.length !== 1 ? 's' : ''}</p>
            </div>
            {state.wishlist.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">Save items you love to revisit them later</p>
                <button 
                  onClick={() => navigate('/shop')}
                  className="px-6 py-3 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.wishlist.map((item) => (
                  <div key={item.product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.product.name}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(item.product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({item.product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">${item.product.price}</span>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-amber-900 rounded-lg hover:bg-amber-800 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Shipping Addresses</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <Plus className="w-4 h-4" />
                Add Address
              </button>
            </div>
            <div className="grid gap-4">
              <div className="border border-gray-200 rounded-lg p-6 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">Home</h3>
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Default</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      John Doe<br />
                      123 Main Street<br />
                      Apartment 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-amber-600 hover:text-amber-500">Edit</button>
                    <button className="text-sm text-red-600 hover:text-red-500">Delete</button>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Work</h3>
                    <p className="text-gray-600 text-sm">
                      John Doe<br />
                      456 Business Ave<br />
                      Suite 200<br />
                      New York, NY 10002<br />
                      United States
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-amber-600 hover:text-amber-500">Edit</button>
                    <button className="text-sm text-red-600 hover:text-red-500">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Payment Methods</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <Plus className="w-4 h-4" />
                Add Payment Method
              </button>
            </div>
            <div className="grid gap-4">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/25</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Default</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-amber-600 hover:text-amber-500">Edit</button>
                    <button className="text-sm text-red-600 hover:text-red-500">Remove</button>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-gray-700 to-gray-500 rounded flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 5555</p>
                      <p className="text-sm text-gray-600">Expires 08/26</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-amber-600 hover:text-amber-500">Edit</button>
                    <button className="text-sm text-red-600 hover:text-red-500">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Account Settings</h2>
            
            {/* Notifications */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Order updates</span>
                  <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Marketing emails</span>
                  <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">SMS notifications</span>
                  <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Product recommendations</span>
                  <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" defaultChecked />
                </label>
              </div>
            </div>

            {/* Privacy */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Privacy</h3>
              </div>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Make profile public</span>
                  <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Show purchase history</span>
                  <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Allow personalized ads</span>
                  <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" defaultChecked />
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  Download my data
                </button>
                <button className="w-full text-left px-4 py-3 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  Delete account
                </button>
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
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center overflow-hidden">
                    {profileData.avatar ? (
                      <img 
                        src={profileData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <p className="text-gray-600 text-lg">Member since March 2024</p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        {mockOrders.length} orders
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {state.wishlist.length} wishlist items
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <SignOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
            <nav className="px-6">
              <div className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-amber-500 text-amber-600'
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