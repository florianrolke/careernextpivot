// GET /api/leads?k=<export-key>[&format=csv] — key-protected lead export.
// Reads every lead from KV (binding: CNP_LEADS), sorts newest-first,
// returns JSON by default or a well-formed CSV with ?format=csv.
// A catch-all onRequest returns 405 for non-GET methods (without it, Pages
// falls through to the static-asset SPA fallback and serves index.html with 200).

// Method-specific handlers take precedence, so this only fires for non-GET.
export function onRequest() {
  return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}

function csvField(v) {
  const s = v == null ? "" : String(v);
  // Wrap in double quotes, doubling any internal quotes.
  return '"' + s.replace(/"/g, '""') + '"';
}

export async function onRequestGet({ request, env }) {
  // 1. Key check — .trim() on BOTH sides is mandatory.
  //    Secrets piped via echo pick up trailing newlines; this exact bug bit a prior project.
  const url = new URL(request.url);
  const k = (url.searchParams.get("k") || "").trim();
  const expected = (env.LEADS_EXPORT_KEY || "").trim();
  if (!expected || k !== expected) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
  }

  // 2. Collect all leads by paging through the KV list.
  const leads = [];
  let cursor;
  while (true) {
    const listResult = await env.CNP_LEADS.list({ prefix: "lead:", cursor: cursor });
    const page = await Promise.all(
      listResult.keys.map((entry) => env.CNP_LEADS.get(entry.name, "json"))
    );
    for (const lead of page) {
      if (lead) leads.push(lead);
    }
    if (listResult.list_complete) break;
    cursor = listResult.cursor;
  }

  // 3. Sort by createdAt descending (newest first).
  leads.sort((a, b) => {
    const av = a.createdAt || "";
    const bv = b.createdAt || "";
    if (av < bv) return 1;
    if (av > bv) return -1;
    return 0;
  });

  const format = (url.searchParams.get("format") || "").toLowerCase();

  // 5. CSV export.
  if (format === "csv") {
    const rows = ["email,name,jobTitle,source,createdAt,country"];
    for (const lead of leads) {
      rows.push([
        csvField(lead.email),
        csvField(lead.name),
        csvField(lead.jobTitle),
        csvField(lead.source),
        csvField(lead.createdAt),
        csvField(lead.country)
      ].join(","));
    }
    return new Response(rows.join("\r\n") + "\r\n", {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="cnp-leads.csv"',
        "Cache-Control": "no-store"
      }
    });
  }

  // 4. Default JSON response.
  return new Response(JSON.stringify({ ok: true, count: leads.length, leads: leads }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}
