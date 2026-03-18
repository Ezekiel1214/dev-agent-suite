const DEFAULT_MODEL = '@cf/meta/llama-3.1-8b-instruct';
const DEFAULT_MAX_TOKENS = 768;
const MAX_SYSTEM_CHARS = 12000;
const MAX_MESSAGE_CHARS = 12000;
const MAX_MESSAGES = 12;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = parseAllowedOrigins(env.ALLOWED_ORIGINS || '*');
    const headers = corsHeaders(origin, allowedOrigins);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname === '/health') {
      return json({
        ok: true,
        provider: 'cloudflare-workers-ai',
        model: env.TRIAL_MODEL || DEFAULT_MODEL
      }, 200, headers);
    }

    if (url.pathname !== '/api/trial-chat') {
      return json({ error: 'Not found' }, 404, headers);
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, headers);
    }

    if (!isOriginAllowed(origin, allowedOrigins)) {
      return json({ error: 'Origin not allowed' }, 403, headers);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, headers);
    }

    const agentId = String(body?.agentId || '').trim();
    const system = sanitizeText(body?.system || '', MAX_SYSTEM_CHARS);
    const messages = sanitizeMessages(body?.messages || []);
    const maxTokens = clampInt(body?.maxTokens, 256, 1024, DEFAULT_MAX_TOKENS);

    if (!agentId || !system || messages.length === 0) {
      return json({ error: 'agentId, system, and messages are required' }, 400, headers);
    }

    try {
      const result = await env.AI.run(env.TRIAL_MODEL || DEFAULT_MODEL, {
        messages: [{ role: 'system', content: system }, ...messages],
        max_tokens: parseInt(env.TRIAL_MAX_TOKENS || maxTokens, 10) || maxTokens,
        temperature: 0.2
      });

      return json({
        provider: 'cloudflare-workers-ai',
        model: env.TRIAL_MODEL || DEFAULT_MODEL,
        agentId,
        content: extractText(result)
      }, 200, headers);
    } catch (error) {
      return json({
        error: error?.message || 'Workers AI request failed'
      }, 500, headers);
    }
  }
};

function sanitizeMessages(messages) {
  return messages
    .filter(message => message && typeof message.content === 'string')
    .slice(-MAX_MESSAGES)
    .map(message => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: sanitizeText(message.content, MAX_MESSAGE_CHARS)
    }))
    .filter(message => message.content);
}

function sanitizeText(value, maxChars) {
  return String(value || '').trim().slice(0, maxChars);
}

function clampInt(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function parseAllowedOrigins(value) {
  if (!value || value === '*') return ['*'];
  return value.split(',').map(item => item.trim()).filter(Boolean);
}

function isOriginAllowed(origin, allowedOrigins) {
  if (!origin) return true;
  if (allowedOrigins.includes('*')) return true;
  return allowedOrigins.includes(origin);
}

function corsHeaders(origin, allowedOrigins) {
  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes('*') ? '*' : origin,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Content-Type': 'application/json'
  };
}

function json(payload, status, headers) {
  return new Response(JSON.stringify(payload), { status, headers });
}

function extractText(result) {
  if (typeof result === 'string') return result;
  if (typeof result?.response === 'string') return result.response;
  if (typeof result?.result?.response === 'string') return result.result.response;
  if (Array.isArray(result?.response)) {
    return result.response.map(part => part?.text || part?.response || '').join('').trim();
  }
  if (Array.isArray(result?.content)) {
    return result.content.map(part => part?.text || '').join('').trim();
  }
  return JSON.stringify(result);
}
