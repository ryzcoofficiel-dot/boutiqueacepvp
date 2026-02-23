const DISCORD_URL = "https://discord.gg/acepvp";

const PACKS = [
  {
    id: "TZDHY3VPULC2U",
    amount: 500,
    price: "5,00 €",
    title: "500 AceCoins",
    desc: "Pack d'entrée pour commencer vos achats premium sur ACEPVP."
  },
  {
    id: "LWRB63XQHWR4Q",
    amount: 1000,
    price: "10,00 €",
    title: "1000 AceCoins",
    desc: "Le pack standard, idéal pour les achats rapides en boutique."
  },
  {
    id: "DKQZDYUBH3KV2",
    amount: 2000,
    price: "20,00 €",
    title: "2000 AceCoins",
    desc: "Pack avantageux pour débloquer plus de contenu premium."
  },
  {
    id: "MBU2H7X5W69MW",
    amount: 5000,
    price: "50,00 €",
    title: "5000 AceCoins",
    desc: "Gros pack pour les joueurs réguliers ACEPVP."
  },
  {
    id: "9ZL4PWSUNUKG8",
    amount: 10000,
    price: "100,00 €",
    title: "10000 AceCoins",
    desc: "Pack ultime pour les gros achats et contenus exclusifs."
  }
];

let toastTimer;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderPacks();
  initPayPalHostedButtons();
});

function renderPacks() {
  const grid = document.getElementById("packsGrid");

  grid.innerHTML = PACKS.map((pack) => `
    <article class="pack-card">
      <div class="pack-card__top">
        <span class="pack-badge"><span class="pack-badge__dot"></span>AceCoins</span>
        <h3 class="pack-name">${escapeHtml(pack.title)}</h3>
        <p class="pack-desc">${escapeHtml(pack.desc)}</p>
      </div>

      <div class="pack-card__bottom">
        <div class="pack-meta">
          <div class="pack-price">${escapeHtml(pack.price)}</div>
          <div class="pack-note">PayPal</div>
        </div>

        <div class="paypal-wrap" id="paypal-hosted-${escapeHtml(pack.id)}"></div>

        <p class="pack-help">Après paiement, ouvrez un ticket sur Discord pour la livraison.</p>
      </div>
    </article>
  `).join("");
}

function initPayPalHostedButtons() {
  const paypalAvailable = window.paypal && typeof window.paypal.HostedButtons === "function";

  for (const pack of PACKS) {
    const mount = document.getElementById(`paypal-hosted-${pack.id}`);
    if (!mount) continue;

    if (!paypalAvailable) {
      mount.innerHTML = `
        <div class="paypal-fallback">
          Bouton PayPal indisponible pour le moment. Rechargez la page.<br>
          Si le problème persiste, contactez-nous sur <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a>.
        </div>
      `;
      continue;
    }

    try {
      window.paypal.HostedButtons({ hostedButtonId: pack.id }).render(`#paypal-hosted-${cssEscape(pack.id)}`);
    } catch (err) {
      console.error(`Erreur PayPal Hosted Button (${pack.id})`, err);
      mount.innerHTML = `
        <div class="paypal-fallback">
          Impossible de charger ce bouton PayPal. Contactez le staff sur <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a>.
        </div>
      `;
    }
  }

  showToast("Boutique ACEPVP chargée ✅");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cssEscape(value) {
  if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}
