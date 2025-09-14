import { NextRequest, NextResponse } from 'next/server';

// Mock users data (in production, this would query InsForge)
const mockUsers = [
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

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const token = request.headers.get('authorization');
    // if (!token || !isValidAdminToken(token)) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    // }

    // In production, this would query InsForge for all users
    const users = mockUsers.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }));

    return NextResponse.json({
      success: true,
      data: users,
      total: users.length
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
