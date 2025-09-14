import { NextRequest, NextResponse } from 'next/server';

// Mock storage for ratings (in production, this would use InsForge)
const mockRatings: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, camperoId, scores, comment, day } = body;

    // Validate required fields
    if (!userId || !camperoId || !scores || !day) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate scores structure
    const { taste, texture, ingredients, presentation, bonus } = scores;
    if (!taste || !texture || !ingredients || !presentation) {
      return NextResponse.json(
        { success: false, error: 'Missing required score fields' },
        { status: 400 }
      );
    }

    // Check for duplicate rating (same user, campero, and day)
    const existingRating = mockRatings.find(
      rating => rating.userId === userId && 
                rating.camperoId === camperoId && 
                rating.day === day
    );

    if (existingRating) {
      return NextResponse.json(
        { success: false, error: 'You have already rated this campero today' },
        { status: 409 }
      );
    }

    // Create new rating
    const newRating = {
      id: Date.now().toString(),
      userId,
      camperoId,
      scores: {
        taste: parseInt(taste),
        texture: parseInt(texture),
        ingredients: parseInt(ingredients),
        presentation: parseInt(presentation),
        bonus: bonus ? parseInt(bonus) : undefined
      },
      comment: comment || null,
      day: parseInt(day),
      timestamp: new Date().toISOString()
    };

    // Save rating (in production, this would save to InsForge)
    mockRatings.push(newRating);

    return NextResponse.json({
      success: true,
      data: newRating
    });

  } catch (error) {
    console.error('Error saving campero rating:', error);
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

    // Get user's ratings for the day
    const userRatings = mockRatings.filter(
      rating => rating.userId === userId && rating.day === parseInt(day)
    );

    return NextResponse.json({
      success: true,
      data: userRatings
    });

  } catch (error) {
    console.error('Error fetching campero ratings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}
