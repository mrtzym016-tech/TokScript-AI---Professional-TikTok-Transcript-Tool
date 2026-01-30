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

  // Constants
  const BINANCE_PAYMENT_URL = "https://app.binance.com/payment/sec/placeholder";

  // Safe browser interaction: Load user from storage only after mount
  useEffect(() => {
    try {
      const savedUser = typeof window !== 'undefined' ? localStorage.getItem('tokscript_user') : null;
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn("Storage access failed", e);
    }
  }, []);

  const handleLogin = (email: string) => {
    const newUser = { email, isPro: false };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tokscript_user', JSON.stringify(newUser));
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tokscript_user');
    }
    setResult(null);
  };

  const handleUpgradeClick = () => {
    if (user) {
      setIsPaymentModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const simulatePaymentSuccess = () => {
    if (user) {
      const proUser = { ...user, isPro: true };
      setUser(proUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('tokscript_user', JSON.stringify(proUser));
      }
      setIsPaymentModalOpen(false);
      alert("تهانينا! تم تفعيل اشتراك برو بنجاح 🎉");
    }
  };

  const handleExtract = async (url: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const data = await processContent(AIAction.TRANSCRIPTION, url);
      setResult(data);
      
      // Safe scroll
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          const resultsEl = document.getElementById('results');
          if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
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
        onStartFree={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' })} 
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