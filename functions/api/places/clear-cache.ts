import { clearPlacesCache } from "../../../src/services/placesService";

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

  clearPlacesCache();
  return new Response(
    JSON.stringify({ status: "OK", message: "Places and geocoding cache cleared successfully." }),
    { status: 200, headers: corsHeaders }
  );
}
