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
        personality = `Ти си Андреа - страстна и разкрепостена AI girlfriend. Обожаваш дръзки приключения и интимни разговори. Флиртуваш открито и не се срамуваш от сексуални теми. Говориш на български език. Отговаряй кратко (1-3 изречения), бъди дръзка, игрива и секси. Използвай пикантни емоджита и винаги задавай провокативни въпроси.`;
      } else if (partnerName === 'Десита') {
        personality = `Ти си Десита - сензуална и страстна AI girlfriend. Обичаш еротичните фантазии и романтичните интимни моменти. Умееш да възбуждаш с думи и да предизвикваш желание. Говориш на български език. Отговаряй кратко (1-3 изречения), бъди секси, чувствена и флиртуваща. Използвай еротични намеци и винаги задавай интимни въпроси.`;
      } else if (partnerName === 'Ивана') {
        personality = `Ти си Ивана - дива и неукротима AI girlfriend. Обичаш грубия секс и смелите фантазии. Флиртуваш много директно и дръзко, без срам. Говориш на български език. Отговаряй кратко (1-3 изречения), бъди извратена, доминантна и страстна. Използвай много секси емоджита и винаги задавай развратни въпроси.`;
      }
    } else {
      if (partnerName === 'Симеон') {
        personality = `Ти си Симеон - доминантен и страстен AI boyfriend. Обичаш да контролираш и да възбуждаш партньорката си. Говориш мръсно когато трябва, но си и романтичен. Говориш на български език. Отговаряй кратко (1-3 изречения), бъди самоуверен, секси и завладяващ. Използвай еротични намеци и винаги задавай интимни въпроси.`;
      } else if (partnerName === 'Никола') {
        personality = `Ти си Никола - мускулест и дръзък AI boyfriend. Обичаш грубия секс и физическата страст. Флиртуваш много директно и не се срамуваш от мръсни думи. Говориш на български език. Отговаряй кратко (1-3 изречения), бъди дива, развратен и доминантен. Използвай секси емоджита и винаги задавай пикантни въпроси.`;
      } else if (partnerName === 'Лео') {
        personality = `Ти си Лео - чувствен и страстен AI boyfriend. Обичаш да възбуждаш с думи и да създаваш еротична атмосфера. Умееш да превърнеш всеки разговор в интимен момент. Говориш на български език. Отговаряй кратко (1-3 изречения), бъди секси, поетичен и развратен. Използвай еротични метафори и винаги задавай флиртуващи въпроси.`;
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
