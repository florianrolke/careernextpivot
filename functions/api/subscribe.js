// POST /api/subscribe — email capture for careernextpivot-demo
// Same-origin posture: NO CORS headers are emitted anywhere.
// Stores leads in Cloudflare KV (binding: CNP_LEADS). Privacy-clean: no IP, no user-agent.
// A catch-all onRequest returns 405 for non-POST methods (without it, Pages
// falls through to the static-asset SPA fallback and serves index.html with 200).

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(body, status) {
  return new Response(JSON.stringify(body), { status: status, headers: JSON_HEADERS });
}

// Method-specific handlers take precedence, so this only fires for non-POST.
export function onRequest() {
  return json({ ok: false, error: "method_not_allowed" }, 405);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_SOURCES = ["popup", "lp", "inline"];

export async function onRequestPost({ request, env }) {
  // 1. Same-origin posture. Never send CORS headers. Block cross-site fetches.
  const secFetchSite = request.headers.get("Sec-Fetch-Site");
  if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "none") {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  // 2. Parse JSON body.
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ ok: false, error: "bad_json" }, 400);
  }
  if (!body || typeof body !== "object") {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  // 3. Honeypot: silently drop bots that fill the hidden `company` field.
  if (body.company) {
    return json({ ok: true }, 200);
  }

  // 4. Validate + normalize.
  let email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  let name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  let jobTitle = typeof body.jobTitle === "string" ? body.jobTitle.trim().slice(0, 120) : "";

  let source = typeof body.source === "string" ? body.source : "";
  if (ALLOWED_SOURCES.indexOf(source) === -1) {
    source = "web";
  }

  // 5. KV key — idempotent per email + source.
  const key = `lead:${source}:${email}`;

  // 6/7. Read existing (preserve createdAt), write, respond.
  try {
    const existing = await env.CNP_LEADS.get(key, "json");
    const now = new Date().toISOString();
    const value = {
      email: email,
      name: name,
      jobTitle: jobTitle,
      source: source,
      createdAt: (existing && existing.createdAt) ? existing.createdAt : now,
      updatedAt: now,
      country: (request.cf && request.cf.country) ? request.cf.country : ""
    };
    await env.CNP_LEADS.put(key, JSON.stringify(value));
  } catch (e) {
    return json({ ok: false, error: "storage" }, 500);
  }

  return json({ ok: true }, 200);
}
