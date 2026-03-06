const DISCORD_URL = "https://discord.gg/acepvp";

const COIN_PACKS = [
  { id: "ac500", amount: 500, price: 5, priceLabel: "5,00 €", title: "500 AceCoins", description: "Pack d’entrée pour commencer.", perks: ["Paiement PayPal", "Crédit via ticket Discord", "Ajoutable au panier"] },
  { id: "ac1000", amount: 1000, price: 10, priceLabel: "10,00 €", title: "1000 AceCoins", description: "Pack standard.", perks: ["Le plus demandé", "Idéal pour petits achats", "Paiement unique possible"] },
  { id: "ac2000", amount: 2000, price: 20, priceLabel: "20,00 €", title: "2000 AceCoins", description: "Pack conseillé pour le VIP.", perks: ["Correspond au VIP", "Bon rapport quantité / prix", "Ajoutable au panier"] },
  { id: "ac5000", amount: 5000, price: 50, priceLabel: "50,00 €", title: "5000 AceCoins", description: "Pack premium.", perks: ["Pour plusieurs achats", "Très bon stock d’AceCoins", "Paiement groupé"] },
  { id: "ac10000", amount: 10000, price: 100, priceLabel: "100,00 €", title: "10000 AceCoins", description: "Pack ultime.", perks: ["Quantité maximale", "Pour gros joueurs", "Paiement PayPal sécurisé"] }
];

const VIP = {
  name: "VIP ACEPVP",
  image: "images/products/vip_acepvp.png",
  priceCoins: 2000,
  description: "Le VIP s’achète avec 2000 AceCoins une fois tes coins crédités par le staff.",
  includes: [
    "Kuruma blindée (semi-blindée)",
    "10× Micro SMG",
    "Munitions incluses"
  ]
};

const SERVICE = {
  name: "Unban ACEPVP",
  image: "images/products/unban.png",
  description: "Service séparé à traiter avec le staff via ticket Discord.",
  priceLabel: "50,00 €",
  notes: [
    "Traitement via ticket Discord",
    "Validation staff obligatoire",
    "Prépare ta preuve si demandée"
  ]
};

const VEHICLES = [
  { name: "2021 X90 Blindée", image: "images/vehicles/x90_2021.png", priceCoins: 3999, rarity: "Épique", spawn: "21x90", description: "Coupé blindé premium avec très bonne stabilité." , featured: 2},
  { name: "Karin S95 Blindée", image: "images/vehicles/karin_s95.png", priceCoins: 3999, rarity: "Épique", spawn: "mk2s95", description: "Version blindée équilibrée pour mobilité et protection.", featured: 3 },
  { name: "Karin S95 Bagged Blindée", image: "images/vehicles/karin_s95_bagged.png", priceCoins: 4499, rarity: "Légendaire", spawn: "mk2baggeds95", description: "Version bagged premium pour un style exclusif.", featured: 5 },
  { name: "Benefactor Schafter RS Blindée", image: "images/vehicles/benefactor_schafter.png", priceCoins: 3999, rarity: "Épique", spawn: "smash_schafter3", description: "Berline blindée très stable pour le teamplay.", featured: 4 },
  { name: "Benefactor Scharmann Blindée", image: "images/vehicles/benefactor_scharmann.png", priceCoins: 6999, rarity: "Mythique", spawn: "scharmann", description: "Modèle prestige lourdement blindé.", featured: 1 },
  { name: "Ubermacht Sentinel RTS Blindée", image: "images/vehicles/ubermacht_sentinel_rts.png", priceCoins: 3999, rarity: "Épique", spawn: "sentinel_rts", description: "Coupé blindé nerveux pour joueurs mobiles.", featured: 6 },
  { name: "Growler Custom Blindée", image: "images/vehicles/growler_custom.png", priceCoins: 3999, rarity: "Épique", spawn: "growlerc", description: "Custom blindé très rapide avec finition premium.", featured: 7 },
  { name: "Annis Elegy SA Blindée", image: "images/vehicles/annis_elegy.png", priceCoins: 3999, rarity: "Épique", spawn: "elegysa", description: "Très bon grip et excellent contrôle.", featured: 8 },
  { name: "Baja Weevil Blindée", image: "images/vehicles/baja_weevil.png", priceCoins: 2999, rarity: "Rare", spawn: "weevb", description: "Blindée fun et mobile, plus accessible.", featured: 9 }
];

const state = {
  cart: loadCart(),
  search: "",
  sort: "featured",
  paypalRendered: false,
  toastTimer: null
};

window.addEventListener("DOMContentLoaded", () => {
  renderCoinCards();
  renderVipCard();
  renderServiceCard();
  renderVehicles();
  bindUi();
  updateCartUi();
  initPayPalButtons();
});

function bindUi() {
  document.getElementById("cartFab").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("cartBackdrop").addEventListener("click", closeCart);
  document.getElementById("clearCart").addEventListener("click", clearCart);

  document.getElementById("vehicleSearch").addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    renderVehicles();
  });

  document.getElementById("vehicleSort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderVehicles();
  });
}

function renderCoinCards() {
  const grid = document.getElementById("coinsGrid");
  grid.innerHTML = COIN_PACKS.map((pack) => `
    <article class="card">
      <div class="coin-card__top">
        <span class="badge">AceCoins</span>
        <span class="coin-price">${pack.priceLabel}</span>
      </div>
      <h3 class="coin-amount">${pack.title}</h3>
      <p class="coin-desc">${pack.description}</p>
      <ul class="coin-list">
        ${pack.perks.map((perk) => `<li>${escapeHtml(perk)}</li>`).join("")}
      </ul>
      <div class="card__footer">
        <button class="btn btn--primary btn--full" type="button" data-add-pack="${pack.id}">Ajouter au panier</button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add-pack]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.addPack));
  });
}

function renderVipCard() {
  const el = document.getElementById("vipCard");
  el.innerHTML = `
    <img class="feature-card__image" src="${VIP.image}" alt="${escapeHtml(VIP.name)}">
    <div class="feature-card__top">
      <span class="badge">VIP</span>
      <span class="feature-card__price">${VIP.priceCoins} AC</span>
    </div>
    <h3>${escapeHtml(VIP.name)}</h3>
    <p>${escapeHtml(VIP.description)}</p>
    <ul class="feature-list">
      ${VIP.includes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
    <div class="feature-card__footer">
      <button class="btn btn--primary" type="button" data-add-pack="ac2000">Acheter 2000 AC</button>
      <a class="btn btn--ghost" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Ticket Discord</a>
    </div>
  `;

  el.querySelector("[data-add-pack]").addEventListener("click", () => addToCart("ac2000"));
}

function renderServiceCard() {
  const el = document.getElementById("serviceCard");
  el.innerHTML = `
    <img class="feature-card__image" src="${SERVICE.image}" alt="${escapeHtml(SERVICE.name)}">
    <div class="feature-card__top">
      <span class="badge">Service</span>
      <span class="feature-card__price">${SERVICE.priceLabel}</span>
    </div>
    <h3>${escapeHtml(SERVICE.name)}</h3>
    <p>${escapeHtml(SERVICE.description)}</p>
    <ul class="feature-list">
      ${SERVICE.notes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
    <div class="feature-card__footer">
      <a class="btn btn--ghost btn--full" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Ouvrir un ticket Discord</a>
    </div>
  `;
}

function renderVehicles() {
  const grid = document.getElementById("vehicleGrid");
  const filtered = VEHICLES.filter((vehicle) => {
    if (!state.search) return true;
    const text = `${vehicle.name} ${vehicle.rarity} ${vehicle.spawn}`.toLowerCase();
    return text.includes(state.search);
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (state.sort) {
      case "price-asc": return a.priceCoins - b.priceCoins;
      case "price-desc": return b.priceCoins - a.priceCoins;
      case "name-asc": return a.name.localeCompare(b.name, "fr");
      default: return (a.featured ?? 999) - (b.featured ?? 999);
    }
  });

  if (!sorted.length) {
    grid.innerHTML = `<article class="card"><h3>Aucun véhicule trouvé</h3><p class="coin-desc">Essaie une autre recherche.</p></article>`;
    return;
  }

  grid.innerHTML = sorted.map((vehicle) => `
    <article class="vehicle-card">
      <img class="vehicle-card__image" src="${vehicle.image}" alt="${escapeHtml(vehicle.name)}">
      <div class="vehicle-card__body">
        <div class="vehicle-card__top">
          <span class="badge">${escapeHtml(vehicle.rarity)}</span>
          <span class="vehicle-card__price">${formatCoins(vehicle.priceCoins)} AC</span>
        </div>
        <h3 class="vehicle-card__name">${escapeHtml(vehicle.name)}</h3>
        <p>${escapeHtml(vehicle.description)}</p>
        <ul class="vehicle-meta">
          <li><strong>Spawn :</strong> ${escapeHtml(vehicle.spawn)}</li>
          <li><strong>Obtention :</strong> en jeu avec AceCoins</li>
        </ul>
        <div class="vehicle-card__footer">
          <a class="btn btn--ghost" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Ticket Discord</a>
          <a class="btn btn--primary" href="#coins">Acheter des AC</a>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(packId) {
  const pack = COIN_PACKS.find((item) => item.id === packId);
  if (!pack) return;

  const existing = state.cart.find((item) => item.id === packId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ id: pack.id, quantity: 1 });
  }

  persistCart();
  updateCartUi();
  openCart();
  showToast(`${pack.title} ajouté au panier.`);
}

function changeQuantity(packId, delta) {
  const item = state.cart.find((entry) => entry.id === packId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== packId);
  }
  persistCart();
  updateCartUi();
}

function removeItem(packId) {
  state.cart = state.cart.filter((entry) => entry.id !== packId);
  persistCart();
  updateCartUi();
}

function clearCart() {
  state.cart = [];
  persistCart();
  updateCartUi();
  showToast("Panier vidé.");
}

function updateCartUi() {
  const count = getCartCount();
  const subtotal = getCartTotal();
  document.getElementById("cartCount").textContent = String(count);
  document.getElementById("cartSubtotal").textContent = formatEuro(subtotal);
  document.getElementById("cartTotal").textContent = formatEuro(subtotal);

  const empty = document.getElementById("cartEmpty");
  const items = document.getElementById("cartItems");

  if (!state.cart.length) {
    empty.classList.remove("hidden");
    items.innerHTML = "";
  } else {
    empty.classList.add("hidden");
    items.innerHTML = state.cart.map((entry) => {
      const pack = COIN_PACKS.find((item) => item.id === entry.id);
      if (!pack) return "";
      const lineTotal = pack.price * entry.quantity;
      return `
        <article class="cart-item">
          <div>
            <h3 class="cart-item__name">${escapeHtml(pack.title)}</h3>
            <div class="cart-item__meta">${pack.priceLabel} × ${entry.quantity} = ${formatEuro(lineTotal)}</div>
            <div class="cart-item__controls">
              <button class="qty-btn" type="button" data-qty="${pack.id}" data-delta="-1">−</button>
              <strong>${entry.quantity}</strong>
              <button class="qty-btn" type="button" data-qty="${pack.id}" data-delta="1">+</button>
              <button class="btn btn--danger" type="button" data-remove="${pack.id}">Retirer</button>
            </div>
          </div>
          <strong>${formatEuro(lineTotal)}</strong>
        </article>
      `;
    }).join("");

    items.querySelectorAll("[data-qty]").forEach((btn) => {
      btn.addEventListener("click", () => changeQuantity(btn.dataset.qty, Number(btn.dataset.delta)));
    });

    items.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => removeItem(btn.dataset.remove));
    });
  }
}

function initPayPalButtons() {
  if (state.paypalRendered || typeof paypal === "undefined") {
    if (typeof paypal === "undefined") {
      window.addEventListener("load", delayedPayPalInit, { once: true });
    }
    return;
  }

  state.paypalRendered = true;
  paypal.Buttons({
    style: { layout: "vertical", shape: "pill", label: "paypal" },
    onClick() {
      if (!state.cart.length) {
        showToast("Ajoute au moins un pack AceCoins au panier.");
        throw new Error("Panier vide");
      }
    },
    createOrder(data, actions) {
      const total = getCartTotal();
      return actions.order.create({
        purchase_units: [{
          description: buildOrderDescription(),
          amount: { currency_code: "EUR", value: total.toFixed(2) }
        }]
      });
    },
    onApprove(data, actions) {
      return actions.order.capture().then(() => {
        const total = formatEuro(getCartTotal());
        state.cart = [];
        persistCart();
        updateCartUi();
        closeCart();
        showToast(`Paiement validé : ${total}. Ouvre maintenant un ticket Discord.`);
      });
    },
    onError(err) {
      console.error(err);
      showToast("Erreur PayPal. Réessaie dans quelques instants.");
    }
  }).render("#paypal-button-container");
}

function delayedPayPalInit() {
  if (typeof paypal !== "undefined" && !state.paypalRendered) {
    initPayPalButtons();
  }
}

function buildOrderDescription() {
  return state.cart.map((entry) => {
    const pack = COIN_PACKS.find((item) => item.id === entry.id);
    return pack ? `${pack.title} x${entry.quantity}` : null;
  }).filter(Boolean).join(" • ");
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("is-open");
  document.body.classList.add("cart-open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("is-open");
  document.body.classList.remove("cart-open");
}

function getCartCount() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return state.cart.reduce((sum, entry) => {
    const pack = COIN_PACKS.find((item) => item.id === entry.id);
    return sum + ((pack?.price ?? 0) * entry.quantity);
  }, 0);
}

function persistCart() {
  localStorage.setItem("acepvp_cart", JSON.stringify(state.cart));
}

function loadCart() {
  try {
    const raw = localStorage.getItem("acepvp_cart");
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item?.id === "string" && Number.isFinite(item?.quantity)) : [];
  } catch {
    return [];
  }
}

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

function formatCoins(value) {
  return new Intl.NumberFormat("fr-FR").format(value);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
