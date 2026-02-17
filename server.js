import express from "express";
import crypto from "crypto";

const app = express();

const PORT = process.env.PORT || 3000;
const TEBEX_WEBHOOK_SECRET = process.env.TEBEX_WEBHOOK_SECRET || "fd97d607e62dd483d487aff3f788b8b0";
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1471561824234115124/BgoOTnNBFUL-dYm-cla4iBQ7j59u8W_A0JL0GAo37DLQEyLpHS_D3y_4H2NTT9-WYxh1";
const DISCORD_PING_ROLE_ID = process.env.DISCORD_PING_ROLE_ID || ""; // optionnel
const ENFORCE_TEBEX_IP_CHECK = (process.env.TEBEX_IP_CHECK || "0") === "1";

// Tebex dit que les webhooks viennent de 2 IPs fixes
const TEBEX_IPS = new Set(["18.209.80.3", "54.87.231.232"]); // :contentReference[oaicite:1]{index=1}

// Anti-doublons simple (Tebex peut renvoyer si pas 2XX)
const seenWebhookIds = new Map(); // id -> timestamp
const SEEN_TTL_MS = 60 * 60 * 1000;

function cleanupSeen() {
  const now = Date.now();
  for (const [id, ts] of seenWebhookIds.entries()) {
    if (now - ts > SEEN_TTL_MS) seenWebhookIds.delete(id);
  }
}

function getRequestIp(req) {
  // Render/Proxy : X-Forwarded-For peut contenir "ip, ip, ..."
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) return xff.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

function timingSafeEqualHex(a, b) {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length) return false;
    return crypto.timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

function tebexSignatureIsValid(rawBodyBuffer, headerSig) {
  // Tebex: SHA256(JSON body) puis HMAC-SHA256(bodyHash, secret) :contentReference[oaicite:2]{index=2}
  if (!TEBEX_WEBHOOK_SECRET) return false;
  if (!headerSig) return false;

  const bodyHashHex = crypto.createHash("sha256").update(rawBodyBuffer).digest("hex");
  const expectedHex = crypto
    .createHmac("sha256", TEBEX_WEBHOOK_SECRET)
    .update(bodyHashHex)
    .digest("hex");

  return timingSafeEqualHex(expectedHex, headerSig);
}

async function postToDiscord(payload) {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn("DISCORD_WEBHOOK_URL manquant: aucune notif Discord envoyée.");
    return;
  }

  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Discord webhook error ${res.status}: ${txt}`);
  }
}

function truncate(str, max = 1024) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max - 3) + "..." : str;
}

function extractBuyerInfoFromProducts(products) {
  // Si tu utilises des “variables” Tebex (ex: discord id / pseudo), on essaie de les afficher
  const found = [];
  for (const p of products || []) {
    const vars = p?.variables || p?.options || [];
    if (Array.isArray(vars)) {
      for (const v of vars) {
        const key = v?.identifier || v?.name || v?.id;
        const val = v?.value ?? v?.selected ?? v?.option ?? v?.text;
        if (key && val) found.push(`${key}: ${val}`);
      }
    }
  }
  return found;
}

// Page de test
app.get("/", (req, res) => res.send("OK"));

// Route webhook Tebex (RAW BODY obligatoire sinon la signature peut mismatch) :contentReference[oaicite:3]{index=3}
app.post("/tebex/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  cleanupSeen();

  const ip = getRequestIp(req);

  if (ENFORCE_TEBEX_IP_CHECK && !TEBEX_IPS.has(ip)) {
    // Tebex conseille de rejeter si l’IP n’est pas dans la liste :contentReference[oaicite:4]{index=4}
    return res.sendStatus(404);
  }

  const raw = req.body; // Buffer
  const xSig = req.header("X-Signature") || "";

  let event;
  try {
    event = JSON.parse(raw.toString("utf8"));
  } catch {
    return res.sendStatus(400);
  }

  // Validation webhook: réponse obligatoire {id: "<id>"} :contentReference[oaicite:5]{index=5}
  if (event?.type === "validation.webhook") {
    return res.status(200).json({ id: event.id });
  }

  // Vérif signature (conseillée fortement par Tebex) :contentReference[oaicite:6]{index=6}
  // Si tu n’as pas encore mis TEBEX_WEBHOOK_SECRET, tu peux commenter ce bloc TEMPORAIREMENT,
  // mais il faut le remettre ensuite.
  if (!tebexSignatureIsValid(raw, xSig)) {
    console.warn("Signature invalide (X-Signature). Event ignoré.");
    return res.sendStatus(401);
  }

  // Anti-doublon
  if (event?.id && seenWebhookIds.has(event.id)) {
    return res.sendStatus(204);
  }
  if (event?.id) seenWebhookIds.set(event.id, Date.now());

  // On répond en 2XX pour éviter les retries Tebex (sinon Tebex renvoie) :contentReference[oaicite:7]{index=7}
  // On fait le travail et on renvoie 204 à la fin.
  try {
    if (event?.type === "payment.completed") {
      const payment = event.subject || {};
      const txid = payment.transaction_id || "(transaction_id inconnu)";
      const statusId = payment?.status?.id;
      const products = payment.products || [];

      const productLines = (products || []).map((p) => {
        const name = p?.name || "Produit";
        const qty = p?.quantity ?? 1;
        return `• ${name} x${qty}`;
      });

      const buyerHints = extractBuyerInfoFromProducts(products);
      const ping = DISCORD_PING_ROLE_ID ? `<@&${DISCORD_PING_ROLE_ID}> ` : "";

      const embed = {
        title: "🧾 Achat Tebex confirmé (à donner manuellement)",
        description: truncate(
          [
            `**Transaction ID :** \`${txid}\``,
            statusId ? `**Status ID :** \`${statusId}\`` : null,
            buyerHints.length ? `**Infos client :**\n${buyerHints.map((x) => `• ${x}`).join("\n")}` : null,
            productLines.length ? `**Produits :**\n${productLines.join("\n")}` : null,
            "",
            "✅ Action staff : donne la récompense en jeu puis marque cette vente comme traitée (dans ton suivi).",
          ]
            .filter(Boolean)
            .join("\n"),
          4000
        ),
      };

      await postToDiscord({
        content: ping || undefined,
        embeds: [embed],
        allowed_mentions: DISCORD_PING_ROLE_ID ? { roles: [DISCORD_PING_ROLE_ID] } : { parse: [] },
      });

      console.log("payment.completed envoyé sur Discord:", txid);
    }

    if (event?.type === "payment.refunded") {
      const payment = event.subject || {};
      const txid = payment.transaction_id || "(transaction_id inconnu)";

      await postToDiscord({
        embeds: [
          {
            title: "⚠️ Tebex: paiement remboursé",
            description: `Transaction ID : \`${txid}\`\nPense à retirer/annuler la récompense si nécessaire.`,
          },
        ],
        allowed_mentions: { parse: [] },
      });
    }

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    // Si tu renvoies != 2XX, Tebex va retenter plus tard :contentReference[oaicite:8]{index=8}
    // Ici, on renvoie 500 pour que Tebex retente (utile si Discord était down),
    // mais ça peut créer des doublons si Discord a reçu quand même.
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  if (!TEBEX_WEBHOOK_SECRET) console.warn("⚠️ TEBEX_WEBHOOK_SECRET manquant");
  if (!DISCORD_WEBHOOK_URL) console.warn("⚠️ DISCORD_WEBHOOK_URL manquant");
});
