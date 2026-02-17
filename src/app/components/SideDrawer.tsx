import { X, Info, HelpCircle, MessageCircle, FileText, Mail, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { useTranslation } from '../lib/translations';

export function SideDrawer() {
  const { sideDrawerOpen, closeSideDrawer } = useAppStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { language } = useLanguageStore();
  const { isDark, toggleTheme } = useThemeStore();
  const t = useTranslation(language);

  const menuItems = [
    { icon: Info, label: 'About EKILORE', emoji: 'ℹ️' },
    { icon: HelpCircle, label: 'How it Works', emoji: '❓' },
    { icon: MessageCircle, label: 'FAQ', emoji: '💬' },
    { icon: FileText, label: 'Terms & Privacy', emoji: '📄' },
    { icon: Mail, label: 'Contact Support', emoji: '📧' },
    { icon: Settings, label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <AnimatePresence>
      {sideDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSideDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-gradient-to-br from-white via-purple-50 to-pink-50 z-50 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-8xl opacity-10">✨</div>
              <button
                onClick={closeSideDrawer}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* User Info */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-2xl shadow-lg">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      '👤'
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{user.name}</div>
                    <div className="text-white/80 text-sm">{user.email}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                    👋
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">Guest User</div>
                    <div className="text-white/80 text-sm">Join EKILORE!</div>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all mb-2 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </motion.button>
              ))}

              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all mb-2 group"
              >
                {isDark ? (
                  <Moon className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                )}
                <span className="font-medium text-gray-700">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                <div className={`ml-auto w-12 h-6 rounded-full relative transition-all ${
                  isDark ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gradient-to-r from-purple-200 to-pink-200'
                }`}>
                  <motion.div 
                    animate={{ x: isDark ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </div>
              </motion.button>

              {/* Logout */}
              {isAuthenticated && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => {
                    logout();
                    closeSideDrawer();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all mt-4"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-600">{t.logout}</span>
                </motion.button>
              )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/80 to-transparent">
              <div className="text-center text-xs text-gray-500">
                © 2026 EKILORE ✨
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}