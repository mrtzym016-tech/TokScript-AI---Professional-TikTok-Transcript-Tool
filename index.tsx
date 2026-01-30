import { processContent } from './services/geminiService.ts';

// State Management
let user = JSON.parse(localStorage.getItem('tokscript_user') || 'null');
let isProcessing = false;

// DOM Elements
const elements = {
  form: document.getElementById('extract-form'),
  urlInput: document.getElementById('video-url'),
  submitBtn: document.getElementById('submit-btn'),
  spinner: document.getElementById('loading-spinner'),
  resultsSection: document.getElementById('results-section'),
  transcriptArea: document.getElementById('transcript-area'),
  errorMsg: document.getElementById('error-message'),
  loginBtn: document.getElementById('login-btn'),
  authModal: document.getElementById('auth-modal'),
  loginForm: document.getElementById('login-form'),
  copyBtn: document.getElementById('copy-btn'),
  aiLoadingOverlay: document.getElementById('ai-loading-overlay'),
  sourcesContainer: document.getElementById('sources-container'),
  sourcesList: document.getElementById('sources-list'),
  authSection: document.getElementById('auth-section')
};

// Initialize UI
const initUI = () => {
  if (user && elements.authSection) {
    elements.authSection.innerHTML = `
      <span class="text-sm font-bold text-slate-700 ml-4">${user.email.split('@')[0]}</span>
      <button id="logout-btn" class="text-sm font-bold text-red-500">خروج</button>
    `;
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
  }
};

const handleLogout = () => {
  localStorage.removeItem('tokscript_user');
  location.reload();
};

// Form Submission
elements.form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = (elements.urlInput as HTMLInputElement)?.value;
  if (!url || isProcessing) return;

  setLoading(true);
  elements.errorMsg?.classList.add('hidden');

  try {
    const result = await processContent('TRANSCRIPTION', url);
    showResults(result);
  } catch (err: any) {
    if (elements.errorMsg) {
      elements.errorMsg.textContent = err.message;
      elements.errorMsg.classList.remove('hidden');
    }
  } finally {
    setLoading(false);
  }
});

const setLoading = (loading: boolean) => {
  isProcessing = loading;
  if (elements.submitBtn) {
    // Fixed: Cast to HTMLButtonElement to access 'disabled' property
    (elements.submitBtn as HTMLButtonElement).disabled = loading;
    const span = elements.submitBtn.querySelector('span');
    if (span) {
      span.textContent = loading ? 'جاري المعالجة...' : 'بدء الاستخراج';
    }
  }
  if (loading) {
    elements.spinner?.classList.remove('hidden');
  } else {
    elements.spinner?.classList.add('hidden');
  }
};

const showResults = (result: any) => {
  elements.resultsSection?.classList.remove('hidden');
  if (elements.transcriptArea) {
    // Fixed: Cast to HTMLTextAreaElement to access 'value' property
    (elements.transcriptArea as HTMLTextAreaElement).value = result.text;
  }
  
  // Handle Sources
  if (result.sources && result.sources.length > 0) {
    elements.sourcesContainer?.classList.remove('hidden');
    if (elements.sourcesList) {
      elements.sourcesList.innerHTML = result.sources
        .filter((s: any) => s.web)
        .map((s: any) => `
          <a href="${s.web.uri}" target="_blank" class="text-xs px-3 py-1.5 bg-slate-100 rounded-full hover:bg-slate-200">${s.web.title || 'مصدر'}</a>
        `).join('');
    }
  } else {
    elements.sourcesContainer?.classList.add('hidden');
  }

  elements.resultsSection?.scrollIntoView({ behavior: 'smooth' });
};

// AI Actions (Summarize, Article, etc.)
document.querySelectorAll('.ai-action').forEach(btn => {
  btn.addEventListener('click', async () => {
    const action = btn.id.replace('btn-', '').toUpperCase();
    if (elements.transcriptArea) {
      // Fixed: Cast to HTMLTextAreaElement to access 'value' property
      const text = (elements.transcriptArea as HTMLTextAreaElement).value;
      
      elements.aiLoadingOverlay?.classList.remove('hidden');
      try {
        const result = await processContent(action, text);
        if (elements.transcriptArea) {
          (elements.transcriptArea as HTMLTextAreaElement).value = result.text;
        }
      } catch (err) {
        alert('حدث خطأ أثناء معالجة الطلب.');
      } finally {
        elements.aiLoadingOverlay?.classList.add('hidden');
      }
    }
  });
});

// Utility: Copy to Clipboard
elements.copyBtn?.addEventListener('click', () => {
  if (elements.transcriptArea) {
    const text = (elements.transcriptArea as HTMLTextAreaElement).value;
    navigator.clipboard.writeText(text).then(() => {
      if (elements.copyBtn) {
        elements.copyBtn.textContent = 'تم النسخ!';
        elements.copyBtn.classList.replace('bg-slate-900', 'bg-green-600');
        setTimeout(() => {
          if (elements.copyBtn) {
            elements.copyBtn.textContent = 'نسخ النص';
            elements.copyBtn.classList.replace('bg-green-600', 'bg-slate-900');
          }
        }, 2000);
      }
    });
  }
});

// Modals
elements.loginBtn?.addEventListener('click', () => elements.authModal?.classList.remove('hidden'));
document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => {
  elements.authModal?.classList.add('hidden');
}));

elements.loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  // Fixed: Cast querySelector result to HTMLInputElement to access 'value' property
  const emailInput = elements.loginForm?.querySelector('input[type="email"]') as HTMLInputElement;
  if (emailInput) {
    const email = emailInput.value;
    const newUser = { email, isPro: false };
    localStorage.setItem('tokscript_user', JSON.stringify(newUser));
    location.reload();
  }
});

// Start
initUI();
