import { NextRequest, NextResponse } from 'next/server';

// Import mock data from other endpoints (in production, this would query InsForge)
// For now, we'll simulate the data

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

    // In production, this would query InsForge for:
    // 1. User's campero ratings for the day
    // 2. Total camperos available for the day
    // 3. User's restaurant rating for the day

    // Mock data for demonstration
    const dayNumber = parseInt(day);
    
    // Simulate getting total camperos for the day (from /api/today/camperos)
    const totalCamperos = 5; // This would come from the camperos API
    
    // Simulate getting user's ratings (this would come from the rating APIs)
    // For demo purposes, let's say user has rated some camperos
    const camperosRated = Math.floor(Math.random() * (totalCamperos + 1)); // 0 to totalCamperos
    const restaurantRated = Math.random() > 0.5; // 50% chance

    const progress = {
      day: dayNumber,
      camperos: {
        rated: camperosRated,
        total: totalCamperos,
        percentage: Math.round((camperosRated / totalCamperos) * 100)
      },
      restaurant: {
        rated: restaurantRated
      },
      overall: {
        completed: camperosRated >= totalCamperos && restaurantRated,
        percentage: Math.round(((camperosRated + (restaurantRated ? 1 : 0)) / (totalCamperos + 1)) * 100)
      }
    };

    return NextResponse.json({
      success: true,
      data: progress
    });

  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
