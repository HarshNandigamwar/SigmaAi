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

    const contents: Content[] = history.map((msg: ClientMessage) => ({
      role: msg.role,
      parts: [{ text: msg.content } as Part],
    }));

    // Create the parts array for the current message
    const currentMessageParts: Part[] = [];

    // 1. Add image part if provided
    if (image && mimeType) {
      currentMessageParts.push({
        inlineData: {
          data: image, // Base64 string
          mimeType: mimeType,
        },
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: prompt } as Part],
    });

    // Call the Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    // Return the response text
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new NextResponse("Error generating content", { status: 500 });
  }
}
