import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, we'll use mock data until InsForge integration is complete
    // In production, this would fetch from InsForge:
    // 1. Get current day from eventState
    // 2. Query camperos by dayNumber
    
    const mockEventState = { currentDay: 1 };
    
    const mockCamperos = [
      {
        id: '1',
        name: 'Campero Clásico',
        tags: ['Traditional', 'Popular'],
        imageUrl: '/images/campero-clasico.jpg',
        restaurantId: '1',
        dayNumber: mockEventState.currentDay
      },
      {
        id: '2',
        name: 'Campero Especial',
        tags: ['Premium', 'Chef Special'],
        imageUrl: '/images/campero-especial.jpg',
        restaurantId: '1',
        dayNumber: mockEventState.currentDay
      },
      {
        id: '3',
        name: 'Campero Supremo',
        tags: ['Deluxe', 'Extra Large'],
        imageUrl: '/images/campero-supremo.jpg',
        restaurantId: '1',
        dayNumber: mockEventState.currentDay
      },
      {
        id: '4',
        name: 'Campero Vegetariano',
        tags: ['Vegetarian', 'Healthy'],
        imageUrl: '/images/campero-vegetariano.jpg',
        restaurantId: '1',
        dayNumber: mockEventState.currentDay
      },
      {
        id: '5',
        name: 'Campero Picante',
        tags: ['Spicy', 'Hot Sauce'],
        imageUrl: '/images/campero-picante.jpg',
        restaurantId: '1',
        dayNumber: mockEventState.currentDay
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockCamperos
    });
  } catch (error) {
    console.error('Error fetching today\'s camperos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch camperos data' },
      { status: 500 }
    );
  }
}
