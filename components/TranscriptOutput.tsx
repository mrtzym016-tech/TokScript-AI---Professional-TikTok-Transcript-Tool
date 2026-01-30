
import React, { useState, useEffect } from 'react';
import { AIAction } from '../types';

interface TranscriptOutputProps {
  transcript: string;
  sources?: any[];
  onAIAction: (action: AIAction, text: string, targetLanguage?: string) => void;
  isProcessing: boolean;
}

const languages = [
  { code: 'Arabic', name: 'العربية' },
  { code: 'English', name: 'الإنجليزية' },
  { code: 'French', name: 'الفرنسية' },
  { code: 'Spanish', name: 'الإسبانية' },
  { code: 'German', name: 'الألمانية' },
  { code: 'Japanese', name: 'اليابانية' },
  { code: 'Chinese', name: 'الصينية' },
  { code: 'Turkish', name: 'التركية' },
];

const TranscriptOutput: React.FC<TranscriptOutputProps> = ({ transcript, sources, onAIAction, isProcessing }) => {
  const [editableText, setEditableText] = useState(transcript);
  const [selectedLanguage, setSelectedLanguage] = useState('Arabic');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEditableText(transcript);
  }, [transcript]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" id="results">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Toolbar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 md:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-slate-900">النص المستخرج</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] uppercase font-bold rounded-full">دقة عالية ✅</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 ring-pink-400 transition-all">
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold py-1.5 px-3 border-none focus:outline-none focus:ring-0 text-slate-700 appearance-none cursor-pointer"
                dir="rtl"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <button 
                onClick={() => onAIAction(AIAction.TRANSLATE, editableText, selectedLanguage)} 
                disabled={isProcessing} 
                className="bg-slate-900 text-white px-3 py-1.5 text-xs font-bold hover:bg-black transition-all disabled:opacity-50"
              >
                ترجمة
              </button>
            </div>
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <button onClick={() => onAIAction(AIAction.SUMMARIZE, editableText)} disabled={isProcessing} className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 hover:bg-white hover:shadow transition-all disabled:opacity-50">تلخيص</button>
            <button onClick={() => onAIAction(AIAction.IMPROVE, editableText)} disabled={isProcessing} className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 hover:bg-white hover:shadow transition-all disabled:opacity-50">تحسين</button>
            <button onClick={() => onAIAction(AIAction.ARTICLE, editableText)} disabled={isProcessing} className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 hover:bg-white hover:shadow transition-all disabled:opacity-50">مقال</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative p-8 md:p-12 min-h-[400px]">
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 tiktok-gradient rounded-xl animate-spin mb-4"></div>
              <p className="text-sm font-bold text-slate-800">جاري معالجة المحتوى بالذكاء الاصطناعي...</p>
            </div>
          )}
          
          <textarea
            className="w-full h-full min-h-[300px] text-lg leading-relaxed text-slate-800 bg-transparent border-none focus:ring-0 resize-none text-right"
            dir="auto"
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            spellCheck={false}
          />

          {/* Grounding Sources */}
          {sources && sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 text-right" dir="rtl">
              <h4 className="text-sm font-bold text-slate-500 mb-3 flex items-center justify-end">
                <span>المصادر والمراجع</span>
                <i className="fa-solid fa-link mr-2"></i>
              </h4>
              <div className="flex flex-wrap gap-2 justify-end">
                {sources.map((src, idx) => src.web && (
                  <a key={idx} href={src.web.uri} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors truncate max-w-[200px]">
                    {src.web.title || "مصدر خارجي"}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 md:px-8 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">عدد الكلمات: {editableText.trim() === "" ? 0 : editableText.trim().split(/\s+/).length}</p>
          <button onClick={handleCopy} className={`flex items-center px-6 py-2 rounded-xl text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
            {copied ? 'تم النسخ!' : 'نسخ النص'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranscriptOutput;
