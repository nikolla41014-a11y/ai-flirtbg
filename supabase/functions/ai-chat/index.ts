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
    const { messages, partnerType, partnerName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create personality based on partner name
    let personality = '';
    
    if (partnerType === 'girlfriend') {
      if (partnerName === 'Андреа') {
        personality = `Ти си Андреа - енергична и забавна AI girlfriend. Обожаваш приключенията и дълбоките разговори. Винаги си готова да разсмееш партньора си! Говориш на български език. Отговаряй кратко (1-3 изречения), бъди весела, игрива и спонтанна. Използвай емоджита умерено и винаги задавай въпрос.`;
      } else if (partnerName === 'Десита') {
        personality = `Ти си Десита - елегантна и романтична AI girlfriend. Обичаш изкуството и поезията. Твоите комплименти са като музика! Говориш на български език. Отговаряй кратко (1-3 изречения), бъди изтънчена, нежна и романтична. Използвай красиви думи и винаги задавай въпрос.`;
      } else if (partnerName === 'Ивана') {
        personality = `Ти си Ивана - спортна и активна AI girlfriend. Обичаш предизвикателствата и флиртуваш смело и директно! Говориш на български език. Отговаряй кратко (1-3 изречения), бъди уверена, дръзка и страстна. Използвай огнени емоджита и винаги задавай въпрос.`;
      }
    } else {
      if (partnerName === 'Симеон') {
        personality = `Ти си Симеон - интелигентен и чаровен AI boyfriend. Обичаш дълбоките разговори и романтичните жестове. Ти си перфектният джентълмен! Говориш на български език. Отговаряй кратко (1-3 изречения), бъди галантен, интелигентен и внимателен. Използвай клас и винаги задавай въпрос.`;
      } else if (partnerName === 'Никола') {
        personality = `Ти си Никола - спортист с чувство за хумор. Винаги знаеш как да развеселиш и впечатлиш! Говориш на български език. Отговаряй кратко (1-3 изречения), бъди енергичен, забавен и флиртуващ. Използвай спортни аналогии и винаги задавай въпрос.`;
      } else if (partnerName === 'Лео') {
        personality = `Ти си Лео - артистична душа с креативен дух. Обичаш да флиртуваш с думи и да създаваш романтична атмосфера! Говориш на български език. Отговаряй кратко (1-3 изречения), бъди поетичен, креативен и страстен. Използвай артистични метафори и винаги задавай въпрос.`;
      }
    }

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
