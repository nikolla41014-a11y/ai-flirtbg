import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.76.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const FORBIDDEN_WORDS = [
  'nude', 'naked', 'porn', 'pornographic', 'sex', 'sexual', 'explicit', 
  'nsfw', 'xxx', 'erotic', 'intercourse', 'genitals', 'penis', 'vagina',
  'breast', 'topless', 'orgasm', 'fetish', 'bdsm'
];

const STYLE_PROMPTS = {
  silhouette: "romantic silhouette art style, elegant couple silhouette against beautiful background, artistic, tasteful, soft lighting",
  fantasy: "fantasy art style, romantic couple in magical setting, ethereal atmosphere, dreamy colors, enchanting, safe for work",
  glamour: "glamorous portrait style, elegant couple dressed formally, sophisticated, tasteful fashion photography style, romantic mood",
  portrait: "soft romantic portrait, couple together, warm lighting, artistic photography style, tender moment, safe for work"
};

function containsForbiddenWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return FORBIDDEN_WORDS.some(word => lowerText.includes(word));
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const { prompt, style } = await req.json();

    if (containsForbiddenWords(prompt)) {
      return new Response(
        JSON.stringify({ error: "Your prompt contains inappropriate content. Please keep requests romantic and tasteful." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stylePrompt = STYLE_PROMPTS[style as keyof typeof STYLE_PROMPTS] || STYLE_PROMPTS.portrait;
    const enhancedPrompt = `${stylePrompt}. ${prompt}. Artistic and romantic illustration, safe for work, no nudity, tasteful and elegant, AI-generated art`;

    console.log("Generating image with prompt:", enhancedPrompt);

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "vivid"
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402 || response.status === 401) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error("No image returned from AI");
    }

    const { data: savedImage, error: saveError } = await supabase
      .from("generated_images")
      .insert({
        user_id: user.id,
        prompt: prompt,
        style: style,
        image_url: imageUrl
      })
      .select()
      .single();

    if (saveError) {
      console.error("Error saving image:", saveError);
      throw saveError;
    }

    return new Response(
      JSON.stringify({ image: savedImage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
