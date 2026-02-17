import { motion } from 'motion/react';
import { 
  User as UserIcon, Settings, CreditCard, Download, Award, 
  ChevronRight, Gift, Lock, Globe, Bell, Moon, LogOut
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { useTranslation } from '../lib/translations';
import { useAuthStore } from '../stores/authStore';
import { useTokenStore } from '../stores/tokenStore';
import { useAppStore } from '../stores/appStore';

export function Profile() {
  const { language } = useLanguageStore();
  const { isDark } = useThemeStore();
  const t = useTranslation(language);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { balance, earnedTotal } = useTokenStore();
  const { openAuthModal } = useAppStore();

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen pb-24 pt-20 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950' 
          : 'bg-gradient-to-br from-blue-50 via-cyan-100 to-purple-50'
      }`}>
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-32 left-8 text-6xl opacity-25"
        >
          👋
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/3 right-10 text-5xl opacity-20"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ x: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-40 left-12 text-7xl opacity-15"
        >
          💎
        </motion.div>

        <div className="max-w-[390px] mx-auto px-4">
          
          {/* Not Logged In State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Illustration */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-9xl mb-6"
            >
              👋
            </motion.div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {t.joinCommunity}
            </h1>
            <p className="text-gray-600 mb-8">
              Unlock premium content and start earning tokens!
            </p>

            {/* Benefits */}
            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 mb-8 shadow-lg">
              <div className="text-left space-y-4">
                {[
                  { icon: '✨', text: t.benefit1 },
                  { icon: '🎁', text: t.benefit2 },
                  { icon: '🔓', text: t.benefit3 },
                  { icon: '🏆', text: t.benefit4 },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xl">
                      {benefit.icon}
                    </div>
                    <span className="text-gray-700">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openAuthModal('register')}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all mb-4 flex items-center justify-center gap-2"
            >
              <Gift className="w-5 h-5" />
              {t.registerAndGetTokens}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600"
            >
              {t.alreadyHaveAccount}{' '}
              <button
                onClick={() => openAuthModal('login')}
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                {t.login}
              </button>
            </motion.div>

            {/* Decorative elements */}
            <div className="flex justify-center gap-4 mt-12 text-4xl opacity-50">
              <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                ✨
              </motion.div>
              <motion.div animate={{ rotate: [0, -10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                💎
              </motion.div>
              <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                🎁
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Logged In State
  return (
    <div className={`min-h-screen pb-24 pt-20 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-pink-950' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
    }`}>
      <div className="max-w-[390px] mx-auto px-4">
        
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-6 mb-6 shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 text-8xl opacity-10">✨</div>
          <div className="absolute bottom-0 left-0 text-8xl opacity-10">💎</div>

          <div className="relative z-10">
            {/* Avatar & Edit */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-4xl">
                    👤
                  </div>
                )}
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Settings className="w-4 h-4 text-indigo-600" />
                </button>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-white/80 text-sm">{user?.email}</p>
                <p className="text-white/60 text-xs mt-1">
                  {t.memberSince} {new Date(user?.memberSince || '').toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Token Balance */}
            <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/80 text-sm">{t.tokens}</div>
                  <div className="text-3xl font-bold text-white">{balance.toLocaleString()} 💰</div>
                </div>
                <div>
                  <div className="text-white/80 text-sm">{t.tokensEarned}</div>
                  <div className="text-2xl font-bold text-white">+{earnedTotal.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { label: 'Content', value: '12', icon: Download, color: 'from-blue-500 to-cyan-500' },
            { label: 'Contests', value: '5', icon: Award, color: 'from-purple-500 to-pink-500' },
            { label: 'Referrals', value: '0', icon: Gift, color: 'from-amber-500 to-orange-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-3xl p-4 shadow-lg text-white text-center`}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.accountSettings}</h3>

          <div className="space-y-2">
            {[
              { icon: UserIcon, label: t.personalInformation, badge: null },
              { icon: Lock, label: t.passwordSecurity, badge: null },
              { icon: Bell, label: t.notificationPreferences, badge: '3' },
              { icon: Globe, label: t.languageRegion, badge: null },
              { icon: Moon, label: t.theme, badge: null },
            ].map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`w-full backdrop-blur rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 group ${
                  isDark ? 'bg-gray-800/90' : 'bg-white/90'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                  isDark 
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50' 
                    : 'bg-gradient-to-br from-purple-100 to-pink-100'
                }`}>
                  <item.icon className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                
                <span className={`flex-1 text-left font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.label}</span>
                
                {item.badge && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
                
                <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Other Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-6"
        >
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Content & Activity</h3>

          <div className="space-y-2">
            {[
              { icon: CreditCard, label: t.purchaseHistory },
              { icon: Download, label: t.downloadedContent },
              { icon: Award, label: t.earnedRewards },
            ].map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.05 }}
                className={`w-full backdrop-blur rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3 group ${
                  isDark ? 'bg-gray-800/90' : 'bg-white/90'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900/50 to-cyan-900/50' 
                    : 'bg-gradient-to-br from-blue-100 to-cyan-100'
                }`}>
                  <item.icon className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                
                <span className={`flex-1 text-left font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.label}</span>
                
                <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          onClick={logout}
          className={`w-full rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 border ${
            isDark 
              ? 'bg-gradient-to-r from-red-900/30 to-pink-900/30 border-red-800' 
              : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-100'
          }`}
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="font-medium text-red-600">{t.logout}</span>
        </motion.button>
      </div>
    </div>
  );
}