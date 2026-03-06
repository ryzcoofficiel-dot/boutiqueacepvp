const COIN_PACKS = [
  { id: "coins-500", title: "500 AceCoins", coins: 500, price: 5, image: "./images/ui/ace_logo.png", description: "Petit pack pour démarrer.", perks: ["Ticket Discord après paiement", "Ajoutable au panier", "Paiement groupé"] },
  { id: "coins-1000", title: "1000 AceCoins", coins: 1000, price: 10, image: "./images/ui/ace_logo.png", description: "Pack standard.", perks: ["Très demandé", "Paiement rapide", "Crédit staff"] },
  { id: "coins-2000", title: "2000 AceCoins", coins: 2000, price: 20, image: "./images/ui/ace_logo.png", description: "Pack conseillé pour le VIP.", perks: ["VIP = 2000 AC", "Bon ratio", "Panier PayPal"] },
  { id: "coins-5000", title: "5000 AceCoins", coins: 5000, price: 50, image: "./images/ui/ace_logo.png", description: "Pack premium.", perks: ["Gros achat", "Une seule commande", "Traitement plus simple"] },
  { id: "coins-10000", title: "10000 AceCoins", coins: 10000, price: 100, image: "./images/ui/ace_logo.png", description: "Pack maximum.", perks: ["Gros stock", "Pour plusieurs achats", "Récupération Discord"] }
];

const SERVICES = [
  {
    id: "vip",
    title: "VIP ACEPVP",
    image: "./images/products/vip_acepvp.png",
    priceCoins: 2000,
    description: "Le VIP se récupère avec 2000 AceCoins après crédit sur ton compte.",
    bullets: ["Kuruma blindée (semi-blindée)", "10× Micro SMG", "Munitions incluses"],
    buttonLabel: "Ticket Discord"
  },
  {
    id: "unban",
    title: "Unban ACEPVP",
    image: "./images/products/unban.png",
    priceEuro: 50,
    description: "Service séparé. Le staff traite la demande après preuve de paiement et ticket.",
    bullets: ["1 joueur / 1 compte", "Validation staff", "Réclamation via Discord"],
    buttonLabel: "Ticket Discord"
  }
];

const VEHICLES = [
  { id: "21x90", name: "2021 X90 Blindée", image: "./images/vehicles/x90_2021.png", priceCoins: 3999, rarity: "Épique", armor: "Niveau III", speed: "Très élevée", spawn: "21x90", description: "Coupé blindé premium avec excellente stabilité et look agressif." },
  { id: "mk2s95", name: "Karin S95 Blindée", image: "./images/vehicles/karin_s95.png", priceCoins: 3999, rarity: "Épique", armor: "Niveau III", speed: "Élevée", spawn: "mk2s95", description: "Version blindée équilibrée, idéale pour mobilité + protection." },
  { id: "mk2baggeds95", name: "Karin S95 Bagged Blindée", image: "./images/vehicles/karin_s95_bagged.png", priceCoins: 4499, rarity: "Légendaire", armor: "Niveau III+", speed: "Élevée", spawn: "mk2baggeds95", description: "Version bagged blindée premium pour un style showcar exclusif." },
  { id: "smash_schafter3", name: "Benefactor Schafter RS Blindée", image: "./images/vehicles/benefactor_schafter.png", priceCoins: 3999, rarity: "Épique", armor: "Niveau III", speed: "Moyenne +", spawn: "smash_schafter3", description: "Berline blindée très stable pour combats prolongés et teamplay." },
  { id: "scharmann", name: "Benefactor Scharmann Blindée", image: "./images/vehicles/benefactor_scharmann.png", priceCoins: 6999, rarity: "Mythique", armor: "Niveau IV", speed: "Moyenne", spawn: "scharmann", description: "Modèle prestige lourdement blindé, exclusif et imposant." },
  { id: "sentinel_rts", name: "Ubermacht Sentinel RTS Blindée", image: "./images/vehicles/ubermacht_sentinel_rts.png", priceCoins: 3999, rarity: "Épique", armor: "Niveau III", speed: "Élevée", spawn: "sentinel_rts", description: "Coupé blindé nerveux pour joueurs agressifs et mobiles." },
  { id: "growlerc", name: "Growler Custom Blindée", image: "./images/vehicles/growler_custom.png", priceCoins: 3999, rarity: "Épique", armor: "Niveau III", speed: "Très élevée", spawn: "growlerc", description: "Custom blindé très rapide avec finition premium." },
  { id: "elegysa", name: "Annis Elegy SA Blindée", image: "./images/vehicles/annis_elegy.png", priceCoins: 3999, rarity: "Épique", armor: "Niveau III", speed: "Élevée", spawn: "elegysa", description: "Icône ACEPVP blindée, grip exemplaire et contrôle précis." },
  { id: "weevb", name: "Baja Weevil Blindée", image: "./images/vehicles/baja_weevil.png", priceCoins: 2999, rarity: "Rare", armor: "Niveau II+", speed: "Moyenne", spawn: "weevb", description: "Blindée fun et mobile, parfaite pour un style décalé." }
];

const CART_KEY = "acepvp-cart-v2";
let cart = loadCart();
let paypalButtonsRendered = false;

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  bindEls();
  renderCoins();
  renderServices();
  renderVehicles();
  bindCartUi();
  updateCartUi();
  renderPayPalButtons();
});

function bindEls() {
  els.coinGrid = document.getElementById("coinGrid");
  els.serviceGrid = document.getElementById("serviceGrid");
  els.vehicleGrid = document.getElementById("vehicleGrid");
  els.cartCount = document.getElementById("cartCount");
  els.cartItems = document.getElementById("cartItems");
  els.cartSubtotal = document.getElementById("cartSubtotal");
  els.cartArticles = document.getElementById("cartArticles");
  els.cartDrawer = document.getElementById("cartDrawer");
  els.toast = document.getElementById("toast");
  els.paypalMount = document.getElementById("paypalButtonMount");
  els.playerName = document.getElementById("playerName");
  els.playerDiscord = document.getElementById("playerDiscord");
  els.orderNote = document.getElementById("orderNote");
}

function renderCoins() {
  els.coinGrid.innerHTML = COIN_PACKS.map((pack) => `
    <article class="coin-card">
      <div class="coin-card__top">
        <div>
          <p class="eyebrow">AceCoins</p>
          <h3>${escapeHtml(pack.title)}</h3>
        </div>
        <div class="price-pill">${formatPrice(pack.price)}</div>
      </div>
      <p>${escapeHtml(pack.description)}</p>
      <ul>${pack.perks.map((perk) => `<li>${escapeHtml(perk)}</li>`).join("")}</ul>
      <div class="tag">${pack.coins.toLocaleString("fr-FR")} AC</div>
      <div class="coin-card__footer">
        <button class="btn btn--primary" type="button" data-add-pack="${pack.id}">Ajouter</button>
        <button class="btn btn--ghost" type="button" data-buy-now="${pack.id}">Acheter seul</button>
      </div>
    </article>
  `).join("");

  els.coinGrid.querySelectorAll("[data-add-pack]").forEach((button) => {
    button.addEventListener("click", () => addPack(button.dataset.addPack, 1));
  });
  els.coinGrid.querySelectorAll("[data-buy-now]").forEach((button) => {
    button.addEventListener("click", () => {
      cart = [];
      addPack(button.dataset.buyNow, 1);
      openCart();
      scrollToPayPal();
    });
  });
}

function renderServices() {
  els.serviceGrid.innerHTML = SERVICES.map((service) => `
    <article class="service-card">
      <img src="${service.image}" alt="${escapeHtml(service.title)}" style="border-radius:18px; aspect-ratio:16/9; object-fit:cover; width:100%;">
      <div class="service-card__top">
        <div>
          <p class="eyebrow">${service.id === "vip" ? "Achetable en AceCoins" : "Service staff"}</p>
          <h3>${escapeHtml(service.title)}</h3>
        </div>
        <div class="price-pill">${service.priceCoins ? `${service.priceCoins.toLocaleString("fr-FR")} AC` : formatPrice(service.priceEuro)}</div>
      </div>
      <p>${escapeHtml(service.description)}</p>
      <ul>${service.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <div class="service-card__footer">
        <a class="btn btn--secondary" href="${window.SHOP_CONFIG.discordInvite}" target="_blank" rel="noopener noreferrer">${escapeHtml(service.buttonLabel)}</a>
        ${service.id === "vip" ? `<button class="btn btn--ghost" type="button" data-add-pack="coins-2000">Ajouter 2000 AC</button>` : ""}
      </div>
    </article>
  `).join("");

  els.serviceGrid.querySelectorAll("[data-add-pack]").forEach((button) => {
    button.addEventListener("click", () => addPack(button.dataset.addPack, 1));
  });
}

function renderVehicles() {
  els.vehicleGrid.innerHTML = VEHICLES.map((vehicle) => `
    <article class="vehicle-card">
      <img src="${vehicle.image}" alt="${escapeHtml(vehicle.name)}">
      <div class="vehicle-card__body">
        <div class="coin-card__top">
          <div>
            <p class="eyebrow">${escapeHtml(vehicle.rarity)}</p>
            <h3>${escapeHtml(vehicle.name)}</h3>
          </div>
          <div class="price-pill">${vehicle.priceCoins.toLocaleString("fr-FR")} AC</div>
        </div>
        <p>${escapeHtml(vehicle.description)}</p>
        <div class="vehicle-card__meta">
          <div><span>Blindage</span><strong>${escapeHtml(vehicle.armor)}</strong></div>
          <div><span>Vitesse</span><strong>${escapeHtml(vehicle.speed)}</strong></div>
          <div><span>Spawn</span><strong>${escapeHtml(vehicle.spawn)}</strong></div>
        </div>
        <div class="coin-card__footer">
          <a class="btn btn--secondary" href="${window.SHOP_CONFIG.discordInvite}" target="_blank" rel="noopener noreferrer">Ticket Discord</a>
        </div>
      </div>
    </article>
  `).join("");
}

function bindCartUi() {
  document.getElementById("openCartBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);
  document.getElementById("closeCartOverlay").addEventListener("click", closeCart);
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addPack(packId, quantity) {
  const pack = COIN_PACKS.find((item) => item.id === packId);
  if (!pack) return;
  const existing = cart.find((item) => item.id === packId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...pack, quantity });
  }
  saveCart();
  updateCartUi();
  toast(`${pack.title} ajouté au panier.`);
}

function changeQty(packId, delta) {
  const item = cart.find((entry) => entry.id === packId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== packId);
  }
  saveCart();
  updateCartUi();
}

function removeItem(packId) {
  cart = cart.filter((entry) => entry.id !== packId);
  saveCart();
  updateCartUi();
}

function updateCartUi() {
  const articleCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getCartTotal();
  els.cartCount.textContent = String(articleCount);
  els.cartArticles.textContent = String(articleCount);
  els.cartSubtotal.textContent = formatPrice(subtotal);

  if (!cart.length) {
    els.cartItems.innerHTML = `<div class="card"><p class="mini">Ton panier est vide. Ajoute un ou plusieurs packs AceCoins.</p></div>`;
  } else {
    els.cartItems.innerHTML = cart.map((item) => `
      <article class="cart-item">
        <img src="${item.image}" alt="${escapeHtml(item.title)}">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <div class="mini">${item.coins.toLocaleString("fr-FR")} AC • ${formatPrice(item.price)}</div>
          <div class="qty-row">
            <button type="button" data-qty="minus" data-pack-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-qty="plus" data-pack-id="${item.id}">+</button>
          </div>
        </div>
        <div>
          <strong>${formatPrice(item.price * item.quantity)}</strong>
          <div style="height:8px"></div>
          <button class="btn btn--danger" type="button" data-remove-item="${item.id}">Retirer</button>
        </div>
      </article>
    `).join("");
  }

  els.cartItems.querySelectorAll("[data-qty]").forEach((button) => {
    button.addEventListener("click", () => {
      changeQty(button.dataset.packId, button.dataset.qty === "plus" ? 1 : -1);
    });
  });
  els.cartItems.querySelectorAll("[data-remove-item]").forEach((button) => {
    button.addEventListener("click", () => removeItem(button.dataset.removeItem));
  });

  renderPayPalButtons();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderPayPalButtons() {
  if (!els.paypalMount) return;
  els.paypalMount.innerHTML = "";

  if (!window.paypal || !window.paypal.Buttons) {
    els.paypalMount.innerHTML = `<p class="mini status-bad">Le SDK PayPal n'est pas chargé.</p>`;
    return;
  }

  window.paypal.Buttons({
    style: { layout: "vertical", shape: "rect", label: "paypal", height: 48 },
    onClick: () => {
      if (!cart.length) {
        toast("Ajoute au moins un pack AceCoins au panier.");
        return actionsRejectShim();
      }
      if (!els.playerName.value.trim()) {
        toast("Renseigne ton pseudo FiveM avant de payer.");
        els.playerName.focus();
        return actionsRejectShim();
      }
      return true;
    },
    createOrder(data, actions) {
      if (!cart.length) {
        toast("Panier vide.");
        throw new Error("Panier vide");
      }
      const items = flattenCartForPayPal();
      return actions.order.create({
        purchase_units: [{
          description: buildDescription(),
          amount: {
            currency_code: window.SHOP_CONFIG.currency,
            value: getCartTotal().toFixed(2),
            breakdown: {
              item_total: {
                currency_code: window.SHOP_CONFIG.currency,
                value: getCartTotal().toFixed(2)
              }
            }
          },
          items,
          custom_id: els.playerName.value.trim().slice(0, 127)
        }]
      });
    },
    async onApprove(data, actions) {
      const details = await actions.order.capture();
      const payload = buildWorkerPayload(details, data);
      try {
        const response = await fetch(`${window.SHOP_CONFIG.workerBaseUrl}/api/notify-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) {
          throw new Error(result.error || "Le Worker a refusé la notification Discord.");
        }
        toast("Paiement capturé et achat envoyé sur Discord.");
      } catch (error) {
        console.error(error);
        toast(`Paiement capturé, mais la notification Discord a échoué : ${error.message}`);
      }
      cart = [];
      saveCart();
      updateCartUi();
      closeCart();
    },
    onError(err) {
      console.error(err);
      toast("Erreur PayPal. Vérifie le client ID, le compte marchand et le Worker.");
    }
  }).render("#paypalButtonMount");
}

function flattenCartForPayPal() {
  return cart.map((item) => ({
    name: item.title.slice(0, 127),
    quantity: String(item.quantity),
    unit_amount: {
      currency_code: window.SHOP_CONFIG.currency,
      value: item.price.toFixed(2)
    }
  }));
}

function buildDescription() {
  return cart.map((item) => `${item.quantity}× ${item.title}`).join(" | ").slice(0, 127);
}

function buildWorkerPayload(details, data) {
  const capture = details?.purchase_units?.[0]?.payments?.captures?.[0] || null;
  const payer = details?.payer || {};
  return {
    source: "frontend_capture",
    shop: "ACEPVP",
    orderID: data?.orderID || details?.id || null,
    captureID: capture?.id || null,
    status: capture?.status || details?.status || null,
    amount: getCartTotal().toFixed(2),
    currency: window.SHOP_CONFIG.currency,
    pseudo: els.playerName.value.trim(),
    discord: els.playerDiscord.value.trim(),
    note: els.orderNote.value.trim(),
    payer: {
      email: payer?.email_address || null,
      payer_id: payer?.payer_id || null,
      name: [payer?.name?.given_name, payer?.name?.surname].filter(Boolean).join(" ") || null
    },
    items: cart.map((item) => ({
      id: item.id,
      name: item.title,
      coins: item.coins,
      quantity: item.quantity,
      unitPrice: item.price,
      lineTotal: Number((item.quantity * item.price).toFixed(2))
    }))
  };
}

function openCart() {
  els.cartDrawer.classList.add("is-open");
  els.cartDrawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  els.cartDrawer.classList.remove("is-open");
  els.cartDrawer.setAttribute("aria-hidden", "true");
}
function scrollToPayPal() {
  document.getElementById("guide").scrollIntoView({ behavior: "smooth", block: "start" });
}
function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: window.SHOP_CONFIG.currency }).format(value);
}
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => els.toast.classList.remove("is-visible"), 3200);
}
function actionsRejectShim() {
  return false;
}
