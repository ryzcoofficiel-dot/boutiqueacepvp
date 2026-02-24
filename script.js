
const DISCORD_INVITE = "https://discord.gg/acepvp";

const COIN_PACKS = [
  {
    hostedButtonId: "TZDHY3VPULC2U",
    amount: 500,
    priceLabel: "5,00 €",
    title: "500 AceCoins",
    description: "Pack d'entrée pour démarrer vos achats premium.",
    perks: ["Paiement PayPal sécurisé", "Traitement via ticket Discord", "Compatible mobile / desktop"]
  },
  {
    hostedButtonId: "LWRB63XQHWR4Q",
    amount: 1000,
    priceLabel: "10,00 €",
    title: "1000 AceCoins",
    description: "Pack standard pour les achats réguliers.",
    perks: ["Le plus demandé", "Achat rapide", "Livraison staff via ticket"]
  },
  {
    hostedButtonId: "DKQZDYUBH3KV2",
    amount: 2000,
    priceLabel: "20,00 €",
    title: "2000 AceCoins",
    description: "Pack avantageux pour débloquer plus de contenu.",
    perks: ["Bon ratio quantité / prix", "Idéal pour véhicules", "Support Discord"]
  },
  {
    hostedButtonId: "MBU2H7X5W69MW",
    amount: 5000,
    priceLabel: "50,00 €",
    title: "5000 AceCoins",
    description: "Gros pack premium pour les joueurs réguliers.",
    perks: ["Pack premium", "Parfait pour plusieurs achats", "Traitement prioritaire"]
  },
  {
    hostedButtonId: "9ZL4PWSUNUKG8",
    amount: 10000,
    priceLabel: "100,00 €",
    title: "10000 AceCoins",
    description: "Pack ultime pour les achats massifs ACEPVP.",
    perks: ["Quantité maximale", "Top collection premium", "Réassort complet"]
  }
];

const VEHICLES = [
  {
    resource: "21x90",
    name: "2021 X90 Blindée",
    image: "images/vehicles/x90_2021.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "21x90",
    description: "Coupé blindé premium avec excellente stabilité et look agressif.",
    stats: { armor: "Niveau III", speed: "Très élevée", accel: "Élevée", handling: "Précise" },
    features: ["Très bon contrôle en poursuite urbaine", "Blindage fiable en PVP", "Look premium ACEPVP"],
    featured: 2
  },
  {
    resource: "mk2s95",
    name: "Karin S95 Blindée",
    image: "images/vehicles/karin_s95.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "mk2s95",
    description: "Version blindée équilibrée, idéale pour mobilité + protection.",
    stats: { armor: "Niveau III", speed: "Élevée", accel: "Élevée", handling: "Très stable" },
    features: ["Polyvalente PVP", "Très bon grip", "Silhouette discrète"],
    featured: 3
  },
  {
    resource: "mk2baggeds95",
    name: "Karin S95 Bagged Blindée",
    image: "images/vehicles/karin_s95_bagged.png",
    priceCoins: 4499,
    rarity: "Légendaire",
    rarityKey: "legendary",
    spawn: "mk2baggeds95",
    description: "Version bagged blindée premium pour un style showcar exclusif.",
    stats: { armor: "Niveau III+", speed: "Élevée", accel: "Élevée", handling: "Stable" },
    features: ["Style bagged premium", "Blindage renforcé", "Collection prestige"],
    featured: 5
  },
  {
    resource: "smash_schafter3",
    name: "Benefactor Schafter RS Blindée",
    image: "images/vehicles/benefactor_schafter.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "smash_schafter3",
    description: "Berline blindée très stable pour combats prolongés et teamplay.",
    stats: { armor: "Niveau III", speed: "Moyenne +", accel: "Bonne", handling: "Très stable" },
    features: ["Excellent véhicule de team", "Comportement rassurant", "Bon compromis"],
    featured: 4
  },
  {
    resource: "scharmann",
    name: "Benefactor Scharmann Blindée",
    image: "images/vehicles/benefactor_scharmann.png",
    priceCoins: 6999,
    rarity: "Mythique",
    rarityKey: "legendary",
    spawn: "scharmann",
    description: "Modèle prestige lourdement blindé, exclusif et imposant.",
    stats: { armor: "Niveau IV", speed: "Moyenne", accel: "Solide", handling: "Lourde" },
    features: ["Blindage maximal", "Présence dominante", "Véhicule prestige ACEPVP"],
    featured: 1
  },
  {
    resource: "sentinel_rts",
    name: "Ubermacht Sentinel RTS Blindée",
    image: "images/vehicles/ubermacht_sentinel_rts.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "sentinel_rts",
    description: "Coupé blindé nerveux pour joueurs agressifs et mobiles.",
    stats: { armor: "Niveau III", speed: "Élevée", accel: "Très élevée", handling: "Sportive" },
    features: ["Très dynamique", "Excellente relance", "Parfaite pour petits trajets PVP"],
    featured: 6
  },
  {
    resource: "growlerc",
    name: "Growler Custom Blindée",
    image: "images/vehicles/growler_custom.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "growlerc",
    description: "Custom blindé très rapide avec finition premium.",
    stats: { armor: "Niveau III", speed: "Très élevée", accel: "Très élevée", handling: "Précise" },
    features: ["Top pour chase", "Custom premium", "Excellente réponse"],
    featured: 7
  },
  {
    resource: "elegysa",
    name: "Annis Elegy SA Blindée",
    image: "images/vehicles/annis_elegy.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "elegysa",
    description: "Icône ACEPVP blindée, grip exemplaire et contrôle précis.",
    stats: { armor: "Niveau III", speed: "Élevée", accel: "Bonne", handling: "Très précise" },
    features: ["Très bon grip", "Icône du serveur", "Fights urbains"],
    featured: 8
  },
  {
    resource: "weevb",
    name: "Baja Weevil Blindée",
    image: "images/vehicles/baja_weevil.png",
    priceCoins: 2999,
    rarity: "Rare",
    rarityKey: "budget",
    spawn: "weevb",
    description: "Blindée fun et mobile, parfaite pour un style décalé.",
    stats: { armor: "Niveau II+", speed: "Moyenne", accel: "Bonne", handling: "Fun" },
    features: ["Prix accessible", "Style unique", "Très bonne mobilité"],
    featured: 9
  }
];

let currentVehicleFilter = "all";
let currentVehicleSearch = "";
let currentVehicleSort = "featured";
let toastTimer = null;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderCoinCards();
  renderVehicleCards();
  initTabs();
  initQuickTabButtons();
  initVehicleFilters();
  initVehicleSearchAndSort();
  initModal();
  initPayPalHostedButtons();
  initReveal();
  initTiltCards();
  initHeroParallax();
  initCursorGlow();
  initCountUp();
  initScrollProgress();
  updateVehicleCount();
});

function renderCoinCards() {
  const grid = document.getElementById("coinsGrid");
  grid.innerHTML = COIN_PACKS.map((pack, i) => `
    <article class="coin-card reveal" style="--reveal-delay:${i * 55}">
      <div class="coin-card__top">
        <div class="coin-badge"><i></i>AceCoins</div>
        <div class="coin-price"><strong>${escapeHtml(pack.priceLabel)}</strong><span>${formatNumber(pack.amount)} AC</span></div>
      </div>
      <h3 class="coin-title">${escapeHtml(pack.title)}</h3>
      <p class="coin-desc">${escapeHtml(pack.description)}</p>
      <ul class="coin-perks">${pack.perks.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
      <div class="paypal-slot" id="paypal-hosted-${escapeHtml(pack.hostedButtonId)}"></div>
      <div class="coin-foot">Après paiement : ticket Discord + pseudo FiveM + preuve PayPal.</div>
    </article>
  `).join("");
}

function renderVehicleCards() {
  const grid = document.getElementById("vehiclesGrid");
  const list = getSortedVehicles(VEHICLES);

  grid.innerHTML = list.map((v, i) => `
    <article class="vehicle-card reveal" style="--reveal-delay:${(i % 6) * 45}" data-rarity="${escapeHtml(v.rarityKey)}" data-price="${v.priceCoins}" data-name="${escapeHtml(v.name.toLowerCase())}" data-featured="${v.featured}">
      <div class="vehicle-card__imgWrap">
        <div class="vehicle-card__glow"></div>
        <img src="${escapeHtml(v.image)}" alt="${escapeHtml(v.name)}" loading="lazy" onerror="this.src='images/ui/ace_logo.png'">
        <div class="vehicle-badges">
          <span class="chip chip--armored">Blindé</span>
          <span class="chip ${rarityChipClass(v.rarity)}">${escapeHtml(v.rarity)}</span>
        </div>
        <div class="vehicle-priceTag">${formatNumber(v.priceCoins)} AC</div>
      </div>
      <div class="vehicle-body">
        <h3 class="vehicle-title">${escapeHtml(v.name)}</h3>
        <p class="vehicle-desc">${escapeHtml(v.description)}</p>
        <div class="vehicle-meta">
          <div><span>Blindage</span><strong>${escapeHtml(v.stats.armor)}</strong></div>
          <div><span>Vitesse</span><strong>${escapeHtml(v.stats.speed)}</strong></div>
          <div><span>Spawn</span><strong>${escapeHtml(v.spawn)}</strong></div>
        </div>
        <div class="vehicle-actions">
          <button class="btn btn--outline" type="button" data-open-vehicle="${escapeHtml(v.resource)}">Voir détails</button>
          <a class="btn btn--glass" href="${DISCORD_INVITE}" target="_blank" rel="noopener noreferrer">Ticket Discord</a>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-open-vehicle]").forEach((btn) => {
    btn.addEventListener("click", () => openVehicleModal(btn.dataset.openVehicle));
  });

  initReveal();
  initTiltCards();
  applyVehicleFilters();
}

function getSortedVehicles(list) {
  const copy = [...list];
  if (currentVehicleSort === "price-asc") copy.sort((a, b) => a.priceCoins - b.priceCoins);
  else if (currentVehicleSort === "price-desc") copy.sort((a, b) => b.priceCoins - a.priceCoins);
  else if (currentVehicleSort === "name-asc") copy.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  else copy.sort((a, b) => (a.featured || 99) - (b.featured || 99));
  return copy;
}

function initPayPalHostedButtons() {
  const ready = window.paypal && typeof window.paypal.HostedButtons === "function";
  COIN_PACKS.forEach((pack) => {
    const mountId = `paypal-hosted-${pack.hostedButtonId}`;
    const mount = document.getElementById(mountId);
    if (!mount) return;

    if (!ready) {
      mount.innerHTML = `<div class="paypal-fallback">PayPal indisponible. Recharge la page ou passe par <a href="${DISCORD_INVITE}" target="_blank" rel="noopener noreferrer">Discord</a>.</div>`;
      return;
    }

    try {
      window.paypal.HostedButtons({ hostedButtonId: pack.hostedButtonId }).render(`#${cssEsc(mountId)}`);
    } catch (err) {
      console.error("HostedButtons error", err);
      mount.innerHTML = `<div class="paypal-fallback">Impossible de charger ce bouton. Contacte le staff via <a href="${DISCORD_INVITE}" target="_blank" rel="noopener noreferrer">Discord</a>.</div>`;
    }
  });

  showToast("Boutique ACEPVP chargée ✅");
}

function initTabs() {
  const buttons = Array.from(document.querySelectorAll(".segment__btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  const thumb = document.getElementById("segmentThumb");
  const segment = document.getElementById("segmentBar");

  const updateThumb = () => {
    if (window.innerWidth <= 720 || !thumb) return;
    const active = buttons.find((b) => b.classList.contains("is-active"));
    if (!active) return;
    const pRect = segment.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    thumb.style.width = `${aRect.width}px`;
    thumb.style.transform = `translateX(${aRect.left - pRect.left - 6}px)`;
  };

  const activate = (key, scrollInto = false) => {
    buttons.forEach((b) => b.classList.toggle("is-active", b.dataset.tab === key));
    panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === key));
    document.body.dataset.activeTab = key;
    updateThumb();

    if (scrollInto && segment) {
      const y = segment.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  buttons.forEach((btn) => btn.addEventListener("click", () => activate(btn.dataset.tab, true)));
  requestAnimationFrame(() => activate("coins"));
  window.addEventListener("resize", updateThumb);
}

function initQuickTabButtons() {
  document.querySelectorAll("[data-switch-tab]").forEach((el) => {
    el.addEventListener("click", () => {
      const key = el.dataset.switchTab;
      const btn = document.querySelector(`.segment__btn[data-tab="${key}"]`);
      if (btn) btn.click();
    });
  });
}

function initVehicleFilters() {
  const buttons = Array.from(document.querySelectorAll(".filter"));
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentVehicleFilter = btn.dataset.filter;
      applyVehicleFilters();
    });
  });
}

function initVehicleSearchAndSort() {
  const search = document.getElementById("vehicleSearch");
  const sort = document.getElementById("vehicleSort");

  if (search) {
    search.addEventListener("input", () => {
      currentVehicleSearch = search.value.trim().toLowerCase();
      applyVehicleFilters();
    });
  }

  if (sort) {
    sort.addEventListener("change", () => {
      currentVehicleSort = sort.value;
      renderVehicleCards();
    });
  }
}

function applyVehicleFilters() {
  const cards = Array.from(document.querySelectorAll(".vehicle-card"));

  cards.forEach((card) => {
    const rarity = card.dataset.rarity;
    const price = Number(card.dataset.price || 0);
    const name = card.dataset.name || "";

    const passSearch = !currentVehicleSearch || name.includes(currentVehicleSearch);
    let passFilter = true;

    if (currentVehicleFilter === "epic") passFilter = rarity === "epic";
    else if (currentVehicleFilter === "legendary") passFilter = rarity === "legendary";
    else if (currentVehicleFilter === "budget") passFilter = price <= 3999;

    card.classList.toggle("is-hidden", !(passSearch && passFilter));
  });

  updateVehicleCount();
}

function updateVehicleCount() {
  const visible = Array.from(document.querySelectorAll(".vehicle-card")).filter((card) => !card.classList.contains("is-hidden"));
  const count = document.getElementById("vehicleCount");
  if (count) count.textContent = `${visible.length} véhicule(s)`;
}

function initModal() {
  const modal = document.getElementById("vehicleModal");
  if (!modal) return;
  document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeVehicleModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeVehicleModal();
  });
}

function openVehicleModal(resource) {
  const vehicle = VEHICLES.find((v) => v.resource === resource);
  const modal = document.getElementById("vehicleModal");
  if (!vehicle || !modal) return;

  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  const img = document.getElementById("modalVehicleImage");
  const rarity = document.getElementById("modalVehicleRarity");
  const features = document.getElementById("modalFeatureList");
  const discordBtn = document.getElementById("modalDiscordBtn");

  setText("modalVehicleResource", `Ressource : ${vehicle.resource}`);
  setText("modalVehicleTitle", vehicle.name);
  setText("modalVehicleDesc", vehicle.description);
  setText("modalVehiclePrice", `${formatNumber(vehicle.priceCoins)} AceCoins`);
  setText("modalVehicleSpawn", vehicle.spawn);
  setText("modalStatArmor", vehicle.stats.armor);
  setText("modalStatSpeed", vehicle.stats.speed);
  setText("modalStatAccel", vehicle.stats.accel);
  setText("modalStatHandling", vehicle.stats.handling);

  if (img) {
    img.src = vehicle.image;
    img.alt = vehicle.name;
    img.onerror = () => { img.src = "images/ui/ace_logo.png"; };
  }

  if (rarity) {
    rarity.textContent = vehicle.rarity;
    rarity.className = `rarity-badge ${rarityChipClass(vehicle.rarity)}`;
  }

  if (features) features.innerHTML = vehicle.features.map((f) => `<li>${escapeHtml(f)}</li>`).join("");
  if (discordBtn) discordBtn.href = DISCORD_INVITE;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeVehicleModal() {
  const modal = document.getElementById("vehicleModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function initReveal() {
  const els = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -20px 0px" });
  els.forEach((el) => io.observe(el));
}

function initTiltCards() {
  const cards = document.querySelectorAll(".coin-card, .vehicle-card");
  cards.forEach((card) => {
    if (card.dataset.tiltInit === "1") return;
    card.dataset.tiltInit = "1";

    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--ry", `${((px - .5) * 7).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${((.5 - py) * 6).toFixed(2)}deg`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    });
  });
}

function initHeroParallax() {
  const heroCard = document.getElementById("heroCard");
  if (!heroCard) return;

  heroCard.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 900) return;
    const rect = heroCard.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = ((0.5 - py) * 4).toFixed(2);
    const ry = ((px - 0.5) * 5).toFixed(2);
    heroCard.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  });
}

function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

function initCountUp() {
  const els = document.querySelectorAll("[data-countup]");
  els.forEach((el) => {
    const target = Number(el.dataset.countup || 0);
    const start = performance.now();
    const duration = 900;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function initScrollProgress() {
  const bar = document.getElementById("topProgress");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function formatNumber(value) {
  return new Intl.NumberFormat("fr-FR").format(value);
}

function rarityChipClass(rarity) {
  if (rarity === "Mythique") return "chip--mythic";
  if (rarity === "Légendaire") return "chip--legendary";
  return "chip--epic";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cssEsc(value) {
  if (window.CSS && typeof window.CSS.escape === "function") return window.CSS.escape(value);
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "\$&");
}
