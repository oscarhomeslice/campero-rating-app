import { NextRequest, NextResponse } from 'next/server';

// Mock storage for restaurant ratings (in production, this would use InsForge)
const mockRestaurantRatings: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, restaurantId, rating, comment, day } = body;

    // Validate required fields
    if (!userId || !restaurantId || !rating || !day) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating value
    const ratingValue = parseInt(rating);
    if (ratingValue < 1 || ratingValue > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check for duplicate rating (same user, restaurant, and day)
    const existingRating = mockRestaurantRatings.find(
      r => r.userId === userId && 
           r.restaurantId === restaurantId && 
           r.day === day
    );

    if (existingRating) {
      return NextResponse.json(
        { success: false, error: 'You have already rated this restaurant today' },
        { status: 409 }
      );
    }

    // Create new rating
    const newRating = {
      id: Date.now().toString(),
      userId,
      restaurantId,
      rating: ratingValue,
      comment: comment || null,
      day: parseInt(day),
      timestamp: new Date().toISOString()
    };

    // Save rating (in production, this would save to InsForge)
    mockRestaurantRatings.push(newRating);

    return NextResponse.json({
      success: true,
      data: newRating
    });

  } catch (error) {
    console.error('Error saving restaurant rating:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save rating' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const day = searchParams.get('day');

    if (!userId || !day) {
      return NextResponse.json(
        { success: false, error: 'Missing userId or day parameter' },
        { status: 400 }
      );
    }

    // Get user's restaurant ratings for the day
    const userRatings = mockRestaurantRatings.filter(
      rating => rating.userId === userId && rating.day === parseInt(day)
    );

    return NextResponse.json({
      success: true,
      data: userRatings
    });

  } catch (error) {
    console.error('Error fetching restaurant ratings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}
