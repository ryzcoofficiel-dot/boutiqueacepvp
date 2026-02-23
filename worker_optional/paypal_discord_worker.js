/**
 * Cloudflare Worker — PayPal Webhook -> Discord
 *
 * Usage:
 * 1) Déployer ce Worker sur Cloudflare
 * 2) Ajouter un secret Cloudflare : DISCORD_WEBHOOK_URL
 * 3) Configurer l'URL /paypal-webhook dans PayPal Developer > Webhooks
 *
 * ⚠️ Exemple simple (production = ajouter vérification de signature PayPal + anti-doublon)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check simple
    if (request.method === "GET") {
      return json({
        ok: true,
        service: "ACEPVP PayPal -> Discord",
        endpoint: "/paypal-webhook",
        time: new Date().toISOString()
      });
    }

    if (url.pathname !== "/paypal-webhook") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const discordWebhook = env.DISCORD_WEBHOOK_URL;
    if (!discordWebhook) {
      return new Response("Missing DISCORD_WEBHOOK_URL secret", { status: 500 });
    }

    const eventType = String(body?.event_type || "UNKNOWN_EVENT");
    const resource = body?.resource || {};

    // Tente d'extraire les infos les plus utiles selon le type d'événement
    const amountObj =
      resource?.amount ||
      resource?.seller_receivable_breakdown?.gross_amount ||
      resource?.purchase_units?.[0]?.amount ||
      null;

    const amount = amountObj?.value ?? "?";
    const currency = amountObj?.currency_code ?? "EUR";

    const payerEmail =
      resource?.payer?.email_address ||
      resource?.payer_email ||
      resource?.payee?.email_address ||
      "Non disponible";

    const orderOrCaptureId =
      resource?.supplementary_data?.related_ids?.order_id ||
      resource?.id ||
      body?.id ||
      "N/A";

    const status = resource?.status || "N/A";

    // (Optionnel) filtre uniquement les événements de paiement utiles
    const accepted = new Set([
      "PAYMENT.CAPTURE.COMPLETED",
      "CHECKOUT.ORDER.APPROVED",
      "PAYMENT.SALE.COMPLETED"
    ]);

    // Si tu veux tout logger, mets cette condition en commentaire
    if (!accepted.has(eventType)) {
      return json({ ok: true, ignored: true, eventType });
    }

    const payload = {
      username: "ACEPVP Boutique",
      embeds: [
        {
          title: "🛒 Nouveau paiement PayPal",
          color: 9323775,
          description: "Un événement PayPal a été reçu pour la boutique ACEPVP.",
          fields: [
            { name: "Événement", value: eventType, inline: false },
            { name: "Montant", value: `${amount} ${currency}`, inline: true },
            { name: "Statut", value: String(status), inline: true },
            { name: "Email", value: String(payerEmail), inline: false },
            { name: "ID", value: String(orderOrCaptureId), inline: false }
          ],
          footer: { text: "ACEPVP • PayPal Webhook" },
          timestamp: new Date().toISOString()
        }
      ]
    };

    const discordResp = await fetch(discordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!discordResp.ok) {
      const txt = await discordResp.text().catch(() => "");
      return new Response(`Discord error ${discordResp.status}: ${txt}`, { status: 502 });
    }

    return json({ ok: true, logged: true, eventType });
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
