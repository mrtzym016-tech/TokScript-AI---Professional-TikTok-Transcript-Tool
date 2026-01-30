import { GoogleGenAI } from "@google/genai";

export const processContent = async (
  action: string,
  input: string,
  targetLanguage: string = "Arabic"
): Promise<any> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("تنبيه: مفتاح API غير متوفر حالياً.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelName = "gemini-3-flash-preview";

  let prompt = "";
  switch (action) {
    case 'TRANSCRIPTION':
      prompt = `Extract transcript from TikTok link: ${input}. Deliver verbatim text in original language. Use Google Search if needed.`;
      break;
    case 'SUMMARIZE':
      prompt = `لخص النص التالي بأسلوب نقاط باللغة العربية: \n\n${input}`;
      break;
    case 'IMPROVE':
      prompt = `حسن صياغة هذا النص ليكون احترافياً: \n\n${input}`;
      break;
    case 'ARTICLE':
      prompt = `حول النص التالي لمقال صحفي بالعربية مع عناوين: \n\n${input}`;
      break;
    default:
      prompt = input;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: action === 'TRANSCRIPTION' ? [{ googleSearch: {} }] : undefined,
      },
    });

    if (!response || !response.text) {
      throw new Error("لم نتمكن من الحصول على نتيجة.");
    }

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error("عذراً، فشلت معالجة الطلب. تأكد من صحة الرابط.");
  }
};