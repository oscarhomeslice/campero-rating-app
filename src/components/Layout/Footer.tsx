'use client';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-auto lg:ml-64">
      <div className="px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-sm text-gray-600">
            © 2025 Campero Competition. Made with ❤️ for food lovers.
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Day 1 of 7</span>
            <span>•</span>
            <span>🌮 Rate & Enjoy!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
