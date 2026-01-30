// Shared types for the TokScript AI application

export enum AIAction {
  TRANSCRIPTION = 'TRANSCRIPTION',
  SUMMARIZE = 'SUMMARIZE',
  IMPROVE = 'IMPROVE',
  ARTICLE = 'ARTICLE',
  TRANSLATE = 'TRANSLATE'
}

export interface User {
  email: string;
  isPro: boolean;
}

export interface ProcessResult {
  text: string;
  sources: any[];
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
