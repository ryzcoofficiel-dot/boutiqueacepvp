const ALLOWED_ORIGIN_HEADERS = "Content-Type, PayPal-Transmission-Id, PayPal-Transmission-Time, PayPal-Transmission-Sig, PayPal-Cert-Url, PayPal-Auth-Algo";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(request, env) });
    }

    if (url.pathname === "/" || url.pathname === "/health") {
      return json({
        ok: true,
        service: "ACEPVP PayPal Discord Worker",
        endpoints: ["POST /api/notify-order", "POST /paypal-webhook"]
      }, 200, request, env);
    }

    if (url.pathname === "/api/notify-order" && request.method === "POST") {
      return handleFrontendNotify(request, env);
    }

    if (url.pathname === "/paypal-webhook" && request.method === "POST") {
      return handlePaypalWebhook(request, env);
    }

    return json({ ok: false, error: "Route introuvable." }, 404, request, env);
  }
};

async function handleFrontendNotify(request, env) {
  try {
    const body = await request.json();
    if (!body?.orderID || !Array.isArray(body?.items) || !body.items.length) {
      return json({ ok: false, error: "Payload invalide : orderID ou items manquants." }, 400, request, env);
    }

    const itemLines = body.items
      .map((item) => `• ${item.quantity}× ${item.name} — ${Number(item.lineTotal).toFixed(2)} ${body.currency || "EUR"}`)
      .join("\n");

    const embed = {
      title: "🛒 Nouvel achat ACEPVP",
      color: 0x9f62ff,
      fields: [
        { name: "Montant", value: `${body.amount} ${body.currency || "EUR"}`, inline: true },
        { name: "Statut", value: body.status || "CAPTURED", inline: true },
        { name: "Pseudo FiveM", value: safe(body.pseudo), inline: true },
        { name: "Discord", value: safe(body.discord), inline: true },
        { name: "Order ID", value: safe(body.orderID), inline: false },
        { name: "Capture ID", value: safe(body.captureID), inline: false },
        { name: "Produits", value: trimField(itemLines), inline: false },
        { name: "Payer", value: trimField(formatPayer(body.payer)), inline: false },
        { name: "Note", value: trimField(safe(body.note)), inline: false }
      ],
      footer: { text: `${env.SHOP_NAME || "ACEPVP"} • notification front après capture` },
      timestamp: new Date().toISOString()
    };

    await postDiscord(env.DISCORD_WEBHOOK_URL, { embeds: [embed] });
    return json({ ok: true }, 200, request, env);
  } catch (error) {
    return json({ ok: false, error: error.message || "Erreur interne." }, 500, request, env);
  }
}

async function handlePaypalWebhook(request, env) {
  try {
    const event = await request.json();
    const eventType = event?.event_type || "UNKNOWN";
    const resource = event?.resource || {};

    const embed = {
      title: "📨 PayPal webhook reçu",
      color: 0x2dd4bf,
      fields: [
        { name: "Event", value: safe(eventType), inline: true },
        { name: "Webhook ID", value: safe(env.PAYPAL_WEBHOOK_ID), inline: true },
        { name: "Order / Resource", value: safe(resource?.supplementary_data?.related_ids?.order_id || resource?.id), inline: false },
        { name: "Montant", value: trimField(formatMoney(resource)), inline: true },
        { name: "Statut", value: safe(resource?.status), inline: true },
        { name: "Payeur", value: trimField(resource?.payer?.email_address || resource?.payer?.payer_id || "Non fourni"), inline: false }
      ],
      footer: { text: `${env.SHOP_NAME || "ACEPVP"} • webhook PayPal` },
      timestamp: new Date().toISOString()
    };

    await postDiscord(env.DISCORD_WEBHOOK_URL, { embeds: [embed] });
    return json({ ok: true, received: true }, 200, request, env);
  } catch (error) {
    return json({ ok: false, error: error.message || "Erreur interne." }, 500, request, env);
  }
}

async function postDiscord(webhookUrl, payload) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Discord webhook en erreur: ${response.status} ${text}`);
  }
}

function formatPayer(payer) {
  if (!payer) return "Non fourni";
  return [payer.name, payer.email, payer.payer_id].filter(Boolean).join("\n") || "Non fourni";
}

function formatMoney(resource) {
  const amount = resource?.amount?.value || resource?.seller_receivable_breakdown?.gross_amount?.value || "Non fourni";
  const currency = resource?.amount?.currency_code || resource?.seller_receivable_breakdown?.gross_amount?.currency_code || "EUR";
  return `${amount} ${currency}`;
}

function safe(value) {
  if (value === null || value === undefined || value === "") return "Non fourni";
  return String(value).slice(0, 1024);
}

function trimField(value) {
  return safe(value).slice(0, 1024);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowOrigin = env.ALLOWED_ORIGIN === "*" ? "*" : (origin && origin === env.ALLOWED_ORIGIN ? origin : env.ALLOWED_ORIGIN);
  return {
    "Access-Control-Allow-Origin": allowOrigin || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": ALLOWED_ORIGIN_HEADERS,
    "Access-Control-Max-Age": "86400"
  };
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(request, env)
    }
  });
}
