import { NextRequest, NextResponse } from 'next/server';

// Mock event state data (in production, this would be stored in InsForge)
let mockEventState = {
  id: '1',
  currentDay: 1,
  startDate: '2024-09-14T00:00:00Z',
  endDate: '2024-09-20T23:59:59Z'
};

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const token = request.headers.get('authorization');
    // if (!token || !isValidAdminToken(token)) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    // }

    // In production, this would query InsForge for the EventState
    return NextResponse.json({
      success: true,
      data: mockEventState
    });

  } catch (error) {
    console.error('Error fetching event state:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event state' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const token = request.headers.get('authorization');
    // if (!token || !isValidAdminToken(token)) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    // }

    const body = await request.json();
    const { currentDay, startDate, endDate } = body;

    // Validation
    if (!currentDay || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'currentDay, startDate, and endDate are required' },
        { status: 400 }
      );
    }

    if (currentDay < 1 || currentDay > 7) {
      return NextResponse.json(
        { success: false, error: 'currentDay must be between 1 and 7' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return NextResponse.json(
        { success: false, error: 'startDate must be before endDate' },
        { status: 400 }
      );
    }

    // Update event state
    mockEventState = {
      ...mockEventState,
      currentDay: parseInt(currentDay.toString()),
      startDate,
      endDate
    };

    // In production, this would update the InsForge EventState model
    // await EventState.update(eventStateId, { currentDay, startDate, endDate });

    return NextResponse.json({
      success: true,
      message: 'Event state updated successfully',
      data: mockEventState
    });

  } catch (error) {
    console.error('Error updating event state:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event state' },
      { status: 500 }
    );
  }
}
