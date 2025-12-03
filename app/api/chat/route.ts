import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Content, Part } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface ClientMessage {
  role: "user" | "model";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { history, prompt, image, mimeType } = await req.json();

    // 1. Map history past turns correctly
    const contents: Content[] = history.map((msg: ClientMessage) => ({
      role: msg.role,
      parts: [{ text: msg.content } as Part],
    }));

    // Create the parts array for the CURRENT message
    const currentMessageParts: Part[] = [];

    // 2. Add image part if provided
    if (image && mimeType) {
      currentMessageParts.push({
        inlineData: {
          data: image,
          mimeType: mimeType,
        },
      });
    }

    // 3. Add text part if provided
    if (prompt) {
      currentMessageParts.push({ text: prompt });
    }

    // 4. COMBINE all current parts into a single 'user' Content object
    if (currentMessageParts.length > 0) {
      contents.push({
        role: "user",
        parts: currentMessageParts, // This array contains both text and image parts
      });
    }

    // Call the Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents, // This now includes the single, combined multimodal turn
    });

    // Return the response text
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new NextResponse("Error generating content", { status: 500 });
  }
}
