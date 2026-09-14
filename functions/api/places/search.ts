import { searchHalalPlaces } from "../../../src/services/placesService";

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
        places: [],
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
          places: [],
          errorMessage: "Invalid JSON request body.",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const {
      category,
      lat,
      lng,
      radiusMeters,
      subQuery,
      openNow,
      minRating,
      locationName,
      refresh,
      forceRefresh,
      pageToken,
    } = body;

    if (
      !category ||
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      !["restaurants", "groceries", "mosques"].includes(category)
    ) {
      return new Response(
        JSON.stringify({
          status: "ERROR",
          places: [],
          errorMessage: "Invalid search parameters. Category, latitude, and longitude are required.",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const mapsApiKey = context.env.GOOGLE_MAPS_API_KEY;
    const searchResult = await searchHalalPlaces({
      category,
      lat,
      lng,
      radiusMeters: typeof radiusMeters === "number" ? radiusMeters : 16093,
      subQuery: typeof subQuery === "string" ? subQuery : undefined,
      openNow: Boolean(openNow),
      minRating: typeof minRating === "number" ? minRating : 0,
      locationName: typeof locationName === "string" ? locationName : undefined,
      apiKey: mapsApiKey,
      forceRefresh: Boolean(refresh || forceRefresh),
      pageToken: typeof pageToken === "string" ? pageToken : undefined,
    });

    return new Response(JSON.stringify(searchResult), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error("Cloudflare Functions places search error:", error);
    return new Response(
      JSON.stringify({
        status: "ERROR",
        places: [],
        errorMessage: "Could not complete places search. Please try again shortly.",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
