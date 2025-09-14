import { NextRequest, NextResponse } from 'next/server';

// Mock users data (in production, this would be stored in InsForge)
let mockUsers = [
  {
    id: '1',
    username: 'testuser',
    email: 'testuser@example.com',
    isAdmin: true
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@campero.com',
    isAdmin: true
  },
  {
    id: '3',
    username: 'maria',
    email: 'maria@example.com',
    isAdmin: false
  },
  {
    id: '4',
    username: 'carlos',
    email: 'carlos@example.com',
    isAdmin: false
  }
];

export async function PATCH(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const token = request.headers.get('authorization');
    // if (!token || !isValidAdminToken(token)) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    // }

    const body = await request.json();
    const { userId, isAdmin } = body;

    if (!userId || typeof isAdmin !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body. userId and isAdmin (boolean) are required.' },
        { status: 400 }
      );
    }

    // Find and update user
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user's admin status
    mockUsers[userIndex].isAdmin = isAdmin;

    // In production, this would update the InsForge User model
    // await User.update(userId, { isAdmin });

    return NextResponse.json({
      success: true,
      message: `User ${isAdmin ? 'promoted to' : 'demoted from'} admin successfully`,
      data: {
        id: mockUsers[userIndex].id,
        username: mockUsers[userIndex].username,
        email: mockUsers[userIndex].email,
        isAdmin: mockUsers[userIndex].isAdmin
      }
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user role' },
      { status: 500 }
    );
  }
}
