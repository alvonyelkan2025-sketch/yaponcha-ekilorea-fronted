import { motion } from 'motion/react';
import { Gift, Sparkles, TrendingUp, Award, ShoppingBag, Users } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { useTranslation } from '../lib/translations';
import { useAuthStore } from '../stores/authStore';
import { useAppStore } from '../stores/appStore';
import { partners } from '../lib/partners';
import { toast } from 'sonner';

const features = [
  { icon: '📖', title: 'Free Content', titleJa: '無料コンテンツ', description: 'Enjoy a wide range of free content tailored to your interests.', descriptionJa: '興味に合った無料コンテンツを楽しむことができます。', tokenReward: '+500', cta: 'Get Started' },
  { icon: '💰', title: 'Token Rewards', titleJa: 'トークン報酬', description: 'Earn tokens for your contributions and activities.', descriptionJa: '貢献や活動でトークンを獲得できます。', tokenReward: '+1000', cta: 'Learn More' },
  { icon: '🎥', title: 'Exclusive Videos', titleJa: '限定動画', description: 'Access exclusive video content from our partners.', descriptionJa: 'パートナーからの限定動画コンテンツにアクセスできます。', tokenReward: '+200', cta: 'Watch Now' },
  { icon: '🏆', title: 'Contests', titleJa: 'コンテスト', description: 'Participate in exciting contests and win prizes.', descriptionJa: '興奮するコンテストに参加し賞品を獲得できます。', tokenReward: '+500', cta: 'Enter Now' },
  { icon: '🌐', title: 'Partner Network', titleJa: 'パートナーネットワーク', description: 'Connect with a global network of partners and creators.', descriptionJa: 'パートナーとクリエイターのグローバルネットワークに接続できます。', tokenReward: '+300', cta: 'Join Network' },
  { icon: '🔒', title: 'Secure Wallet', titleJa: '安全なウォレット', description: 'Store and manage your tokens securely with our wallet.', descriptionJa: '私たちのウォレットでトークンを安全に保管し、管理できます。', tokenReward: '+100', cta: 'Open Wallet' },
];

export function Home() {
  const { language } = useLanguageStore();
  const { isDark } = useThemeStore();
  const t = useTranslation(language);
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useAppStore();

  return (
    <div className={`min-h-screen pb-24 pt-20 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950' 
        : 'bg-gradient-to-br from-cyan-100 via-blue-200 to-purple-200'
    }`}>
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-indigo-600 to-purple-700 opacity-20' 
            : 'bg-gradient-to-br from-indigo-300 to-purple-400 opacity-40'
        }`}
      />
      <motion.div
        animate={{ 
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-1/4 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-cyan-600 to-blue-700 opacity-20' 
            : 'bg-gradient-to-br from-cyan-300 to-blue-400 opacity-40'
        }`}
      />
      <motion.div
        animate={{ 
          x: [0, 50, 0],
          y: [0, -100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-pink-600 to-rose-700 opacity-20' 
            : 'bg-gradient-to-br from-pink-300 to-rose-400 opacity-40'
        }`}
      />

      {/* Floating Animated Background Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-6xl opacity-30 z-10"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-10 text-7xl opacity-30 z-10"
      >
        💎
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-20 text-5xl opacity-30 z-10"
      >
        🌟
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          x: [0, 15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-60 right-20 text-6xl opacity-30 z-10"
      >
        🎁
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 text-5xl opacity-25 z-10"
      >
        🎀
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2/3 right-1/3 text-6xl opacity-25 z-10"
      >
        🌸
      </motion.div>

      <div className="max-w-[390px] mx-auto px-4 relative z-20">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 mb-6 shadow-2xl"
        >
          {/* Floating Emojis */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 right-4 text-4xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-4 left-4 text-3xl"
          >
            💎
          </motion.div>

          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-3"
            >
              {t.welcome}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 mb-6"
            >
              {t.welcomeSubtitle}
            </motion.p>

            {!isAuthenticated && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuthModal('register')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
              >
                <Gift className="w-5 h-5" />
                {t.registerCTA}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Token Incentive Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-3xl p-6 mb-6 shadow-lg ${
            isDark 
              ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' 
              : 'bg-white/80 backdrop-blur-lg border border-purple-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💰</span>
            <h2 className={`text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
              {t.earnTokens}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Gift, label: t.registerReward, tokens: '+500' },
              { icon: Award, label: t.loginReward, tokens: '+10' },
              { icon: ShoppingBag, label: t.purchaseReward, tokens: '+50' },
              { icon: Users, label: t.referralReward, tokens: '+100' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`rounded-2xl p-4 text-center ${
                  isDark 
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50' 
                    : 'bg-gradient-to-br from-purple-50 to-pink-50'
                }`}
              >
                <item.icon className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</div>
                <div className={`text-lg font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{item.tokens}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🤝</span>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.ourPartners}</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className={`flex-shrink-0 w-[280px] backdrop-blur rounded-3xl p-5 shadow-lg snap-center ${
                  isDark ? 'bg-gray-800/90' : 'bg-white/90'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gradient-to-br from-purple-200 to-pink-200"
                  />
                  <div className="flex-1">
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{partner.name}</div>
                    <div className={`text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{partner.username}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{partner.followers} followers</div>
                  </div>
                </div>
                <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{partner.bio}</p>
                <a
                  href={partner.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {t.visitInstagram}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌟</span>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.platformFeatures}</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`backdrop-blur rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all ${
                  isDark ? 'bg-gray-800/80' : 'bg-white/80'
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{feature.title}</h3>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
                
                {/* Token Reward Badge */}
                {feature.tokenReward && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl mb-4 ${
                    isDark 
                      ? 'bg-gradient-to-r from-emerald-900/50 to-green-900/50' 
                      : 'bg-gradient-to-r from-emerald-100 to-green-100'
                  }`}>
                    <span className="text-2xl">💰</span>
                    <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{feature.tokenReward}</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {feature.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA for Shop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <a
            href="/shop"
            className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all"
          >
            <div>
              <div className="text-lg font-bold mb-1">{t.freeContentSamples}</div>
              <div className="text-sm text-white/80">{t.seeMoreInShop}</div>
            </div>
            <Sparkles className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}