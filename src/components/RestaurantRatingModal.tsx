'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RestaurantRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  restaurantId: string;
  day: number;
  onSubmit: (rating: RestaurantRating) => void;
  alreadyRated?: boolean;
}

interface RestaurantRating {
  rating: number;
  comment: string;
}

export default function RestaurantRatingModal({ 
  isOpen, 
  onClose, 
  restaurantName,
  restaurantId,
  day,
  onSubmit,
  alreadyRated = false
}: RestaurantRatingModalProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState<RestaurantRating>({
    rating: 5,
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!user) {
      setError('You must be logged in to submit a rating');
      return;
    }

    if (alreadyRated) {
      setError('You have already rated this restaurant today');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/rating/restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          restaurantId,
          rating: rating.rating,
          comment: rating.comment || null,
          day
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit rating');
      }

      // Success! Call the parent callback
      onSubmit(rating);
      onClose();
      
      // Reset form
      setRating({
        rating: 5,
        comment: ''
      });

    } catch (error) {
      console.error('Error submitting restaurant rating:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starValue: number) => {
    if (!alreadyRated) {
      setRating(prev => ({ ...prev, rating: starValue }));
    }
  };

  const handleStarHover = (starValue: number | null) => {
    if (!alreadyRated) {
      setHoveredStar(starValue);
    }
  };

  const getStarDisplay = (starIndex: number) => {
    const displayRating = hoveredStar !== null ? hoveredStar : rating.rating;
    return starIndex <= displayRating;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Rate Restaurant</h2>
              <p className="text-orange-100">{restaurantName}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>
          
          {/* Rating Display */}
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold">{rating.rating}/5</div>
            <div className="text-sm text-orange-100">Overall Experience</div>
          </div>
        </div>

        {/* Rating Form */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Already Rated Message */}
          {alreadyRated && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
              ✅ You have already rated this restaurant today!
            </div>
          )}

          {/* Star Rating */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${
              alreadyRated ? 'text-gray-400' : 'text-gray-700'
            }`}>
              🌟 Overall Experience
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <button
                  key={starValue}
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => handleStarHover(starValue)}
                  onMouseLeave={() => handleStarHover(null)}
                  disabled={alreadyRated}
                  className={`text-4xl transition-all duration-200 ${
                    alreadyRated 
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer hover:scale-110'
                  }`}
                >
                  {getStarDisplay(starValue) ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <div className="text-center mt-2">
              <span className={`text-sm ${alreadyRated ? 'text-gray-400' : 'text-gray-600'}`}>
                {hoveredStar !== null ? hoveredStar : rating.rating} out of 5 stars
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-2 ${
              alreadyRated ? 'text-gray-400' : 'text-gray-700'
            }`}>
              💭 Comments (Optional)
            </label>
            <textarea
              value={rating.comment}
              onChange={(e) => !alreadyRated && setRating(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Tell us about your experience..."
              disabled={alreadyRated}
              className={`w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
                alreadyRated ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          {!alreadyRated && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 text-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                `Submit Rating ⭐`
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
