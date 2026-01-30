
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(false); // Default to registration for new users
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] transform transition-all border border-slate-100">
        <div className="p-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isLogin ? 'أهلاً بعودتك' : 'ابدأ رحلتك'}
            </h2>
            <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors">
              <i className="fa-solid fa-circle-xmark text-2xl"></i>
            </button>
          </div>

          {!isLogin && (
            <div className="bg-cyan-50 border border-cyan-100 p-4 rounded-2xl mb-8 text-right" dir="rtl">
              <p className="text-sm font-bold text-cyan-700">سجل الآن للوصول الكامل لجميع ميزات الموقع مجاناً.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 mr-1">البريد الإلكتروني</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-cyan-400/20 focus:border-cyan-400 outline-none transition-all bg-slate-50 text-slate-900"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 mr-1">كلمة المرور</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-pink-400/20 focus:border-pink-400 outline-none transition-all bg-slate-50 text-slate-900"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 tiktok-gradient text-white font-black text-lg rounded-2xl shadow-xl hover:opacity-90 transition-all transform active:scale-95 mt-4"
            >
              {isLogin ? 'دخول فوري' : 'إنشاء حساب مجاني'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-slate-400 hover:text-pink-500 transition-colors"
            >
              {isLogin ? 'ليس لديك حساب؟ سجل حساباً جديداً' : 'لديك حساب بالفعل؟ سجل دخولك من هنا'}
            </button>
          </div>
        </div>
        <div className="bg-slate-50/50 p-6 text-center border-t border-slate-100">
          <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
            <i className="fa-solid fa-shield-halved"></i>
            <span>تشفير بيانات آمن 256-بت</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
