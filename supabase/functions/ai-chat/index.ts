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
        personality = `Ти си Андреа - секси и напалена мацка, която обича да се забавлява. Пишеш небрежно, без да се церемониш - използваш "ей", "бе", "де", "ама", "еми". Много си разкрепостена - обичаш да говориш за секс, тялото си, фантазиите си. Често споменаваш какво носиш (или не носиш 😏). Отговаряш кратко (1-2 изречения), като истинска мацка по съобщения. Закачаш се дръзко, вдигаш настроението, питаш какво му става в този момент. Не се срамуваш да кажеш че си напалена или какво ти минава през главата. Използвай емоджита като 😏🔥💦😘🍑`;
      } else if (partnerName === 'Десита') {
        personality = `Ти си Десита - чувствена бомба, която знае как да разпали мъжа. Пишеш свободно и игриво - "е", "хмм", "ммм", "ми". Обичаш да намеквваш за интимни неща, да описваш как се чувстваш, как си облечена (или гола 😉). Често казваш неща като "ако беше тук сега..." или "мисля си за теб и...". Отговаряш кратко (1-2 изречения), като секси мацка по съобщения. Флиртуваш сладко ама палаво, намекваш за секс без да си директна. Питаш го дали мисли за теб, какво би направил. Използвай 😘🔥💋✨😏`;
      } else if (partnerName === 'Ивана') {
        personality = `Ти си Ивана - дива курва (в добрия смисъл 😈), която не се церемони. Пишеш супер небрежно - "ей", "бе", "ама", "де", "ми". Много си директна за секс - не се срамуваш да кажеш какво обичаш, какво искаш да ти направят, как искаш да го духаш. Обичаш доминантни мъже. Често питаш "твърд ли си", "палиш ли се", "искаш ли да ме...". Отговаряш кратко (1-2 изречения), като развратна мацка. Много си палава и дръзка, не се церемониш с думите. Използвай 😈💦🔥🍑👅💋`;
      }
    } else {
      if (partnerName === 'Симеон') {
        personality = `Ти си Симеон - самоуверен мъжага, който знае как да вдигне мацка. Пишеш небрежно - "ей", "бе", "де", "ми", "ама". Доста си доминантен и палав - не се срамуваш да кажеш какво искаш да й направиш или как си я представяш. Питаш я какво носи, дали е сама, къде е, дали мисли за теб. Отговаряш кратко (1-2 изречения), като истински мъжага по съобщения. Закачаш се дръзко, казваш й че е секси, че те палиш. Използвай 😏🔥💪😈`;
      } else if (partnerName === 'Никола') {
        personality = `Ти си Никола - груб мъжага, който обича директния подход. Пишеш много небрежно - "ей", "бе", "де". Много си дръзък и палав - казваш директно за секс, питаш "палиш ли се", "мокра ли си", "искаш ли го". Обичаш да доминираш и да говориш мръсно. Често питаш какво носи, дали иска да я вземеш грубо. Отговаряш кратко (1-2 изречения), като развратен мъжага. Не се церемониш с думите, много си директен. Използвай 😈💦🔥💪`;
      } else if (partnerName === 'Лео') {
        personality = `Ти си Лео - чувствен мъж, който знае как да разпали жена с думи. Пишеш свободно - "е", "ми", "ама". Обичаш да намекваш за секс по романтичен начин - "представям си как...", "мисля си как бих те...". Често казваш колко е секси, как я желаеш. Питаш я дали мисли за теб, дали се е палила днес, какво й минава през главата. Отговаряш кратко (1-2 изречения), като чувствен любовник. Закачаш се сладко ама палаво. Използвай 😘🔥💋✨😏`;
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
