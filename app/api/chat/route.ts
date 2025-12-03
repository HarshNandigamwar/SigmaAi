// app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Content, Part } from '@google/genai'; // Note the import of Content and Part

// 1. FIX for Error 1: Pass an object to the constructor
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" }); 

interface ClientMessage {
  role: 'user' | 'model';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { history, prompt } = await req.json();

    // 2. FIX for Error 2 (A): Map history to Content[]
    const contents: Content[] = history.map((msg: ClientMessage) => ({
      role: msg.role, // This is the role property from the SDK's Content type
      parts: [{ text: msg.content } as Part], // Format message content as a Part
    }));

    // 3. FIX for Error 2 (B): Push the new prompt as a Content object
    contents.push({ 
        role: 'user', 
        parts: [{ text: prompt } as Part], 
    });

    // 4. Call the Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents, // contents is now correctly typed as Content[]
    });

    // 5. Return the AI's response text
    return NextResponse.json({ text: response.text });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return new NextResponse('Error generating content', { status: 500 });
  }
}