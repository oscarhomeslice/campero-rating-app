'use client';

import { useState } from 'react';
import RatingSlider from './RatingSlider';

interface CamperoRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  camperoName: string;
  onSubmit: (rating: CamperoRating) => void;
}

interface CamperoRating {
  taste: number;
  texture: number;
  ingredients: number;
  presentation: number;
  bonus: number;
  emoji: string;
  comment: string;
}

const emojiOptions = ['😍', '🤤', '😋', '👌', '🔥', '💯', '🌟', '❤️'];

export default function CamperoRatingModal({ 
  isOpen, 
  onClose, 
  camperoName, 
  onSubmit 
}: CamperoRatingModalProps) {
  const [rating, setRating] = useState<CamperoRating>({
    taste: 5,
    texture: 5,
    ingredients: 5,
    presentation: 5,
    bonus: 5,
    emoji: '😋',
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(rating);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setRating({
      taste: 5,
      texture: 5,
      ingredients: 5,
      presentation: 5,
      bonus: 5,
      emoji: '😋',
      comment: ''
    });
  };

  const updateRating = (field: keyof CamperoRating, value: number | string) => {
    setRating(prev => ({ ...prev, [field]: value }));
  };

  const averageScore = Math.round(
    (rating.taste + rating.texture + rating.ingredients + rating.presentation + rating.bonus) / 5
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-campero-gradient text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-game font-bold">Rate Campero</h2>
              <p className="text-orange-100">{camperoName}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>
          
          {/* Average Score Display */}
          <div className="mt-4 text-center">
            <div className="text-3xl font-bold">{averageScore}/10</div>
            <div className="text-sm text-orange-100">Overall Score</div>
          </div>
        </div>

        {/* Rating Form */}
        <div className="p-6">
          <RatingSlider
            label="Taste"
            value={rating.taste}
            onChange={(value) => updateRating('taste', value)}
            emoji="👅"
          />
          
          <RatingSlider
            label="Texture"
            value={rating.texture}
            onChange={(value) => updateRating('texture', value)}
            emoji="🤏"
          />
          
          <RatingSlider
            label="Ingredients"
            value={rating.ingredients}
            onChange={(value) => updateRating('ingredients', value)}
            emoji="🥬"
          />
          
          <RatingSlider
            label="Presentation"
            value={rating.presentation}
            onChange={(value) => updateRating('presentation', value)}
            emoji="🎨"
          />
          
          <RatingSlider
            label="Bonus Points"
            value={rating.bonus}
            onChange={(value) => updateRating('bonus', value)}
            emoji="⭐"
          />

          {/* Emoji Picker */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🎭 Your Reaction
            </label>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => updateRating('emoji', emoji)}
                  className={`text-2xl p-2 rounded-lg transition-all ${
                    rating.emoji === emoji 
                      ? 'bg-primary-100 scale-110 shadow-lg' 
                      : 'hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💭 Comments (Optional)
            </label>
            <textarea
              value={rating.comment}
              onChange={(e) => updateRating('comment', e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full btn-primary text-lg py-4 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              `Submit Rating ${rating.emoji}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
