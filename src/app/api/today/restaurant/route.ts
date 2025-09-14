import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, we'll use mock data until InsForge integration is complete
    // In production, this would fetch from InsForge:
    // 1. Get current day from eventState
    // 2. Query restaurant by dayNumber
    
    const mockEventState = { currentDay: 1 };
    
    const mockRestaurant = {
      id: '1',
      name: 'El Campero Dorado',
      description: 'A traditional Venezuelan restaurant known for their authentic camperos with fresh ingredients and bold flavors.',
      imageUrl: '/images/restaurant-placeholder.jpg',
      meetingTime: '2024-09-14T12:30:00Z',
      dayNumber: mockEventState.currentDay
    };

    return NextResponse.json({
      success: true,
      data: mockRestaurant
    });
  } catch (error) {
    console.error('Error fetching today\'s restaurant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch restaurant data' },
      { status: 500 }
    );
  }
}
