
export enum AIAction {
  SUMMARIZE = 'SUMMARIZE',
  TRANSLATE = 'TRANSLATE',
  IMPROVE = 'IMPROVE',
  ARTICLE = 'ARTICLE',
  TRANSCRIPTION = 'TRANSCRIPTION'
}

export interface User {
  email: string;
  isPro: boolean;
}

export interface ProcessResult {
  text: string;
  sources?: Array<{
    web?: { uri: string; title: string };
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}
