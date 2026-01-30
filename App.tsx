
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import TranscriptOutput from './components/TranscriptOutput';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import AuthModal from './components/AuthModal';
import BinancePaymentModal from './components/BinancePaymentModal';
import { processContent } from './services/geminiService';
import { AIAction, User, ProcessResult } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingUpgrade, setPendingUpgrade] = useState(false);

  // الرابط الخاص بـ Binance Pay
  const BINANCE_PAYMENT_URL = "https://app.binance.com/payment/sec/placeholder";

  // تحميل بيانات المستخدم بأمان
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('tokscript_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load user from storage", e);
    }
  }, []);

  const handleLogin = (email: string) => {
    try {
      const newUser = { email, isPro: false };
      setUser(newUser);
      localStorage.setItem('tokscript_user', JSON.stringify(newUser));
      setIsAuthModalOpen(false);
    } catch (e) {
      console.error("Failed to save login session", e);
    }
  };

  const handleLogout = () => {
    try {
      setUser(null);
      localStorage.removeItem('tokscript_user');
      setResult(null);
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const handleUpgradeClick = () => {
    if (user) {
      setIsPaymentModalOpen(true);
    } else {
      setPendingUpgrade(true);
      setIsAuthModalOpen(true);
    }
  };

  const simulatePaymentSuccess = () => {
    try {
      if (user) {
        const proUser = { ...user, isPro: true };
        setUser(proUser);
        localStorage.setItem('tokscript_user', JSON.stringify(proUser));
        setIsPaymentModalOpen(false);
        alert("تهانينا! تم تفعيل اشتراك برو بنجاح 🎉");
      }
    } catch (e) {
      alert("حدث خطأ أثناء تفعيل الاشتراك.");
    }
  };

  const handleExtract = async (url: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const data = await processContent(AIAction.TRANSCRIPTION, url);
      setResult(data);
      // التمرير السلس للنتائج
      setTimeout(() => {
        const resultsEl = document.getElementById('results');
        if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      setError(err.message || "فشل استخراج النص. تأكد من أن الرابط صحيح.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAIAction = async (action: AIAction, text: string, targetLanguage?: string) => {
    setIsProcessing(true);
    try {
      const data = await processContent(action, text, targetLanguage);
      setResult(data);
    } catch (err: any) {
      alert("حدث خطأ أثناء معالجة الطلب.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout user={user} onLogin={() => setIsAuthModalOpen(true)} onLogout={handleLogout}>
      <Hero onExtract={handleExtract} isLoading={isProcessing} />
      
      {error && (
        <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl flex items-center justify-center text-right shadow-sm">
            <span className="font-bold">{error}</span>
            <i className="fa-solid fa-triangle-exclamation ml-3"></i>
          </div>
        </div>
      )}

      {result && (
        <TranscriptOutput 
          transcript={result.text} 
          sources={result.sources}
          onAIAction={handleAIAction} 
          isProcessing={isProcessing}
        />
      )}

      <Pricing 
        onStartFree={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        onUpgrade={handleUpgradeClick} 
      />
      
      <FAQ />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />

      <BinancePaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={simulatePaymentSuccess}
        paymentUrl={BINANCE_PAYMENT_URL}
      />
    </Layout>
  );
};

export default App;
