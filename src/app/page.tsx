'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import CamperoRatingModal from '@/components/CamperoRatingModal';
import RestaurantRatingModal from '@/components/RestaurantRatingModal';

interface CamperoRating {
  taste: number;
  texture: number;
  ingredients: number;
  presentation: number;
  bonus: number;
  emoji: string;
  comment: string;
}

interface RestaurantRating {
  rating: number;
  comment: string;
}

interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  meetingTime: string;
  dayNumber: number;
}

interface Campero {
  id: string;
  name: string;
  tags: string[];
  imageUrl: string;
  restaurantId: string;
  dayNumber: number;
  rated?: boolean;
}

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(1);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [camperos, setCamperos] = useState<Campero[]>([]);
  const [ratingsCompleted, setRatingsCompleted] = useState(0);
  const [restaurantRated, setRestaurantRated] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [selectedCampero, setSelectedCampero] = useState<Campero | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Fetch daily content
  useEffect(() => {
    if (user) {
      fetchDailyContent();
    }
  }, [user]);

  const fetchDailyContent = async () => {
    try {
      setDataLoading(true);
      
      // Fetch restaurant data
      const restaurantResponse = await fetch('/api/today/restaurant');
      const restaurantData = await restaurantResponse.json();
      
      // Fetch camperos data
      const camperosResponse = await fetch('/api/today/camperos');
      const camperosData = await camperosResponse.json();
      
      if (restaurantData.success && camperosData.success) {
        setRestaurant(restaurantData.data);
        
        // Check which camperos have been rated
        const camperosWithStatus = await Promise.all(
          camperosData.data.map(async (campero: Campero) => {
            // In a real app, this would check the rating API
            // For now, simulate some ratings
            const rated = Math.random() > 0.6; // 40% chance of being rated
            return { ...campero, rated };
          })
        );
        
        setCamperos(camperosWithStatus);
        setCurrentDay(restaurantData.data.dayNumber);
        
        // Calculate ratings completed
        const completed = camperosWithStatus.filter((c: Campero) => c.rated).length;
        setRatingsCompleted(completed);
        
        // Check if restaurant is rated (simulate)
        setRestaurantRated(Math.random() > 0.7); // 30% chance
      }
    } catch (error) {
      console.error('Error fetching daily content:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleRateCampero = (campero: Campero) => {
    if (!campero.rated) {
      setSelectedCampero(campero);
      setIsRatingModalOpen(true);
    }
  };

  const handleRateRestaurant = () => {
    if (!restaurantRated) {
      setIsRestaurantModalOpen(true);
    }
  };

  const handleCamperoRatingSubmit = async (rating: CamperoRating) => {
    console.log('Campero rating submitted:', { campero: selectedCampero?.name, rating });
    
    if (selectedCampero) {
      // Update the campero as rated
      setCamperos(prev => 
        prev.map(c => 
          c.id === selectedCampero.id ? { ...c, rated: true } : c
        )
      );
      setRatingsCompleted(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleRestaurantRatingSubmit = async (rating: RestaurantRating) => {
    console.log('Restaurant rating submitted:', { restaurant: restaurant?.name, rating });
    
    setRestaurantRated(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const formatMeetingTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4"><img src="https://i.postimg.cc/SQM1c9Ht/El-Camperon-transparent-1.webp" alt="El Camperón" className="mx-auto h-16 w-16" /></div>
          <p className="text-gray-600">Loading daily content...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
            🎉
          </div>
        </div>
      )}

      {/* Day Status */}
      <div className="text-center mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
          <p className="text-lg font-semibold text-gray-800">Day {currentDay} of 7</p>
        </div>
      </div>

      {/* Welcome Section with User Name */}
      <div className="max-w-md mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Hola, {user.name}! 👋
          </h2>
          <p className="text-gray-600 mb-4">
            Ready to taste some amazing camperos today?
          </p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Today's Progress</span>
              <span>{ratingsCompleted}/{camperos.length} camperos + {restaurantRated ? '1' : '0'}/1 restaurant</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${camperos.length > 0 ? 
                    ((ratingsCompleted + (restaurantRated ? 1 : 0)) / (camperos.length + 1)) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            {camperos.length - ratingsCompleted} camperos and {restaurantRated ? '0' : '1'} restaurant left to rate!
          </p>
          
          {ratingsCompleted === camperos.length && restaurantRated && camperos.length > 0 && (
            <div className="mt-4 p-3 bg-green-100 rounded-xl">
              <p className="text-green-800 font-semibold">🎉 All done for today!</p>
            </div>
          )}
        </div>
      </div>

      {/* Today's Restaurant */}
      {restaurant && (
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              📍 Today's Location
            </h3>
            <div className="bg-white/30 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800">{restaurant.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
              <p className="text-sm text-gray-600 mb-3">🕐 Meeting at {formatMeetingTime(restaurant.meetingTime)}</p>
              
              <div className="flex space-x-2">
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  📍 View on Map
                </button>
                <button 
                  onClick={handleRateRestaurant}
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    restaurantRated 
                      ? 'bg-green-100 text-green-700 cursor-default' 
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  {restaurantRated ? '✅ Rated' : '⭐ Rate Restaurant'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campero Cards */}
      <div className="max-w-md mx-auto space-y-4 mb-8">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
          Rate Today's Camperos
        </h3>
        
        {camperos.map((campero) => (
          <div key={campero.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{campero.name}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campero.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {campero.rated ? '✅ Rated' : '⏳ Pending'}
                </p>
              </div>
              <button 
                onClick={() => handleRateCampero(campero)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  campero.rated 
                    ? 'bg-green-100 text-green-700 cursor-default' 
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transform hover:scale-105'
                }`}
                disabled={campero.rated}
              >
                {campero.rated ? 'Done' : 'Rate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Modals */}
      {selectedCampero && (
        <CamperoRatingModal
          isOpen={isRatingModalOpen}
          onClose={() => {
            setIsRatingModalOpen(false);
            setSelectedCampero(null);
          }}
          camperoName={selectedCampero.name}
          camperoId={selectedCampero.id}
          day={currentDay}
          onSubmit={handleCamperoRatingSubmit}
          alreadyRated={selectedCampero.rated}
        />
      )}

      {restaurant && (
        <RestaurantRatingModal
          isOpen={isRestaurantModalOpen}
          onClose={() => setIsRestaurantModalOpen(false)}
          restaurantName={restaurant.name}
          restaurantId={restaurant.id}
          day={currentDay}
          onSubmit={handleRestaurantRatingSubmit}
          alreadyRated={restaurantRated}
        />
      )}
    </>
  );
}
