
import React from 'react';

interface BinancePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  paymentUrl: string;
}

const BinancePaymentModal: React.FC<BinancePaymentModalProps> = ({ isOpen, onClose, onConfirm, paymentUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 transform animate-in zoom-in duration-300">
        <div className="bg-[#F3BA2F] p-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
             <i className="fa-solid fa-coins text-[#F3BA2F] text-4xl animate-pulse"></i>
          </div>
          <h2 className="text-3xl font-black text-black">Binance Pay</h2>
          <p className="text-black/70 font-bold text-sm mt-2">الدفع الآمن بالعملات الرقمية</p>
        </div>
        
        <div className="p-10 text-center" dir="rtl">
          <div className="mb-10">
            <div className="text-5xl font-black text-slate-900 mb-2">5.00 <span className="text-xl text-slate-400">USDT</span></div>
            <p className="text-slate-500 font-bold">باقة المحترفين (مدى الحياة)</p>
          </div>

          <div className="space-y-3 mb-10">
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <i className="fa-solid fa-circle-check text-green-500 ml-3"></i>
              <p className="text-sm font-bold text-slate-700">دفع مشفر وآمن بالكامل</p>
            </div>
            <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <i className="fa-solid fa-circle-check text-green-500 ml-3"></i>
              <p className="text-sm font-bold text-slate-700">تفعيل فوري للميزات</p>
            </div>
          </div>

          <div className="space-y-4">
            <a 
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-5 bg-black text-[#F3BA2F] font-black text-xl rounded-2xl shadow-xl hover:scale-[1.03] transition-all active:scale-95"
            >
              افتح Binance للدفع
            </a>
            
            <button 
              onClick={onConfirm}
              className="w-full py-4 bg-green-50 text-green-600 font-black text-sm rounded-2xl border border-green-100 hover:bg-green-100 transition-all"
            >
              لقد قمت بالدفع بالفعل
            </button>

            <button 
              onClick={onClose}
              className="text-slate-400 text-sm font-bold hover:text-slate-600 pt-4"
            >
              إلغاء والعودة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinancePaymentModal;
