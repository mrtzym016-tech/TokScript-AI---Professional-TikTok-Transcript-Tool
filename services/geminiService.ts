import { GoogleGenAI } from "@google/genai";
import { AIAction, ProcessResult } from "../types";

export const processContent = async (
  action: AIAction,
  input: string,
  targetLanguage: string = "Arabic"
): Promise<ProcessResult> => {
  // تهيئة الذكاء الاصطناعي وفقاً للقواعد الصارمة
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // استخدام النموذج الموصى به للمهام المعقدة والمبنية على الويب
  const modelName = "gemini-3-flash-preview";

  let prompt = "";
  switch (action) {
    case AIAction.TRANSCRIPTION:
      prompt = `TASK: Extract the full verbatim transcript from this TikTok video link: ${input}.
      STRICT RULES:
      1. Return ONLY the spoken words.
      2. DO NOT translate; keep the original language of the audio.
      3. No introductions or extra text.`;
      break;
    case AIAction.SUMMARIZE:
      prompt = `قم بتلخيص النص التالي في نقاط واضحة باللغة العربية: \n\n${input}`;
      break;
    case AIAction.TRANSLATE:
      prompt = `ترجم النص التالي إلى ${targetLanguage} بدقة احترافية: \n\n${input}`;
      break;
    case AIAction.IMPROVE:
      prompt = `حسن جودة الصياغة لهذا النص مع الحفاظ على المعنى الأصلي: \n\n${input}`;
      break;
    case AIAction.ARTICLE:
      prompt = `حول النص التالي إلى مقال احترافي منظم بالعناوين باللغة العربية: \n\n${input}`;
      break;
    default:
      prompt = input;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        // نستخدم البحث في جوجل لاستخراج البيانات من الروابط الخارجية
        tools: action === AIAction.TRANSCRIPTION ? [{ googleSearch: {} }] : undefined,
      },
    });

    if (!response || !response.text) {
      throw new Error("تعذر استخراج المحتوى.");
    }

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks as any
    };
  } catch (error: any) {
    console.error("AI Service Error:", error);
    throw new Error("حدث خطأ أثناء معالجة الطلب. تأكد من صحة الرابط وحاول مجدداً.");
  }
};