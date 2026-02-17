import { motion } from 'motion/react';
import { Users, Clock, Trophy, Lock } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { useTranslation } from '../lib/translations';
import { useAuthStore } from '../stores/authStore';
import { useAppStore } from '../stores/appStore';
import { toast } from 'sonner';

interface Contest {
  id: number;
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  banner: string;
  prizePool: number;
  participants: number;
  endDate: string;
  requiresAuth: boolean;
}

const anonymousContests: Contest[] = [
  {
    id: 1,
    title: 'Photography Contest: Japanese Beauty',
    titleJa: '写真コンテスト：日本の美',
    description: 'Share your best photos capturing Japanese aesthetics',
    descriptionJa: '日本の美学を捉えたあなたのベストショットを共有',
    banner: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400',
    prizePool: 5000,
    participants: 342,
    endDate: '2026-03-15',
    requiresAuth: false,
  },
  {
    id: 2,
    title: 'Creative Writing: My Japan Story',
    titleJa: 'クリエイティブライティング：私の日本物語',
    description: 'Write a short story inspired by Japanese culture',
    descriptionJa: '日本文化にインスパイアされた短編を書く',
    banner: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
    prizePool: 3000,
    participants: 189,
    endDate: '2026-03-20',
    requiresAuth: false,
  },
];

const memberContests: Contest[] = [
  {
    id: 3,
    title: 'Premium Video Contest: Japan Travel Vlog',
    titleJa: 'プレミアムビデオコンテスト：日本旅行Vlog',
    description: 'Create the best Japan travel vlog (members only)',
    descriptionJa: '最高の日本旅行Vlogを作成（メンバー限定）',
    banner: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400',
    prizePool: 10000,
    participants: 67,
    endDate: '2026-04-01',
    requiresAuth: true,
  },
  {
    id: 4,
    title: 'Exclusive Art Contest: Anime Style',
    titleJa: '限定アートコンテスト：アニメスタイル',
    description: 'Submit your anime-inspired artwork',
    descriptionJa: 'アニメインスパイアされたアートワークを提出',
    banner: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400',
    prizePool: 7500,
    participants: 134,
    endDate: '2026-03-25',
    requiresAuth: true,
  },
  {
    id: 5,
    title: 'Members Challenge: Japanese Recipe',
    titleJa: 'メンバーチャレンジ：日本料理レシピ',
    description: 'Share your unique Japanese recipe creation',
    descriptionJa: 'あなたのユニークな日本料理レシピを共有',
    banner: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400',
    prizePool: 4000,
    participants: 98,
    endDate: '2026-03-30',
    requiresAuth: true,
  },
];

export function Contest() {
  const { language } = useLanguageStore();
  const { isDark } = useThemeStore();
  const t = useTranslation(language);
  const { isAuthenticated } = useAuthStore();
  const { openAuthModal } = useAppStore();

  const handleJoinContest = (contest: Contest) => {
    if (contest.requiresAuth && !isAuthenticated) {
      toast.error('Please login to participate in this contest');
      openAuthModal('login');
      return;
    }
    
    toast.success('🎉 Successfully joined the contest!');
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className={`min-h-screen pb-24 pt-20 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-100 to-purple-100'
    }`}>
      {/* Floating Kawaii Trophy Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-28 left-6 text-6xl opacity-25"
      >
        🏆
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 right-8 text-5xl opacity-30"
      >
        🎯
      </motion.div>
      <motion.div
        animate={{ 
          rotate: [0, -10, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-32 left-12 text-7xl opacity-20"
      >
        ⭐
      </motion.div>

      <div className="max-w-[390px] mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t.activeContests}
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t.winTokens}</p>
        </motion.div>

        {/* Anonymous Contests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 ${
              isDark 
                ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50' 
                : 'bg-gradient-to-r from-green-100 to-emerald-100'
            }`}>
              <span className="text-xl">✨</span>
              <span className={`font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>{t.noRegistrationRequired}</span>
            </div>
          </div>

          <div className="space-y-4">
            {anonymousContests.map((contest, index) => {
              const title = language === 'ja' ? contest.titleJa : contest.title;
              const description = language === 'ja' ? contest.descriptionJa : contest.description;
              const daysRemaining = getDaysRemaining(contest.endDate);

              return (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                    isDark ? 'bg-gray-800/90' : 'bg-white/90'
                  }`}
                >
                  {/* Banner */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={contest.banner}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Prize Pool */}
                    <div className="absolute bottom-3 left-3 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl flex items-center gap-2 shadow-lg">
                      <Trophy className="w-5 h-5 text-white" />
                      <div>
                        <div className="text-xs text-white/90">{t.prizePool}</div>
                        <div className="text-lg font-bold text-white">{contest.prizePool} 💰</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>

                    {/* Meta Info */}
                    <div className={`flex items-center gap-4 mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{contest.participants} {t.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{daysRemaining}d {t.endingSoon}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleJoinContest(contest)}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      {t.joinNow}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Member Contests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 ${
              isDark 
                ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50' 
                : 'bg-gradient-to-r from-indigo-100 to-purple-100'
            }`}>
              <Lock className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className={`font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>{t.membersOnly}</span>
            </div>
          </div>

          <div className="space-y-4">
            {memberContests.map((contest, index) => {
              const title = language === 'ja' ? contest.titleJa : contest.title;
              const description = language === 'ja' ? contest.descriptionJa : contest.description;
              const daysRemaining = getDaysRemaining(contest.endDate);

              return (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                    isDark ? 'bg-gray-800/90' : 'bg-white/90'
                  } ${!isAuthenticated ? 'opacity-75' : ''}`}
                >
                  {/* Banner */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={contest.banner}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {!isAuthenticated && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                          <div className="text-white font-bold">{t.membersOnly}</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Prize Pool */}
                    <div className="absolute bottom-3 left-3 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl flex items-center gap-2 shadow-lg">
                      <Trophy className="w-5 h-5 text-white" />
                      <div>
                        <div className="text-xs text-white/90">{t.prizePool}</div>
                        <div className="text-lg font-bold text-white">{contest.prizePool} 💰</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>

                    {/* Meta Info */}
                    <div className={`flex items-center gap-4 mb-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{contest.participants} {t.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{daysRemaining}d {t.endingSoon}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleJoinContest(contest)}
                      className={`w-full py-3 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all ${
                        isAuthenticated
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {isAuthenticated ? t.joinNow : t.loginToParticipate}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}