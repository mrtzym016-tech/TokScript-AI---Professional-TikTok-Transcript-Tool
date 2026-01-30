
import React from 'react';

interface BinancePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentUrl: string;
}

const BinancePaymentModal: React.FC<BinancePaymentModalProps> = ({ isOpen, onClose, paymentUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">
        <div className="bg-[#F3BA2F] p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-lg">
             <i className="fa-solid fa-brands fa-bitcoin text-[#F3BA2F] text-3xl"></i>
          </div>
          <h2 className="text-2xl font-black text-black">الدفع بالعملات الرقمية</h2>
          <p className="text-black/80 font-medium text-sm mt-2">عبر خدمة Binance Pay الآمنة</p>
        </div>
        
        <div className="p-8 text-center" dir="rtl">
          <div className="mb-8">
            <div className="text-4xl font-black text-slate-900 mb-2">5.00 <span className="text-2xl">USDT</span></div>
            <div className="text-slate-500 text-sm font-bold">ما يعادل 5 دولار رقمي</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center ml-3 shrink-0">
                <i className="fa-solid fa-bolt text-xs"></i>
              </div>
              <p className="text-sm text-slate-600 text-right">تفعيل فوري للخطة الاحترافية</p>
            </div>
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center ml-3 shrink-0">
                <i className="fa-solid fa-shield-check text-xs"></i>
              </div>
              <p className="text-sm text-slate-600 text-right">دفع مشفر وآمن بالكامل</p>
            </div>
          </div>

          <a 
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-black text-[#F3BA2F] font-black text-lg rounded-xl shadow-xl hover:scale-[1.02] transition-all active:scale-95 mb-4 flex items-center justify-center space-x-2"
          >
            <span>إتمام الدفع عبر Binance</span>
            <i className="fa-solid fa-arrow-up-right-from-square mr-2 text-xs"></i>
          </a>
          
          <p className="text-[10px] text-slate-400 mb-6 font-medium">سيتم توجيهك إلى صفحة الدفع الرسمية الخاصة بـ Binance</p>
          
          <button 
            onClick={onClose}
            className="text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors"
          >
            إلغاء العملية والعودة
          </button>
        </div>
        
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center space-x-2 grayscale opacity-70">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Verified Merchant: TokScript AI Team</span>
        </div>
      </div>
    </div>
  );
};

export default BinancePaymentModal;
