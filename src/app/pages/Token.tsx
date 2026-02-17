import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Coins, ArrowUpRight, ArrowDownRight, ShoppingBag, Gift, 
  CheckCircle, Copy, Share2, Users, TrendingUp, Clock, LogIn,
  UserPlus, Star, ExternalLink
} from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { useTranslation } from '../lib/translations';
import { useTokenStore } from '../stores/tokenStore';
import { useAuthStore } from '../stores/authStore';
import { useAppStore } from '../stores/appStore';
import { toast } from 'sonner';

const tokenPackages = [
  { tokens: 1000, price: 2.2, bonus: 0, bestValue: false },
  { tokens: 5000, price: 10, bonus: 10, bestValue: true },
  { tokens: 10000, price: 18, bonus: 15, bestValue: false },
  { tokens: 25000, price: 40, bonus: 20, bestValue: false },
];

const partners = [
  {
    id: 1,
    username: '@partner_two',
    name: 'Partner Two',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    instagramUrl: 'https://instagram.com',
    reward: 20,
  },
  {
    id: 2,
    username: '@partner_three',
    name: 'Partner Three',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    instagramUrl: 'https://instagram.com',
    reward: 20,
  },
  {
    id: 3,
    username: '@partner_four',
    name: 'Partner Four',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    instagramUrl: 'https://instagram.com',
    reward: 20,
  },
  {
    id: 4,
    username: '@partner_five',
    name: 'Partner Five',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    instagramUrl: 'https://instagram.com',
    reward: 20,
  },
];

export function Token() {
  const [showSurvey, setShowSurvey] = useState(false);
  const { language } = useLanguageStore();
  const { isDark } = useThemeStore();
  const t = useTranslation(language);
  const { balance, transactions, earnedTotal, addTokens } = useTokenStore();
  const { user, isAuthenticated } = useAuthStore();
  const { openAuthModal } = useAppStore();

  const handleBuyTokens = (pkg: typeof tokenPackages[0]) => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase tokens');
      openAuthModal('login');
      return;
    }
    
    // Mock Paddle payment
    toast.success(`Payment processing... (Mock Paddle integration)`);
    setTimeout(() => {
      const totalTokens = pkg.tokens + (pkg.tokens * pkg.bonus / 100);
      addTokens(totalTokens, `Purchased ${pkg.tokens} tokens (+${pkg.bonus}% bonus)`, 'purchased');
      toast.success(`🎉 ${totalTokens} tokens added to your wallet!`);
    }, 2000);
  };

  const handleClaimReward = (reward: { amount: number; description: string }) => {
    if (!isAuthenticated) {
      toast.error('Please login to claim rewards');
      openAuthModal('login');
      return;
    }
    
    addTokens(reward.amount, reward.description, 'earned');
    toast.success(`🎁 +${reward.amount} tokens claimed!`);
  };

  const handleCopyReferralLink = () => {
    const referralLink = `https://ekilore.com/?ref=${user?.referralCode || 'DEMO123'}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('📋 Referral link copied!');
  };

  const handlePartnerVisit = (partner: typeof partners[0]) => {
    window.open(partner.instagramUrl, '_blank');
    
    setTimeout(() => {
      if (isAuthenticated) {
        addTokens(partner.reward, `Visited ${partner.username}`, 'earned');
        toast.success(`🎁 +${partner.reward} tokens for visiting ${partner.username}!`);
      }
    }, 3000);
  };

  return (
    <div className={`min-h-screen pb-24 pt-20 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950' 
        : 'bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-100'
    }`}>
      {/* Floating Money & Coin Elements */}
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-24 right-12 text-6xl opacity-30"
      >
        💰
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -15, 0],
          rotate: [0, -20, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/3 left-8 text-5xl opacity-25"
      >
        🪙
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-1/3 right-6 text-7xl opacity-20"
      >
        💎
      </motion.div>
      <motion.div
        animate={{ 
          x: [0, 20, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-1/4 left-10 text-5xl opacity-25"
      >
        ✨
      </motion.div>

      <div className="max-w-[390px] mx-auto px-4">
        
        {/* Wallet Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 mb-6 shadow-2xl"
        >
          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-white/80 text-sm">
              <Coins className="w-4 h-4" />
              <span>{t.myWallet}</span>
            </div>
            
            <motion.div
              key={balance}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <span className="text-4xl">💰</span>
              {balance.toLocaleString()}
            </motion.div>

            <div className="flex items-center gap-4 text-white/90 text-sm">
              <div>
                <div className="text-white/60">Total Earned</div>
                <div className="font-bold">+{earnedTotal.toLocaleString()}</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <div className="text-white/60">USD Value</div>
                <div className="font-bold">${(balance * 0.0022).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Buy Tokens Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎁</span>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.getMoreTokens}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {tokenPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative backdrop-blur rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all ${
                  isDark ? 'bg-gray-800/90' : 'bg-white/90'
                } ${pkg.bestValue ? 'ring-2 ring-amber-400' : ''}`}
              >
                {pkg.bestValue && (
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl text-xs font-bold text-white shadow-lg">
                    {t.bestValue}
                  </div>
                )}
                
                {pkg.bonus > 0 && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 rounded-full text-xs font-bold text-white">
                    +{pkg.bonus}%
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {pkg.tokens.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">{t.tokens}</div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-indigo-600">
                    ${pkg.price}
                  </div>
                </div>

                <button
                  onClick={() => handleBuyTokens(pkg)}
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {t.buyNow}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>🔒</span>
            <span>Secure payment via Paddle</span>
          </div>
        </motion.div>

        {/* Earn Free Tokens Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌟</span>
            <h2 className="text-xl font-bold text-gray-800">{t.earnFreeTokens}</h2>
          </div>

          <div className="space-y-3">
            {[
              { icon: LogIn, label: t.dailyLogin, tokens: 10, action: 'daily' },
              { icon: UserPlus, label: t.completeProfile, tokens: 50, action: 'profile' },
              { icon: ShoppingBag, label: t.firstPurchase, tokens: 100, action: 'purchase' },
              { icon: Users, label: t.referFriends, tokens: 100, action: 'referral' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-indigo-600" />
                </div>
                
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{item.label}</div>
                  <div className="text-sm text-amber-600 font-bold">+{item.tokens} tokens</div>
                </div>

                <button
                  onClick={() => handleClaimReward({ amount: item.tokens, description: item.label })}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-medium shadow-md hover:shadow-lg transition-all text-sm"
                >
                  {t.claim}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visit Partners & Earn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💎</span>
            <h2 className="text-xl font-bold text-gray-800">{t.visitPartners}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-3xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center mb-3">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover mb-2 border-4 border-gradient-to-br from-purple-200 to-pink-200"
                  />
                  <div className="font-bold text-sm text-gray-800 text-center">{partner.name}</div>
                  <div className="text-xs text-indigo-600">{partner.username}</div>
                </div>

                <button
                  onClick={() => handlePartnerVisit(partner)}
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1 text-sm"
                >
                  <ExternalLink className="w-3 h-3" />
                  +{partner.reward}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Survey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">📊</div>
              <div>
                <h3 className="text-xl font-bold">{t.quickSurvey}</h3>
                <p className="text-sm text-white/90">{t.helpUs}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{t.estimatedTime}: 2 {t.minutes}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>+30 tokens</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!isAuthenticated) {
                  toast.error('Please login to take survey');
                  openAuthModal('login');
                  return;
                }
                addTokens(30, 'Survey Completion 📊', 'earned');
                toast.success('🎉 Survey completed! +30 tokens');
              }}
              className="w-full py-3 bg-white text-blue-600 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all"
            >
              {t.startSurvey}
            </button>
          </div>
        </motion.div>

        {/* Referral Section */}
        {isAuthenticated && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎁</span>
              <h2 className="text-xl font-bold text-gray-800">{t.inviteFriends}</h2>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-3xl p-6 shadow-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.yourReferralLink}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`ekilore.com/?ref=${user.referralCode}`}
                    className="flex-1 px-4 py-3 bg-purple-50 rounded-2xl border border-purple-200 text-sm"
                  />
                  <button
                    onClick={handleCopyReferralLink}
                    className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-indigo-600">0</div>
                  <div className="text-xs text-gray-600">{t.totalReferrals}</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-amber-600">0</div>
                  <div className="text-xs text-gray-600">{t.tokensEarned}</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-2xl">
                  <div className="text-2xl font-bold text-green-600">100</div>
                  <div className="text-xs text-gray-600">Per Friend</div>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Link
              </button>
            </div>
          </motion.div>
        )}

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <h2 className="text-xl font-bold text-gray-800">{t.transactionHistory}</h2>
            </div>
          </div>

          <div className="space-y-2">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-md flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  tx.type === 'earned' ? 'bg-green-100' : 
                  tx.type === 'spent' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {tx.type === 'earned' ? <ArrowDownRight className="w-5 h-5 text-green-600" /> :
                   tx.type === 'spent' ? <ArrowUpRight className="w-5 h-5 text-red-600" /> :
                   <ShoppingBag className="w-5 h-5 text-blue-600" />}
                </div>

                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm">{tx.description}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(tx.date).toLocaleDateString()}
                  </div>
                </div>

                <div className={`text-lg font-bold ${
                  tx.type === 'earned' || tx.type === 'purchased' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {tx.type === 'spent' ? '-' : '+'}{tx.amount}
                </div>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No transactions yet. Start earning tokens! 🎁
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}