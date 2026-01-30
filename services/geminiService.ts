
import { GoogleGenAI } from "@google/genai";
import { AIAction, ProcessResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const processContent = async (
  action: AIAction,
  input: string,
  targetLanguage: string = "Arabic"
): Promise<ProcessResult> => {
  // استخدام النسخة الأحدث لضمان أفضل نتائج في التعرف على اللغات
  const modelName = "gemini-3-flash-preview";

  let prompt = "";
  switch (action) {
    case AIAction.TRANSCRIPTION:
      prompt = `
        CRITICAL COMMAND: You are a professional verbatim transcriber. 
        TASK: Extract the EXACT speech from this TikTok URL: ${input}

        STRICT RULES:
        1. NO TRANSLATION: Do NOT translate the output to English or Arabic.
        2. NATIVE ONLY: If the person in the video speaks Japanese, the output MUST be in Japanese characters (Kanji/Kana). 
        3. VERBATIM: Provide a word-for-word transcript. 
        4. NO SUMMARY: Do not explain the video, do not summarize, do not provide any English text unless the video is in English.
        5. FORMAT: Return ONLY the raw transcript text. No "Here is the transcript" or any introduction.

        If you cannot find the direct audio captions, use your internal knowledge and search tools to reconstruct the EXACT dialogue in its original language.
      `;
      break;
    case AIAction.SUMMARIZE:
      prompt = `قم بتلخيص النص التالي بشكل احترافي ومركز في نقاط باللغة العربية: \n\n${input}`;
      break;
    case AIAction.TRANSLATE:
      prompt = `ترجم النص التالي إلى ${targetLanguage} بأسلوب احترافي وسلس: \n\n${input}`;
      break;
    case AIAction.IMPROVE:
      prompt = `أعد صياغة النص التالي ليكون أكثر وضوحاً واحترافية: \n\n${input}`;
      break;
    case AIAction.ARTICLE:
      prompt = `حول النص التالي إلى مقال متكامل ومنظم بعناوين جذابة باللغة العربية: \n\n${input}`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: action === AIAction.TRANSCRIPTION ? [{ googleSearch: {} }] : undefined,
        // درجة حرارة 0 تعني دقة متناهية وعدم ابتكار نصوص خارج السياق
        temperature: 0,
        // تخصيص ميزانية تفكير بسيطة للتأكد من فهم اللغة قبل الإخراج
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const resultText = response.text || "لم يتم العثور على محتوى. تأكد من أن الفيديو يحتوي على صوت واضح.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return {
      text: resultText,
      sources: sources as any
    };
  } catch (error) {
    console.error("Transcription Error:", error);
    throw new Error("حدث خطأ تقني. يرجى التأكد من الرابط والمحاولة مرة أخرى.");
  }
};
