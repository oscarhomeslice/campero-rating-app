import { NextRequest, NextResponse } from 'next/server';

// Mock storage for restaurants (in production, this would use InsForge)
const mockRestaurants: any[] = [
  {
    id: '1',
    name: 'El Campero Dorado',
    description: 'A traditional Venezuelan restaurant known for their authentic camperos with fresh ingredients and bold flavors.',
    imageUrl: '/images/restaurant-placeholder.jpg',
    meetingTime: '2024-09-14T12:30:00Z',
    dayNumber: 1,
    latitude: 10.4806,
    longitude: -66.9036,
    timestamp: new Date().toISOString()
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, imageUrl, meetingTime, dayNumber, latitude, longitude } = body;

    // Validate required fields
    if (!name || !description || !meetingTime || !dayNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, description, meetingTime, dayNumber' },
        { status: 400 }
      );
    }

    // Validate day number
    const day = parseInt(dayNumber);
    if (day < 1 || day > 7) {
      return NextResponse.json(
        { success: false, error: 'Day number must be between 1 and 7' },
        { status: 400 }
      );
    }

    // Check if restaurant already exists for this day
    const existingRestaurant = mockRestaurants.find(
      restaurant => restaurant.dayNumber === day
    );

    if (existingRestaurant) {
      return NextResponse.json(
        { success: false, error: `Restaurant already exists for day ${day}` },
        { status: 409 }
      );
    }

    // Create new restaurant
    const newRestaurant = {
      id: (mockRestaurants.length + 1).toString(),
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl?.trim() || '/images/restaurant-placeholder.jpg',
      meetingTime: new Date(meetingTime).toISOString(),
      dayNumber: day,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      timestamp: new Date().toISOString()
    };

    // Save restaurant (in production, this would save to InsForge)
    mockRestaurants.push(newRestaurant);

    return NextResponse.json({
      success: true,
      data: newRestaurant,
      message: 'Restaurant added successfully'
    });

  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create restaurant' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return all restaurants (for admin use)
    return NextResponse.json({
      success: true,
      data: mockRestaurants
    });

  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch restaurants' },
      { status: 500 }
    );
  }
}
