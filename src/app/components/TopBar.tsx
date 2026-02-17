import { Menu, Bell, Globe, Moon, Sun } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useLanguageStore, Language } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { motion } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export function TopBar() {
  const { toggleSideDrawer, notificationCount } = useAppStore();
  const { language, setLanguage } = useLanguageStore();
  const { isDark, toggleTheme } = useThemeStore();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
  ];

  return (
    <motion.div
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 h-16 border-b z-50 backdrop-blur-lg shadow-lg ${
        isDark 
          ? 'bg-gray-900/90 border-gray-700' 
          : 'bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 border-blue-100'
      }`}
    >
      <div className="max-w-[390px] mx-auto h-full px-4 flex items-center justify-between">
        {/* Left: Hamburger */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSideDrawer}
          className={`w-10 h-10 rounded-2xl backdrop-blur flex items-center justify-center shadow-md hover:shadow-lg transition-all ${
            isDark ? 'bg-gray-800/80' : 'bg-white/80'
          }`}
        >
          <Menu className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
        </motion.button>

        {/* Center: Brand Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            EKILORE
          </motion.div>
          <motion.span
            className="text-xl"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </div>

        {/* Right: Theme + Notifications + Language */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-2xl backdrop-blur flex items-center justify-center shadow-md hover:shadow-lg transition-all ${
              isDark ? 'bg-gray-800/80' : 'bg-white/80'
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-2xl backdrop-blur flex items-center justify-center shadow-md hover:shadow-lg transition-all relative ${
              isDark ? 'bg-gray-800/80' : 'bg-white/80'
            }`}
          >
            <Bell className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-2xl backdrop-blur flex items-center justify-center shadow-md hover:shadow-lg transition-all ${
                  isDark ? 'bg-gray-800/80' : 'bg-white/80'
                }`}
              >
                <Globe className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`mt-2 mr-4 backdrop-blur-lg rounded-2xl shadow-2xl border p-2 min-w-[160px] ${
              isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-purple-100'
            }`}>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-4 py-3 rounded-xl cursor-pointer transition-all outline-none ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-indigo-100 to-purple-100'
                      : isDark ? 'hover:bg-gray-700' : 'hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{lang.label}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}