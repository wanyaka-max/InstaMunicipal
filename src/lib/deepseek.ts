import { supabase } from "./supabase";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || "";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface DeepseekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function generateAIResponse(
  prompt: string,
  context?: string,
): Promise<string> {
  try {
    if (!DEEPSEEK_API_KEY) {
      console.error("DeepSeek API key is not set");
      return "AI service is currently unavailable. Please try again later.";
    }

    const messages: Message[] = [
      {
        role: "system",
        content: `You are an AI assistant for a municipal communication platform called InstaMunicipal. 
        ${context ? `Context about the conversation: ${context}` : ""}
        Provide helpful, accurate, and concise responses to municipal employees' questions.`,
      },
      { role: "user", content: prompt },
    ];

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DeepSeek API error:", errorData);
      return "There was an error processing your request. Please try again later.";
    }

    const data: DeepseekResponse = await response.json();
    const aiResponse =
      data.choices[0]?.message.content || "No response generated.";

    // Save the interaction to the database
    await saveInteraction(prompt, aiResponse);

    return aiResponse;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    return "An unexpected error occurred. Please try again later.";
  }
}

async function saveInteraction(prompt: string, response: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.from("ai_interactions").insert({
    user_id: user.id,
    prompt,
    response,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error saving AI interaction:", error);
  }
}

export async function getUserInteractionHistory(
  limit: number = 10,
): Promise<{ prompt: string; response: string; created_at: string }[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("ai_interactions")
    .select("prompt, response, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching AI interaction history:", error);
    return [];
  }

  return data || [];
}
