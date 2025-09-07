'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import CamperoRatingModal from '@/components/CamperoRatingModal';

interface CamperoRating {
  taste: number;
  texture: number;
  ingredients: number;
  presentation: number;
  bonus: number;
  emoji: string;
  comment: string;
}

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [currentDay] = useState(1);
  const [ratingsCompleted, setRatingsCompleted] = useState(2);
  const [totalCamperos] = useState(5);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedCampero, setSelectedCampero] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌮</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const [camperos, setCamperos] = useState([
    { id: 1, name: 'Campero Clásico', rated: true },
    { id: 2, name: 'Campero Especial', rated: true },
    { id: 3, name: 'Campero Supremo', rated: false },
    { id: 4, name: 'Campero Vegetariano', rated: false },
    { id: 5, name: 'Campero Picante', rated: false },
  ]);

  const handleRateCampero = (camperoName: string) => {
    setSelectedCampero(camperoName);
    setIsRatingModalOpen(true);
  };

  const handleRatingSubmit = async (rating: CamperoRating) => {
    console.log('Rating submitted:', { campero: selectedCampero, rating });
    
    // Here you would save to InsForge database
    try {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      
      // For now, just update the UI
      setCamperos(prev => 
        prev.map(c => 
          c.name === selectedCampero ? { ...c, rated: true } : c
        )
      );
      setRatingsCompleted(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error('Failed to save rating:', error);
    }
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
            🎉
          </div>
        </div>
      )}

      {/* Header with User Info */}
      <header className="text-center mb-8">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            🌮 Campero Competition 🌮
          </h1>
          <button
            onClick={logout}
            className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
          >
            Logout
          </button>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
          <p className="text-lg font-semibold text-gray-800">Day {currentDay} of 7</p>
        </div>
      </header>

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
              <span>{ratingsCompleted}/{totalCamperos}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(ratingsCompleted / totalCamperos) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            {totalCamperos - ratingsCompleted} camperos left to rate!
          </p>
          
          {ratingsCompleted === totalCamperos && (
            <div className="mt-4 p-3 bg-green-100 rounded-xl">
              <p className="text-green-800 font-semibold">🎉 All done for today!</p>
            </div>
          )}
        </div>
      </div>

      {/* Today's Restaurant */}
      <div className="max-w-md mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            📍 Today's Location
          </h3>
          <div className="bg-white/30 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800">El Campero Dorado</h4>
            <p className="text-sm text-gray-600 mb-2">Calle Principal 123</p>
            <p className="text-sm text-gray-600">🕐 Meeting at 12:30 PM</p>
            <button className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium">
              📍 View on Map
            </button>
          </div>
        </div>
      </div>

      {/* Campero Cards */}
      <div className="max-w-md mx-auto space-y-4 mb-8">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
          Rate Today's Camperos
        </h3>
        
        {camperos.map((campero) => (
          <div key={campero.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">{campero.name}</h4>
                <p className="text-sm text-gray-600">
                  {campero.rated ? '✅ Rated' : '⏳ Pending'}
                </p>
              </div>
              <button 
                onClick={() => handleRateCampero(campero.name)}
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center space-y-1 text-orange-600">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-600">
            <span className="text-xl">🏆</span>
            <span className="text-xs font-medium">Ranking</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-600">
            <span className="text-xl">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* Rating Modal */}
      <CamperoRatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        camperoName={selectedCampero}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
}
