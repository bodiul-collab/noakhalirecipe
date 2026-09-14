export interface Env {
  GOOGLE_MAPS_API_KEY?: string;
  [key: string]: any;
}

interface EventContext {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
}

export async function onRequest(context: EventContext): Promise<Response> {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (context.request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const mapsApiKey = context.env.GOOGLE_MAPS_API_KEY || null;

  return new Response(
    JSON.stringify({
      configured: Boolean(mapsApiKey),
      clientApiKey: mapsApiKey,
    }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Cache-Control": "public, max-age=300",
      },
    }
  );
}
