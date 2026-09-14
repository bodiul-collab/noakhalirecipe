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

  const hasMapsKey = Boolean(context.env.GOOGLE_MAPS_API_KEY);

  return new Response(
    JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      platform: "cloudflare_pages_functions",
      services: {
        placesApiConfigured: hasMapsKey,
      },
    }),
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
