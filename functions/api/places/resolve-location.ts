import { resolveLocation } from "../../../src/services/placesService";

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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (context.request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (context.request.method !== "POST") {
    return new Response(
      JSON.stringify({
        status: "ERROR",
        results: [],
        errorMessage: "Method not allowed. Use POST.",
      }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    let body: any = {};
    try {
      body = await context.request.json();
    } catch {
      return new Response(
        JSON.stringify({
          status: "ERROR",
          results: [],
          errorMessage: "Invalid JSON request body.",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { query } = body;
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({
          status: "ERROR",
          results: [],
          errorMessage: "A valid location or postal code query is required.",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const mapsApiKey = context.env.GOOGLE_MAPS_API_KEY;
    const result = await resolveLocation(query, mapsApiKey);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error("Cloudflare Functions location resolution error:", error);
    return new Response(
      JSON.stringify({
        status: "ERROR",
        results: [],
        errorMessage: "Unable to resolve location at this time. Please try another city or postal code.",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
