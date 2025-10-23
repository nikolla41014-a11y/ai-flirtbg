import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { prompt, style } = await req.json();

    // Content filtering
    if (containsForbiddenWords(prompt)) {
      return new Response(
        JSON.stringify({ error: 'Your prompt contains inappropriate content. Please keep requests romantic and tasteful.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build enhanced prompt
    const stylePrompt = STYLE_PROMPTS[style as keyof typeof STYLE_PROMPTS] || STYLE_PROMPTS.portrait;
    const enhancedPrompt = `${stylePrompt}. ${prompt}. Artistic and romantic illustration, safe for work, no nudity, tasteful and elegant, AI-generated art`;

    console.log('Generating image with prompt:', enhancedPrompt);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      throw new Error('No image returned from AI');
    }

    // Save to database
    const { data: savedImage, error: saveError } = await supabase
      .from('generated_images')
      .insert({
        user_id: user.id,
        prompt: prompt,
        style: style,
        image_url: imageUrl
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving image:', saveError);
      throw saveError;
    }

    return new Response(
      JSON.stringify({ image: savedImage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
