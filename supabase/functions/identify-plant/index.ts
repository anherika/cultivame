import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const { image } = await request.json();
    const apiKey = Deno.env.get('PLANTNET_API_KEY');
    if (!apiKey) throw new Error('Falta configurar PLANTNET_API_KEY en Supabase.');
    if (typeof image !== 'string' || !image.startsWith('data:image/')) throw new Error('Imagen no válida.');

    const [meta, encoded] = image.split(',', 2);
    const mime = meta.match(/data:(.*?);base64/)?.[1] || 'image/jpeg';
    const bytes = Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0));
    const form = new FormData();
    form.append('images', new Blob([bytes], { type: mime }), 'plant.jpg');
    form.append('organs', 'leaf');

    const response = await fetch(`https://my-api.plantnet.org/v2/identify/all?api-key=${apiKey}&lang=es`, {
      method: 'POST',
      body: form,
    });
    if (!response.ok) throw new Error(`Pl@ntNet respondió ${response.status}.`);
    const result = await response.json();
    const best = result.results?.[0];
    if (!best) return new Response(JSON.stringify({ match: null }), { headers: { ...cors, 'Content-Type': 'application/json' } });

    return new Response(JSON.stringify({
      match: {
        scientific: best.species?.scientificNameWithoutAuthor || best.species?.scientificName,
        commonNames: best.species?.commonNames || [],
        score: best.score,
      },
    }), { headers: { ...cors, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
});
