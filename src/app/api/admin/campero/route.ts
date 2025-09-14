import { NextRequest, NextResponse } from 'next/server';

// Mock storage for camperos (in production, this would use InsForge)
const mockCamperos: any[] = [
  {
    id: '1',
    name: 'Campero Clásico',
    tags: ['Traditional', 'Popular'],
    imageUrl: '/images/campero-placeholder.jpg',
    restaurantId: '1',
    dayNumber: 1,
    timestamp: new Date().toISOString()
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, tags, imageUrl, restaurantId, dayNumber } = body;

    // Validate required fields
    if (!name || !restaurantId || !dayNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, restaurantId, dayNumber' },
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

    // Create new campero
    const newCampero = {
      id: (mockCamperos.length + 1).toString(),
      name: name.trim(),
      tags: Array.isArray(tags) ? tags.filter(tag => tag.trim()) : [],
      imageUrl: imageUrl?.trim() || '/images/campero-placeholder.jpg',
      restaurantId: restaurantId.trim(),
      dayNumber: day,
      timestamp: new Date().toISOString()
    };

    // Save campero (in production, this would save to InsForge)
    mockCamperos.push(newCampero);

    return NextResponse.json({
      success: true,
      data: newCampero,
      message: 'Campero added successfully'
    });

  } catch (error) {
    console.error('Error creating campero:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create campero' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return all camperos (for admin use)
    return NextResponse.json({
      success: true,
      data: mockCamperos
    });

  } catch (error) {
    console.error('Error fetching camperos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch camperos' },
      { status: 500 }
    );
  }
}
