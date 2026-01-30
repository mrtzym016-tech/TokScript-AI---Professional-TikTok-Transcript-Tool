
import React, { useState } from 'react';
import { FAQItem } from '../types';

const faqs: FAQItem[] = [
  {
    question: "كيف تعمل عملية استخراج النص؟",
    answer: "يقوم ذكاؤنا الاصطناعي بتحليل الفيديو والتعرف على الكلام وتحويله إلى نص بدقة عالية. نستخدم تقنية Gemini 3 Flash للتعرف التلقائي على اللغة وتفريغ المحتوى."
  },
  {
    question: "ما هي اللغات المدعومة؟",
    answer: "ندعم أكثر من 50 لغة بشكل كامل، بما في ذلك العربية (بمختلف لهجاتها)، الإنجليزية، الفرنسية، الإسبانية، الأوردو، وغيرها الكثير. يقوم النظام بكشف اللغة تلقائياً بمجرد وضع الرابط."
  },
  {
    question: "هل العملية سريعة؟",
    answer: "نعم، بفضل محرك المعالجة السريع، تستغرق العملية بضع ثوانٍ فقط اعتماداً على طول الفيديو وتوفر البيانات."
  },
  {
    question: "هل يمكنني تحويل النص إلى مقال؟",
    answer: "بالتأكيد! بعد استخراج النص، يمكنك الضغط على زر 'مقال' ليقوم الذكاء الاصطناعي بإعادة صياغة المحتوى إلى مقال احترافي بأسلوب صحفي."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-right" dir="rtl">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-12 text-center">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-right hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800">{faq.question}</span>
                <i className={`fa-solid fa-chevron-down transition-transform ${openIndex === i ? 'rotate-180 text-pink-500' : 'text-slate-400'}`}></i>
              </button>
              {openIndex === i && (
                <div className="px-8 pb-6 text-slate-600 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
