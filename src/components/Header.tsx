import React from 'react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';

export function Header() {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Nirmala
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button 
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </Button>
            <Button 
              variant={currentPage === 'preset' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('preset')}
            >
              Preset
            </Button>
            <Button 
              variant={currentPage === 'order' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('order')}
            >
              Order
            </Button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              ☰
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}