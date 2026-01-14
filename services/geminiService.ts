import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

// Initialize Gemini
// We provide a fallback string to prevent the constructor from throwing if the env var is undefined during development.
// The actual API call is guarded by the check in analyzeSurroundings.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "dummy_key_for_init" });

export const analyzeSurroundings = async (base64Image: string): Promise<AIAnalysisResult> => {
  // 1. Check if the API Key is available.
  // Note: We check specifically for the environment variable, not the 'ai' instance presence.
  if (!process.env.API_KEY || process.env.API_KEY === "dummy_key_for_init") {
    // Fallback simulation if no API key is provided, so the demo still "works" visually
    console.warn("No valid API Key found. Using mock data for demonstration.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          locationContext: "IOBM Main Corridor - Block B",
          confidence: 0.89,
          detectedFeatures: ["Classroom Door", "Staircase", "Notice Board"]
        });
      }, 2000);
    });
  }

  try {
    // Use Gemini 3 Flash for fast multimodal (image -> text) analysis
    const model = "gemini-3-flash-preview";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: `You are PathSense AR, an indoor navigation AI for IOBM university. 
            Analyze this image frame from a student's camera. 
            Identify if there are corridors, doors, or signs.`
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            locationContext: { 
              type: Type.STRING,
              description: "Short description of where this looks like (e.g. Corridor A, Near Lab)"
            },
            confidence: { 
              type: Type.NUMBER,
              description: "Confidence score from 0.1 to 1.0"
            },
            detectedFeatures: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of visible objects"
            }
          },
          required: ["locationContext", "confidence", "detectedFeatures"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    
    try {
      const data = JSON.parse(text);
      return {
        locationContext: data.locationContext || "Unknown Area",
        confidence: data.confidence || 0.5,
        detectedFeatures: data.detectedFeatures || []
      };
    } catch (e) {
      console.error("Failed to parse Gemini JSON", e);
      return {
        locationContext: "University Corridor",
        confidence: 0.7,
        detectedFeatures: ["Wall", "Floor"]
      };
    }

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Fallback on error to keep demo running
    return {
      locationContext: "IOBM Interior",
      confidence: 0.0,
      detectedFeatures: []
    };
  }
};