import { Outlet } from 'react-router';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { SideDrawer } from './SideDrawer';
import { AuthModal } from './AuthModal';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <div className="relative min-h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <main className="relative">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Side Drawer */}
      <SideDrawer />

      {/* Auth Modal */}
      <AuthModal />

      {/* Toast Notifications */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'linear-gradient(to right, #6366f1, #a855f7)',
            color: '#fff',
            border: 'none',
            borderRadius: '1.5rem',
            padding: '1rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
          },
        }}
      />
    </div>
  );
}
