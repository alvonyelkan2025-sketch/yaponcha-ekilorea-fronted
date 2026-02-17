import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Eye, Lock, FileText, Video, File, Image as ImageIcon } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { useThemeStore } from '../stores/themeStore';
import { useTranslation } from '../lib/translations';
import { useAuthStore } from '../stores/authStore';
import { useTokenStore } from '../stores/tokenStore';
import { useAppStore } from '../stores/appStore';
import { toast } from 'sonner';

type ContentType = 'article' | 'video' | 'document' | 'image';

interface Content {
  id: number;
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  type: ContentType;
  thumbnail: string;
  views: number;
  downloads: number;
  tokenPrice?: number;
  author: string;
  date: string;
}

const freeContent: Content[] = [
  {
    id: 1,
    title: 'Introduction to Japanese Culture',
    titleJa: '日本文化入門',
    description: 'Discover the rich traditions and customs of Japan',
    descriptionJa: '日本の豊かな伝統と習慣を発見',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400',
    views: 1250,
    downloads: 340,
    author: 'EKILORE Team',
    date: '2026-02-10',
  },
  {
    id: 2,
    title: 'Japanese Cooking Basics',
    titleJa: '日本料理の基礎',
    description: 'Learn fundamental Japanese cooking techniques',
    descriptionJa: '基本的な日本料理のテクニックを学ぶ',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    views: 2100,
    downloads: 567,
    author: 'Chef Tanaka',
    date: '2026-02-12',
  },
  {
    id: 3,
    title: 'Tokyo Travel Guide PDF',
    titleJa: '東京旅行ガイドPDF',
    description: 'Complete guide to exploring Tokyo',
    descriptionJa: '東京を探索するための完全ガイド',
    type: 'document',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    views: 980,
    downloads: 423,
    author: 'Travel Expert',
    date: '2026-02-08',
  },
  {
    id: 4,
    title: 'Cherry Blossom Wallpapers',
    titleJa: '桜の壁紙',
    description: 'Beautiful sakura season photos',
    descriptionJa: '美しい桜の季節の写真',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400',
    views: 3400,
    downloads: 1200,
    author: 'Photo Collection',
    date: '2026-02-15',
  },
];

const premiumContent: Content[] = [
  {
    id: 5,
    title: 'Advanced Japanese Business Etiquette',
    titleJa: '上級日本ビジネスマナー',
    description: 'Master professional Japanese business culture',
    descriptionJa: 'プロフェッショナルな日本のビジネス文化をマスター',
    type: 'article',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
    views: 890,
    downloads: 156,
    tokenPrice: 50,
    author: 'Business Expert',
    date: '2026-02-14',
  },
  {
    id: 6,
    title: 'Japanese Language Masterclass',
    titleJa: '日本語マスタークラス',
    description: 'Complete video course for fluency',
    descriptionJa: '流暢さのための完全なビデオコース',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
    views: 1560,
    downloads: 234,
    tokenPrice: 100,
    author: 'Language Teacher',
    date: '2026-02-16',
  },
  {
    id: 7,
    title: 'Premium Japan Investment Guide',
    titleJa: 'プレミアム日本投資ガイド',
    description: 'Exclusive market analysis and strategies',
    descriptionJa: '独占的な市場分析と戦略',
    type: 'document',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    views: 567,
    downloads: 89,
    tokenPrice: 150,
    author: 'Finance Pro',
    date: '2026-02-17',
  },
  {
    id: 8,
    title: '4K Japan Scenery Collection',
    titleJa: '4K日本風景コレクション',
    description: 'Ultra HD photos of Japanese landscapes',
    descriptionJa: '日本の風景の超HD写真',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400',
    views: 2300,
    downloads: 345,
    tokenPrice: 75,
    author: 'Pro Photographer',
    date: '2026-02-13',
  },
];

const contentIcons = {
  article: FileText,
  video: Video,
  document: File,
  image: ImageIcon,
};

export function Shop() {
  const [activeTab, setActiveTab] = useState<'free' | 'premium'>('free');
  const [filter, setFilter] = useState<'all' | ContentType>('all');
  const { language } = useLanguageStore();
  const { isDark } = useThemeStore();
  const t = useTranslation(language);
  const { isAuthenticated } = useAuthStore();
  const { balance, spendTokens } = useTokenStore();
  const { openAuthModal } = useAppStore();

  const currentContent = activeTab === 'free' ? freeContent : premiumContent;
  const filteredContent = filter === 'all' 
    ? currentContent 
    : currentContent.filter(c => c.type === filter);

  const handleDownload = (content: Content) => {
    if (content.tokenPrice) {
      if (!isAuthenticated) {
        toast.error('Please login to unlock premium content');
        openAuthModal('login');
        return;
      }
      
      if (balance < content.tokenPrice) {
        toast.error(`Insufficient tokens. You need ${content.tokenPrice} tokens.`);
        return;
      }
      
      const success = spendTokens(content.tokenPrice, `Unlocked: ${content.title}`);
      if (success) {
        toast.success(`✨ Content unlocked! -${content.tokenPrice} tokens`);
      }
    } else {
      toast.success('📥 Download started!');
    }
  };

  return (
    <div className={`min-h-screen pb-24 pt-20 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950' 
        : 'bg-gradient-to-br from-blue-100 via-cyan-200 to-purple-200'
    }`}>
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-purple-600 to-pink-700 opacity-20' 
            : 'bg-gradient-to-br from-purple-300 to-pink-400 opacity-40'
        }`}
      />
      <motion.div
        animate={{ 
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-0 left-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-cyan-600 to-indigo-700 opacity-20' 
            : 'bg-gradient-to-br from-cyan-300 to-indigo-400 opacity-40'
        }`}
      />

      {/* Floating Kawaii Elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-24 right-8 text-5xl opacity-30 z-10"
      >
        🛍️
      </motion.div>
      <motion.div
        animate={{ 
          y: [0, 25, 0],
          x: [0, -10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/3 left-4 text-4xl opacity-25 z-10"
      >
        📦
      </motion.div>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-1/4 right-10 text-6xl opacity-25 z-10"
      >
        ✨
      </motion.div>

      <div className="max-w-[390px] mx-auto px-4 relative z-20">
        
        {/* Tabs */}
        <div className={`sticky top-16 z-40 backdrop-blur-lg rounded-3xl p-2 mb-6 shadow-lg ${
          isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-purple-100'
        }`}>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('free')}
              className={`py-3 rounded-2xl font-medium transition-all ${
                activeTab === 'free'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              {t.freeContentTab}
            </button>
            <button
              onClick={() => setActiveTab('premium')}
              className={`py-3 rounded-2xl font-medium transition-all ${
                activeTab === 'premium'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              {t.premiumContentTab}
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {[
            { value: 'all' as const, label: t.all, icon: '🌐' },
            { value: 'article' as const, label: t.articles, icon: '📝' },
            { value: 'video' as const, label: t.videos, icon: '🎥' },
            { value: 'document' as const, label: t.documents, icon: '📄' },
            { value: 'image' as const, label: t.images, icon: '🖼️' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl font-medium transition-all ${
                filter === item.value
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : isDark ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700' : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredContent.map((content, index) => {
            const Icon = contentIcons[content.type];
            const title = language === 'ja' ? content.titleJa : content.title;
            const description = language === 'ja' ? content.descriptionJa : content.description;

            return (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`backdrop-blur rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                  isDark ? 'bg-gray-800/90' : 'bg-white/90'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={content.thumbnail}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 px-3 py-1 bg-black/60 backdrop-blur rounded-full flex items-center gap-1">
                    <Icon className="w-3 h-3 text-white" />
                    <span className="text-xs text-white capitalize">{content.type}</span>
                  </div>

                  {/* Premium Badge */}
                  {content.tokenPrice && (
                    <div className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center gap-1 shadow-lg">
                      <span className="text-xs font-bold text-white">💰 {content.tokenPrice}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className={`font-bold text-sm mb-2 line-clamp-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {title}
                  </h3>
                  <p className={`text-xs mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {description}
                  </p>

                  {/* Meta */}
                  <div className={`flex items-center gap-3 text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {content.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {content.downloads}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleDownload(content)}
                    className={`w-full py-2 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
                      content.tokenPrice
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md hover:shadow-lg'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {content.tokenPrice ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">{t.unlockWithTokens}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span className="text-sm">{t.downloadFree}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
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