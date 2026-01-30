
import React from 'react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogin, onLogout }) => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 tiktok-gradient rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <span className="text-xl font-extrabold tracking-tight">TokScript <span className="text-slate-500">AI</span></span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-pink-500 transition-colors">الميزات</a>
            <button onClick={scrollToPricing} className="hover:text-pink-500 transition-colors">الأسعار</button>
            <a href="#faq" className="hover:text-pink-500 transition-colors">الأسئلة</a>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-slate-700 hidden sm:inline-block">{user.email.split('@')[0]}</span>
                <button 
                  onClick={onLogout}
                  className="text-sm font-semibold text-red-500 px-4 py-2 rounded-full hover:bg-red-50 transition-all"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="text-sm font-semibold text-slate-700 px-4 py-2 rounded-full hover:bg-slate-100 transition-all"
              >
                تسجيل الدخول
              </button>
            )}
            
            {(!user || !user.isPro) && (
              <button 
                onClick={scrollToPricing}
                className="tiktok-gradient text-sm font-bold text-white px-5 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-all"
              >
                Go Pro
              </button>
            )}
            {user?.isPro && (
              <div className="px-4 py-1.5 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase rounded-full shadow-sm">
                Pro Member
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-right" dir="rtl">
          <div className="col-span-1 md:col-span-1 text-right">
            <div className="flex items-center justify-end space-x-2 mb-6">
              <span className="text-xl font-bold text-white">TokScript AI</span>
              <div className="w-8 h-8 tiktok-gradient rounded-lg flex items-center justify-center text-white font-bold ml-2">T</div>
            </div>
            <p className="text-sm leading-relaxed">
              أداة احترافية مدعومة بالذكاء الاصطناعي لاستخراج النصوص من فيديوهات تيك توك فوراً. 
              مصممة لصناع المحتوى والباحثين.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">المنتج</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white">مستخرج النصوص</a></li>
              <li><a href="#" className="hover:text-white">ملخص الذكاء الاصطناعي</a></li>
              <li><a href="#" className="hover:text-white">مترجم الفيديوهات</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">المصادر</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#faq" className="hover:text-white">المساعدة والأسئلة</a></li>
              <li><a href="#" className="hover:text-white">المدونة التعليمية</a></li>
              <li><a href="#" className="hover:text-white">سياسة الخصوصية</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">قانوني</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white">شروط الخدمة</a></li>
              <li><a href="#" className="hover:text-white">سياسة الكوكيز</a></li>
              <li><a href="#" className="hover:text-white">إخلاء المسؤولية</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-xs text-center">
          <p className="mb-4 text-slate-500">إخلاء مسؤولية: لا يستضيف هذا الموقع أو ينزل فيديوهات تيك توك. نحن نستخرج فقط النصوص الصوتية المتاحة علناً لأغراض تعليمية.</p>
          <p className="text-slate-600">© {new Date().getFullYear()} TokScript AI. جميع الحقوق محفوظة. غير تابع لشركة TikTok أو ByteDance.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
