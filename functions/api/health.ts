export interface Env {
  GEMINI_API_KEY?: string;
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

  return new Response(
    JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      platform: "cloudflare_pages_functions",
    }),
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}
