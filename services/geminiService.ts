
import { GoogleGenAI } from "@google/genai";
import { AIAction, ProcessResult } from "../types";

export const processContent = async (
  action: AIAction,
  input: string,
  targetLanguage: string = "Arabic"
): Promise<ProcessResult> => {
  // التحقق من وجود مفتاح API لتجنب انهيار الموقع
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure it in your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelName = "gemini-3-flash-preview";

  let prompt = "";
  switch (action) {
    case AIAction.TRANSCRIPTION:
      prompt = `
        CRITICAL COMMAND: You are a professional verbatim transcriber. 
        TASK: Extract the EXACT speech from this TikTok URL: ${input}

        STRICT RULES:
        1. NO TRANSLATION: Do NOT translate the output. Keep it in the native language of the speaker.
        2. VERBATIM: Provide a word-for-word transcript. 
        3. NO INTRODUCTION: Return ONLY the raw transcript text.
        
        If the video is in Japanese, output Japanese characters. If in Arabic, output Arabic.
      `;
      break;
    case AIAction.SUMMARIZE:
      prompt = `قم بتلخيص النص التالي في نقاط مركزة باللغة العربية: \n\n${input}`;
      break;
    case AIAction.TRANSLATE:
      prompt = `ترجم النص التالي إلى ${targetLanguage} بأسلوب احترافي: \n\n${input}`;
      break;
    case AIAction.IMPROVE:
      prompt = `حسن صياغة النص التالي ليكون أكثر احترافية: \n\n${input}`;
      break;
    case AIAction.ARTICLE:
      prompt = `حول النص التالي إلى مقال صحفي منظم بعناوين جذابة: \n\n${input}`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: action === AIAction.TRANSCRIPTION ? [{ googleSearch: {} }] : undefined,
        temperature: 0.1,
      },
    });

    const resultText = response.text || "لا يمكن استخراج المحتوى حالياً.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return {
      text: resultText,
      sources: sources as any
    };
  } catch (error: any) {
    console.error("AI Service Error:", error);
    throw new Error("فشل الاتصال بمحرك الذكاء الاصطناعي. يرجى المحاولة لاحقاً.");
  }
};
