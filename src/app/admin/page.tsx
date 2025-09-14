'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  meetingTime: string;
  dayNumber: number;
  latitude?: number;
  longitude?: number;
}

interface Campero {
  id: string;
  name: string;
  tags: string[];
  imageUrl: string;
  restaurantId: string;
  dayNumber: number;
}

interface Rating {
  id: string;
  type: 'campero' | 'restaurant';
  userName: string;
  itemName: string;
  score: string;
  comment?: string;
  day: number;
  timestamp: string;
}

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'restaurant' | 'campero' | 'ratings'>('restaurant');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Restaurant form state
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    meetingTime: '',
    dayNumber: 1,
    latitude: '',
    longitude: ''
  });

  // Campero form state
  const [camperoForm, setCamperoForm] = useState({
    name: '',
    tags: '',
    imageUrl: '',
    restaurantId: '',
    dayNumber: 1
  });

  // Check admin access
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
      return;
    }

    if (!loading && user) {
      // Check if user is admin (hardcoded email check for now)
      // Use isAdmin field instead of hardcoded emails // Add your admin emails here
      const isAdmin = user.isAdmin === true || ["admin@campero.com", "testuser@example.com"].includes(user.email);
      
      if (!isAdmin) {
        router.push('/');
        return;
      }
    }
  }, [user, loading, router]);

  // Fetch restaurants for campero form dropdown
  useEffect(() => {
    if (user) {
      fetchRestaurants();
    }
  }, [user]);

  // Fetch ratings when ratings tab is active
  useEffect(() => {
    if (activeTab === 'ratings' && user) {
      fetchRatings();
    }
  }, [activeTab, user]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/admin/restaurant');
      const data = await response.json();
      
      if (data.success) {
        setRestaurants(data.data);
      } else {
        console.error('Failed to fetch restaurants:', data.error);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch('/api/admin/ratings');
      const data = await response.json();
      
      if (data.success) {
        setRatings(data.data);
      } else {
        console.error('Failed to fetch ratings:', data.error);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleRestaurantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...restaurantForm,
          dayNumber: parseInt(restaurantForm.dayNumber.toString()),
          latitude: restaurantForm.latitude ? parseFloat(restaurantForm.latitude) : undefined,
          longitude: restaurantForm.longitude ? parseFloat(restaurantForm.longitude) : undefined,
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Restaurant added successfully!' });
        setRestaurantForm({
          name: '',
          description: '',
          imageUrl: '',
          meetingTime: '',
          dayNumber: 1,
          latitude: '',
          longitude: ''
        });
        fetchRestaurants(); // Refresh restaurants list
      } else {
        throw new Error(data.error || 'Failed to add restaurant');
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to add restaurant' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCamperoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/campero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...camperoForm,
          tags: camperoForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          dayNumber: parseInt(camperoForm.dayNumber.toString()),
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Campero added successfully!' });
        setCamperoForm({
          name: '',
          tags: '',
          imageUrl: '',
          restaurantId: '',
          dayNumber: 1
        });
      } else {
        throw new Error(data.error || 'Failed to add campero');
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to add campero' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {user.name}
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                ← Back to App
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('restaurant')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'restaurant'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Add Restaurant
            </button>
            <button
              onClick={() => setActiveTab('campero')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campero'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Add Campero
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ratings'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              View Ratings ({ratings.length})
            </button>
          </nav>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'restaurant' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Add New Restaurant</h2>
              <form onSubmit={handleRestaurantSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={restaurantForm.name}
                      onChange={(e) => setRestaurantForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="El Campero Dorado"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day Number *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="7"
                      value={restaurantForm.dayNumber}
                      onChange={(e) => setRestaurantForm(prev => ({ ...prev, dayNumber: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={restaurantForm.description}
                    onChange={(e) => setRestaurantForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="A traditional Venezuelan restaurant known for..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={restaurantForm.imageUrl}
                      onChange={(e) => setRestaurantForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={restaurantForm.meetingTime}
                      onChange={(e) => setRestaurantForm(prev => ({ ...prev, meetingTime: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={restaurantForm.latitude}
                      onChange={(e) => setRestaurantForm(prev => ({ ...prev, latitude: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="10.4806"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={restaurantForm.longitude}
                      onChange={(e) => setRestaurantForm(prev => ({ ...prev, longitude: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="-66.9036"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Adding Restaurant...' : 'Add Restaurant'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'campero' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Add New Campero</h2>
              <form onSubmit={handleCamperoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campero Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={camperoForm.name}
                      onChange={(e) => setCamperoForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Campero Clásico"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day Number *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="7"
                      value={camperoForm.dayNumber}
                      onChange={(e) => setCamperoForm(prev => ({ ...prev, dayNumber: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={camperoForm.tags}
                    onChange={(e) => setCamperoForm(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Traditional, Popular, Spicy"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={camperoForm.imageUrl}
                      onChange={(e) => setCamperoForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://example.com/campero.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant *
                    </label>
                    <select
                      required
                      value={camperoForm.restaurantId}
                      onChange={(e) => setCamperoForm(prev => ({ ...prev, restaurantId: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select a restaurant</option>
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                          {restaurant.name} (Day {restaurant.dayNumber})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Adding Campero...' : 'Add Campero'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'ratings' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Submitted Ratings</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ratings.map((rating) => (
                      <tr key={rating.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rating.type === 'campero' 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {rating.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rating.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rating.itemName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rating.score}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {rating.comment || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {rating.day}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {ratings.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No ratings submitted yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
