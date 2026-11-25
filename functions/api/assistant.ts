
interface Env {
  GEMINI_API_KEY?: string;
}

interface EventContext {
  request: Request;
  env: Env;
}

const MODEL = "gemini-3.5-flash-lite";

const SYSTEM_INSTRUCTION = `
You are the official culinary assistant for Noakhali Kitchen
(https://www.noakhalikitchen.com).

Your mission:
- Provide trusted, comforting, authentic Halal recipes, cooking guidance,
  and regional food culture (Bengali, South Asian, Middle Eastern, and global Halal cuisine).
- Strictly adhere to Halal food principles. NEVER suggest pork, bacon,
  ham, lard, alcohol, or non-halal items.
- For ingredients with animal derivatives (gelatin, enzymes, emulsifiers,
  vanilla extract with alcohol, rennet), explain how to verify Halal suitability
  by checking packaging and contacting manufacturers.
- Never make unsupported Halal certification claims.
- Provide actionable, authentic, step-by-step cooking guidance.
- Be welcoming, warm, culturally respectful, practical, and objective.
`;

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders,
  });
}

function errorResponse(
  message: string,
  errorCode: string,
  status: number
): Response {
  return jsonResponse(
    { error: message, errorCode, message },
    status
  );
}

export async function onRequest(
  context: EventContext
): Promise<Response> {
  const { request, env } = context;

   
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return errorResponse("Method not allowed.", "METHOD_NOT_ALLOWED", 405);
  }

  if (!env.GEMINI_API_KEY) {
    return errorResponse(
      "The AI Assistant is not configured yet. Please try again later.",
      "MISSING_API_KEY",
      503
    );
  }

 let body: {
  query?: string;
  conversationHistory?: Array<{ role?: string; content?: string; text?: string }>;
  mode?: string;
};

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request body.", "INVALID_JSON", 400);
  }

  const query = typeof body.query === "string" ? body.query.trim() : "";

  if (!query) {
    return errorResponse("Please enter a question.", "EMPTY_QUERY", 400);
  }

  if (query.length > 12000) {
    return errorResponse(
      "Your question is too long. Please shorten it and try again.",
      "QUERY_TOO_LONG",
      400
    );
  }

    const history = Array.isArray(body.conversationHistory)
    ? body.conversationHistory
        .filter(
          (item) =>
            item &&
            (item.role === "user" || item.role === "assistant") &&
            typeof (item.content ?? item.text) === "string"
        )
        .slice(-10)
        .map((item) => ({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: String(item.content ?? item.text).slice(0, 12000) }],
        }))
    : [];

  while (history.length > 0 && history[0].role !== "user") {
    history.shift();
  }

  const contents = [
    ...history,
    { role: "user", parts: [{ text: query }] },
  ];

  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent` +
    `?key=${encodeURIComponent(env.GEMINI_API_KEY)}`;

  try {
    let response: Response | undefined;
    let result: any;

    for (let attempt = 0; attempt < 2; attempt++) {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents,
        }),
      });

      result = await response.json();

      const retryable =
        response.status >= 500 ||
        result?.error?.status === "UNAVAILABLE" ||
        result?.error?.status === "DEADLINE_EXCEEDED";

      if (response.ok || !retryable || attempt === 1) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    if (!response?.ok) {
      const apiError = result?.error;
      const apiMessage =
        typeof apiError?.message === "string"
          ? apiError.message
          : "The AI service could not complete your request.";

      const apiStatus = Number(apiError?.code) || response?.status || 500;
      const apiCode =
        typeof apiError?.status === "string"
          ? apiError.status
          : "GEMINI_API_ERROR";

      if (apiStatus === 429 || apiCode === "RESOURCE_EXHAUSTED") {
        return errorResponse(
          "The AI Assistant is temporarily busy. Please wait a moment and try again.",
          "QUOTA_EXCEEDED",
          429
        );
      }

      if (apiStatus === 403 || apiCode === "PERMISSION_DENIED") {
        return errorResponse(
          "The AI service key does not have permission to use this model.",
          "API_PERMISSION_DENIED",
          403
        );
      }

      if (apiStatus === 404 || apiCode === "NOT_FOUND") {
        return errorResponse(
          "The configured AI model is currently unavailable.",
          "MODEL_NOT_FOUND",
          404
        );
      }

      return errorResponse(
        apiMessage,
        apiCode,
        apiStatus >= 400 && apiStatus <= 599 ? apiStatus : 500
      );
    }

    const answer = result?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("")
      .trim();

    if (!answer) {
      return errorResponse(
        "The AI Assistant did not generate a response. Please try again.",
        "EMPTY_AI_RESPONSE",
        502
      );
    }

    return jsonResponse({
      text: answer,
      groundingSources: [],
      searchQueries: [],
      mode: body.mode || "general",
    });
  } catch {
    return errorResponse(
      "The AI Assistant could not connect right now. Please try again.",
      "CONNECTION_ERROR",
      502
    );
  }
}
