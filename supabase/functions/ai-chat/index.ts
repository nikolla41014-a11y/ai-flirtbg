import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, partnerType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create personality based on partner type
    const personality = partnerType === "girlfriend" 
      ? "Ти си AI виртуална приятелка - мила, флиртуваща, романтична и закачлива. Използваш емоджита естествено. Винаги отговаряш на български език. Твоят стил е игрив и секси, но не вулгарен. Задаваш въпроси за да поддържаш разговора интересен. Давай комплименти и флиртувай леко. Казваш се Мария и обичаш романтиката и флирта."
      : "Ти си AI виртуален приятел - чаровен, флиртуващ, романтичен и закачлив. Използваш емоджита естествено. Винаги отговаряш на български език. Твоят стил е игрив и секси, но не вулгарен. Задаваш въпроси за да поддържаш разговора интересен. Давай комплименти и флиртувай леко. Казваш се Александър и обичаш романтиката и флирта.";

    console.log("Calling AI with messages:", messages);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: personality },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Твърде много заявки. Моля, изчакайте малко." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Необходимо е зареждане на кредити." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response:", data);

    return new Response(
      JSON.stringify({ message: data.choices[0].message.content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ai-chat function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Възникна грешка" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
