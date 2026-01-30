
import React from 'react';
import { Plan } from '../types';

interface PricingProps {
  onStartFree: () => void;
  onUpgrade: () => void;
}

const plans: Plan[] = [
  {
    name: "Free / مجاني",
    price: "$0",
    features: [
      "3 Extractions per day / 3 عمليات يومياً",
      "Standard Transcript / تفريغ نصي قياسي",
      "Basic AI Summaries / ملخصات بسيطة",
      "Ad-supported / مدعوم بالإعلانات"
    ],
    cta: "Start for Free / ابدأ مجاناً"
  },
  {
    name: "Pro Creator / المحترف",
    price: "$5",
    highlighted: true,
    features: [
      "Unlimited Extractions / عمليات غير محدودة",
      "Advanced AI / ذكاء اصطناعي متقدم",
      "Article Generator / محول لمقالات",
      "No Ads / بدون إعلانات",
      "Priority Support / دعم فني مباشر"
    ],
    cta: "Upgrade to Pro / اشترك الآن"
  },
  {
    name: "Enterprise / للشركات",
    price: "Custom",
    features: [
      "API Access / وصول برمجي",
      "Team Collaboration / عمل جماعي",
      "Dedicated Manager / مدير حساب خاص"
    ],
    cta: "Contact Sales / اتصل بنا"
  }
];

const Pricing: React.FC<PricingProps> = ({ onStartFree, onUpgrade }) => {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">باقات الأسعار</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">اختر الخطة التي تناسب احتياجاتك الإبداعية.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted 
                  ? 'bg-white shadow-2xl ring-4 ring-cyan-400 scale-105 z-10' 
                  : 'bg-white/60 border border-slate-200 shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 tiktok-gradient text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                  Most Popular / الأكثر طلباً
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-slate-500 ml-1">/mo</span>}
              </div>
              <ul className="space-y-4 mb-10 text-right" dir="rtl">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-sm text-slate-600">
                    <i className="fa-solid fa-check-circle text-cyan-500 ml-3"></i> {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={plan.price === "$0" ? onStartFree : (plan.price === "$5" ? onUpgrade : undefined)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.highlighted 
                  ? 'tiktok-gradient text-white shadow-xl hover:opacity-95' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
