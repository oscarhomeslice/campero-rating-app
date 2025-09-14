'use client';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo/Title */}
        <div className="flex items-center space-x-2">
          <img src="https://i.postimg.cc/SQM1c9Ht/El-Camperon-transparent-1.webp" alt="El Camperón" className="inline-block h-8 w-8" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Choque Campero
          </h1>
        </div>

        {/* User menu */}
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="hidden sm:inline text-sm text-gray-600">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
