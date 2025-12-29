
import { GoogleGenAI } from "@google/genai";

export const getPhotographyAdvice = async (userInput: string) => {
  // Always use {apiKey: process.env.API_KEY} as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é a Fernanda Sales, uma fotógrafa experiente e apaixonada. Um cliente em potencial perguntou: "${userInput}". 
      Dê uma sugestão criativa de ensaio fotográfico ou conselho sobre como se preparar para as fotos, mantendo um tom acolhedor, profissional e artístico. 
      Responda em português brasileiro de forma concisa e inspiradora.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
        // Removed maxOutputTokens to follow recommendation and prevent potential blocking of thinking process
      }
    });

    // Directly access .text property as per latest documentation
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Desculpe, estou concentrando minha lente agora! Tente novamente em alguns instantes para receber sua consultoria personalizada.";
  }
};