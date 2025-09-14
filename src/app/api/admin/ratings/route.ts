import { NextRequest, NextResponse } from 'next/server';

// Mock ratings data (in production, this would query InsForge)
const mockRatings = [
  {
    id: '1',
    type: 'campero' as const,
    userId: 'user1',
    userName: 'Test User',
    itemId: '1',
    itemName: 'Campero Clásico',
    scores: {
      taste: 4,
      texture: 5,
      ingredients: 4,
      presentation: 3,
      bonus: 5
    },
    comment: 'Absolutely delicious! The flavors were perfectly balanced.',
    day: 1,
    timestamp: '2024-09-14T14:30:00Z'
  },
  {
    id: '2',
    type: 'restaurant' as const,
    userId: 'user1',
    userName: 'Test User',
    itemId: '1',
    itemName: 'El Campero Dorado',
    rating: 4,
    comment: 'Great atmosphere and friendly service. Will definitely come back!',
    day: 1,
    timestamp: '2024-09-14T14:35:00Z'
  },
  {
    id: '3',
    type: 'campero' as const,
    userId: 'user2',
    userName: 'Maria Rodriguez',
    itemId: '1',
    itemName: 'Campero Clásico',
    scores: {
      taste: 5,
      texture: 4,
      ingredients: 5,
      presentation: 4,
      bonus: 3
    },
    comment: 'Amazing taste! Reminded me of my grandmother\'s cooking.',
    day: 1,
    timestamp: '2024-09-14T15:15:00Z'
  },
  {
    id: '4',
    type: 'restaurant' as const,
    userId: 'user2',
    userName: 'Maria Rodriguez',
    itemId: '1',
    itemName: 'El Campero Dorado',
    rating: 5,
    comment: 'Perfect location and excellent food quality.',
    day: 1,
    timestamp: '2024-09-14T15:20:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get('day');
    const type = searchParams.get('type'); // 'campero' or 'restaurant'

    let filteredRatings = [...mockRatings];

    // Filter by day if specified
    if (day) {
      const dayNumber = parseInt(day);
      filteredRatings = filteredRatings.filter(rating => rating.day === dayNumber);
    }

    // Filter by type if specified
    if (type && (type === 'campero' || type === 'restaurant')) {
      filteredRatings = filteredRatings.filter(rating => rating.type === type);
    }

    // Format ratings for display
    const formattedRatings = filteredRatings.map(rating => ({
      id: rating.id,
      type: rating.type,
      userName: rating.userName,
      itemName: rating.itemName,
      score: rating.type === 'campero' && rating.scores
        ? `T:${rating.scores.taste}, Tx:${rating.scores.texture}, I:${rating.scores.ingredients}, P:${rating.scores.presentation}, B:${rating.scores.bonus}`
        : rating.type === 'restaurant' && 'rating' in rating
        ? `${rating.rating}/5 stars`
        : 'N/A',
      comment: rating.comment,
      day: rating.day,
      timestamp: rating.timestamp
    }));

    // Sort by timestamp (newest first)
    formattedRatings.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      success: true,
      data: formattedRatings,
      total: formattedRatings.length
    });

  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}
