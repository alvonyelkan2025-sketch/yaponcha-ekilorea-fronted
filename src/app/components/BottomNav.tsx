import { Home, ShoppingBag, Trophy, Coins, User } from 'lucide-react';
import { NavLink } from 'react-router';
import { motion } from 'motion/react';
import { useLanguageStore } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { useTranslation } from '../lib/translations';

const navItems = [
  { path: '/', icon: Home, labelKey: 'home' as const },
  { path: '/shop', icon: ShoppingBag, labelKey: 'shop' as const },
  { path: '/contest', icon: Trophy, labelKey: 'contest' as const },
  { path: '/token', icon: Coins, labelKey: 'token' as const },
  { path: '/profile', icon: User, labelKey: 'profile' as const },
];

export function BottomNav() {
  const { language } = useLanguageStore();
  const { isDark } = useThemeStore();
  const t = useTranslation(language);

  return (
    <motion.div
      initial={{ y: 72 }}
      animate={{ y: 0 }}
      className={`fixed bottom-0 left-0 right-0 h-18 backdrop-blur-xl border-t z-50 shadow-lg ${
        isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/80 border-purple-100'
      }`}
    >
      <div className="max-w-[390px] mx-auto h-full px-2 flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive 
                  ? isDark ? 'text-indigo-400' : 'text-indigo-600'
                  : isDark ? 'text-gray-400' : 'text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-2xl -z-10 scale-110 ${
                        isDark 
                          ? 'bg-gradient-to-br from-indigo-900/50 to-purple-900/50' 
                          : 'bg-gradient-to-br from-indigo-100 to-purple-100'
                      }`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-6 h-6 ${
                    isActive 
                      ? isDark ? 'text-indigo-400' : 'text-indigo-600'
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </motion.div>
                <span className={`text-xs font-medium ${
                  isActive 
                    ? isDark ? 'text-indigo-400' : 'text-indigo-600'
                    : isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {t[item.labelKey]}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
}