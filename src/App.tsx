import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PresetPage } from './components/PresetPage';
import { OrderPage } from './components/OrderPage';
import { DashboardLogin, Dashboard } from './components/DashboardPage';

function AppContent() {
  const { currentPage, setCurrentPage, isDashboardLoggedIn, setIsDashboardLoggedIn } = useApp();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Shift+A (Access Dashboard)
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        if (!isDashboardLoggedIn) {
          setCurrentPage('dashboard-login');
        } else {
          setCurrentPage('dashboard');
        }
      }
      
      // Check for Ctrl+Shift+H (Home)
      if (event.ctrlKey && event.shiftKey && event.key === 'H') {
        event.preventDefault();
        setCurrentPage('home');
        setIsDashboardLoggedIn(false); // Logout from dashboard when going home
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDashboardLoggedIn, setCurrentPage, setIsDashboardLoggedIn]);

  // Handle dashboard login success
  useEffect(() => {
    if (currentPage === 'dashboard' && !isDashboardLoggedIn) {
      setCurrentPage('dashboard-login');
    }
  }, [currentPage, isDashboardLoggedIn, setCurrentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'preset':
        return <PresetPage />;
      case 'order':
        return <OrderPage />;
      case 'dashboard-login':
        return <DashboardLogin />;
      case 'dashboard':
        return isDashboardLoggedIn ? <Dashboard /> : <DashboardLogin />;
      default:
        return <HomePage />;
    }
  };

  const isDashboardPage = currentPage === 'dashboard-login' || currentPage === 'dashboard';

  return (
    <div className="min-h-screen bg-background">
      {!isDashboardPage && <Header />}
      
      {/* Keyboard Shortcut Indicator - Only show on non-dashboard pages */}
      {!isDashboardPage && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <span>🔐</span>
              <span>Ctrl+Shift+A for Admin</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Dashboard Navigation Hint */}
      {isDashboardPage && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <span>🏠</span>
              <span>Ctrl+Shift+H for Home</span>
            </div>
          </div>
        </div>
      )}
      
      <main>
        {renderCurrentPage()}
      </main>
      
      {/* Footer - Hidden on dashboard pages */}
      {!isDashboardPage && (
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <h3 className="text-xl font-bold">Nirmala</h3>
                </div>
                <p className="text-gray-400">
                  Spesialis undangan digital dan cetak dengan desain terbaik untuk momen spesial Anda.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Layanan</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Undangan Digital</li>
                  <li>Undangan Cetak</li>
                  <li>Desain Custom</li>
                  <li>Konsultasi Gratis</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>📱 WhatsApp: +62 812-3456-7890</li>
                  <li>📧 Email: info@nirmala.com</li>
                  <li>📍 Jakarta, Indonesia</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Nirmala. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}