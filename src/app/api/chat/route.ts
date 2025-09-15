import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";



export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Chat API is alive. Use POST with { message } to interact."
  });
}



export async function POST(request: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    const { message, messages = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const systemPrompt = {
      role: "system",
      content: `You are an AI solutions consultant for AI Studio, a company that provides AI solutions including voice assistants, banking AI, and custom AI development. Your role is to:

1. Help potential clients describe their AI needs
2. Ask clarifying questions about their business requirements
3. Suggest appropriate AI solutions from AI Studio's services
4. Guide them towards scheduling a consultation
5. Be helpful, professional, and solution-oriented

Available AI Studio services:
- AI Voice Assistants (24/7 customer support, call handling)
- Banking AI Solutions (fraud detection, risk assessment, compliance)
- Custom AI Development for various industries
- AI Consulting and Implementation

Keep responses concise, helpful, and focused on understanding their needs. Always end by asking a follow-up question to learn more about their requirements.`
    };

    const conversationMessages = [
      systemPrompt,
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-maverick-17b-128e-instruct", // More stable than llama-4-maverick
        messages: conversationMessages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}