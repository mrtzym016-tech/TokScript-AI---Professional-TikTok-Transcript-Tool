
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onExtract: (url: string) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onExtract, isLoading }) => {
  const [url, setUrl] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  
  const steps = [
    "جاري فحص الرابط...", 
    "تحليل لغة الفيديو...", 
    "استخراج النص الأصلي بدقة...", 
    "معالجة البيانات...", 
    "أوشكنا على الانتهاء..."
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % steps.length);
      }, 1200);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onExtract(url);
    }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full blur-[120px] opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-pink-600 bg-pink-50 rounded-full border border-pink-100">
          دعم كامل للغات العالمية: يابانية، صينية، فرنسية، إلخ 🌏
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 leading-[1.1]">
          استخرج النص بـ <br /> 
          <span className="tiktok-text-gradient">لغة الفيديو الأصلية</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed" dir="rtl">
          تقنية متطورة تتعرف على لغة الفيديو وتستخرج النص حرفياً بدون ترجمة تلقائية، مثالي للتعلم والبحث.
        </p>

        <form onSubmit={handleSubmit} className="relative group max-w-2xl mx-auto mb-6">
          <div className="absolute -inset-1 tiktok-gradient rounded-2xl opacity-10 group-focus-within:opacity-100 transition duration-500 blur-md"></div>
          <div className="relative flex flex-col md:flex-row items-center bg-white border border-slate-200 rounded-2xl p-2 shadow-2xl focus-within:ring-2 ring-slate-900 transition-all">
            <div className="hidden md:block pl-4 text-slate-400">
              <i className="fa-brands fa-tiktok text-xl"></i>
            </div>
            <input
              dir="rtl"
              type="url"
              placeholder="ضع رابط فيديو التيك توك هنا..."
              className="w-full px-4 py-4 text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-slate-900 placeholder-slate-400 text-right"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full md:w-auto whitespace-nowrap px-10 py-4 rounded-xl font-black text-white transition-all transform active:scale-95 flex items-center justify-center ${
                isLoading ? 'bg-slate-800 cursor-not-allowed' : 'bg-slate-900 hover:bg-black hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  {steps[loadingStep]}
                </>
              ) : 'بدء الاستخراج'}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-6 items-center opacity-60 mt-12">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-language text-cyan-500"></i>
            <span className="text-xs font-bold text-slate-700">لغات متعددة</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-code text-cyan-500"></i>
            <span className="text-xs font-bold text-slate-700">تفريغ حرفي</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-bolt text-cyan-500"></i>
            <span className="text-xs font-bold text-slate-700">سرعة فائقة</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
