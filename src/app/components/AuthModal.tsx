import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../stores/appStore';
import { useAuthStore } from '../stores/authStore';
import { useTokenStore } from '../stores/tokenStore';
import { useLanguageStore } from '../stores/languageStore';
import { useTranslation } from '../lib/translations';
import { toast } from 'sonner';

export function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal } = useAppStore();
  const { register, login, socialLogin } = useAuthStore();
  const { addTokens } = useTokenStore();
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authModalMode === 'register') {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match!');
          return;
        }
        await register(name, email, password, referralCode);
        
        // Award 500 tokens for registration
        addTokens(500, 'Registration Bonus 🎉', 'earned');
        
        toast.success('🎉 Welcome! 500 tokens added to your wallet!');
      } else {
        await login(email, password);
        
        // Award 10 tokens for login
        addTokens(10, 'Daily Login Bonus 🌟', 'earned');
        
        toast.success('👋 Welcome back! 10 tokens added!');
      }
      
      closeAuthModal();
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setReferralCode('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'line') => {
    setLoading(true);
    try {
      await socialLogin(provider);
      
      if (authModalMode === 'register') {
        addTokens(500, 'Registration Bonus 🎉', 'earned');
        toast.success('🎉 Welcome! 500 tokens added!');
      } else {
        addTokens(10, 'Daily Login Bonus 🌟', 'earned');
        toast.success('👋 Welcome back! 10 tokens added!');
      }
      
      closeAuthModal();
    } catch (error) {
      toast.error('Social login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 text-9xl opacity-5">✨</div>
              <div className="absolute bottom-0 left-0 text-9xl opacity-5">💎</div>

              {/* Header */}
              <div className="relative p-6 bg-gradient-to-br from-indigo-500 to-purple-600">
                <button
                  onClick={closeAuthModal}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {authModalMode === 'register' ? '🎉' : '👋'}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {authModalMode === 'register' ? t.welcomeToEkilore : t.welcomeBack}
                  </h2>
                  {authModalMode === 'register' && (
                    <p className="text-white/90 text-sm flex items-center justify-center gap-1">
                      {t.getFreeTokens} <span className="text-xl">💰</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Social Login */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium text-gray-700">
                      {t.continueWith} Google
                    </span>
                  </button>

                  <button
                    onClick={() => handleSocialLogin('apple')}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="font-medium text-white">
                      {t.continueWith} Apple
                    </span>
                  </button>

                  <button
                    onClick={() => handleSocialLogin('line')}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#00B900] rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                    <span className="font-medium text-white">
                      {t.continueWith} LINE
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
                  <span className="text-sm text-gray-500">
                    {authModalMode === 'register' ? t.orRegisterWith : t.orLoginWith}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {authModalMode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.name}
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-purple-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                          placeholder={language === 'ja' ? 'お名前' : 'Your name'}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.email}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-purple-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.password}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-purple-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {authModalMode === 'register' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.confirmPassword}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-purple-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t.referralCode}
                        </label>
                        <input
                          type="text"
                          value={referralCode}
                          onChange={(e) => setReferralCode(e.target.value)}
                          className="w-full px-4 py-3 bg-white rounded-2xl border border-purple-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                          placeholder="PARTNER123"
                        />
                      </div>
                    </>
                  )}

                  {authModalMode === 'login' && (
                    <div className="text-right">
                      <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700">
                        {t.forgotPassword}
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t.loading : authModalMode === 'register' ? t.createAccount : t.login}
                  </button>
                </form>

                {/* Footer Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                  {authModalMode === 'register' ? t.alreadyHaveAccount : t.dontHaveAccount}
                  {' '}
                  <button
                    onClick={() => {
                      const newMode = authModalMode === 'register' ? 'login' : 'register';
                      useAppStore.getState().openAuthModal(newMode);
                    }}
                    className="text-indigo-600 font-medium hover:text-indigo-700"
                  >
                    {authModalMode === 'register' ? t.login : t.register}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}