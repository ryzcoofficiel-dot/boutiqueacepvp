
const DISCORD_INVITE = "https://discord.gg/acepvp";

const COIN_PACKS = [
  {
    hostedButtonId: "TZDHY3VPULC2U",
    amount: 500,
    priceLabel: "5,00 €",
    title: "500 AceCoins",
    description: "Pack d'entrée pour démarrer vos achats premium.",
    perks: ["Accès rapide à la boutique", "Paiement PayPal sécurisé", "Traitement via ticket Discord"]
  },
  {
    hostedButtonId: "LWRB63XQHWR4Q",
    amount: 1000,
    priceLabel: "10,00 €",
    title: "1000 AceCoins",
    description: "Le pack standard, parfait pour les achats réguliers.",
    perks: ["Pack le plus utilisé", "Livraison staff rapide", "Compatible mobile / desktop"]
  },
  {
    hostedButtonId: "DKQZDYUBH3KV2",
    amount: 2000,
    priceLabel: "20,00 €",
    title: "2000 AceCoins",
    description: "Pack avantageux pour débloquer plus de contenu premium.",
    perks: ["Bon rapport quantité / prix", "Idéal pour véhicules", "Support via Discord"]
  },
  {
    hostedButtonId: "MBU2H7X5W69MW",
    amount: 5000,
    priceLabel: "50,00 €",
    title: "5000 AceCoins",
    description: "Gros pack pour les joueurs réguliers ACEPVP.",
    perks: ["Pack premium", "Parfait pour plusieurs achats", "Paiement instantané PayPal"]
  },
  {
    hostedButtonId: "9ZL4PWSUNUKG8",
    amount: 10000,
    priceLabel: "100,00 €",
    title: "10000 AceCoins",
    description: "Pack ultime pour les gros achats et contenus exclusifs.",
    perks: ["Quantité maximale", "Top pour collection premium", "Traitement prioritaire staff"]
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
    features: ["Très bon contrôle en poursuite urbaine", "Blindage fiable en PVP", "Look premium ACEPVP"]
  },
  {
    resource: "mk2s95",
    name: "Karin S95 Blindée",
    image: "images/vehicles/karin_s95.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "mk2s95",
    description: "Version blindée de la S95 : équilibre parfait entre style et efficacité.",
    stats: { armor: "Niveau III", speed: "Élevée", accel: "Élevée", handling: "Très stable" },
    features: ["Excellente polyvalence PVP", "Silhouette discrète et premium", "Très bon grip en ville"]
  },
  {
    resource: "mk2baggeds95",
    name: "Karin S95 Bagged Blindée",
    image: "images/vehicles/karin_s95_bagged.png",
    priceCoins: 4499,
    rarity: "Légendaire",
    rarityKey: "legendary",
    spawn: "mk2baggeds95",
    description: "Version bagged blindée pour un rendu showcar et une présence unique.",
    stats: { armor: "Niveau III+", speed: "Élevée", accel: "Élevée", handling: "Stable" },
    features: ["Style bagged premium", "Blindage renforcé", "Parfaite pour collection prestige"]
  },
  {
    resource: "smash_schafter3",
    name: "Benefactor Schafter RS Blindée",
    image: "images/vehicles/benefactor_schafter.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "smash_schafter3",
    description: "Berline blindée équilibrée, très confortable pour les combats prolongés.",
    stats: { armor: "Niveau III", speed: "Moyenne +", accel: "Bonne", handling: "Très stable" },
    features: ["Excellent véhicule de team", "Comportement rassurant", "Très bon compromis poids / mobilité"]
  },
  {
    resource: "scharmann",
    name: "Benefactor Scharmann Blindée",
    image: "images/vehicles/benefactor_scharmann.png",
    priceCoins: 6999,
    rarity: "Mythique",
    rarityKey: "legendary",
    spawn: "scharmann",
    description: "Modèle prestige lourdement blindé, imposant et exclusif.",
    stats: { armor: "Niveau IV", speed: "Moyenne", accel: "Solide", handling: "Lourde" },
    features: ["Blindage maximal", "Présence dominante", "Véhicule prestige ACEPVP"]
  },
  {
    resource: "sentinel_rts",
    name: "Ubermacht Sentinel RTS Blindée",
    image: "images/vehicles/ubermacht_sentinel_rts.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "sentinel_rts",
    description: "Coupé blindé nerveux, idéal pour les joueurs agressifs et mobiles.",
    stats: { armor: "Niveau III", speed: "Élevée", accel: "Très élevée", handling: "Sportive" },
    features: ["Très dynamique", "Excellente relance", "Parfaite en petits déplacements PVP"]
  },
  {
    resource: "growlerc",
    name: "Growler Custom Blindée",
    image: "images/vehicles/growler_custom.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "growlerc",
    description: "Custom blindé très rapide, finition premium et comportement agressif.",
    stats: { armor: "Niveau III", speed: "Très élevée", accel: "Très élevée", handling: "Précise" },
    features: ["Top pour chase", "Custom premium", "Excellente réponse à l'accélération"]
  },
  {
    resource: "elegysa",
    name: "Annis Elegy SA Blindée",
    image: "images/vehicles/annis_elegy.png",
    priceCoins: 3999,
    rarity: "Épique",
    rarityKey: "epic",
    spawn: "elegysa",
    description: "Icône ACEPVP version blindée, très bon grip et contrôle précis.",
    stats: { armor: "Niveau III", speed: "Élevée", accel: "Bonne", handling: "Très précise" },
    features: ["Très bon grip", "Icône du serveur", "Adaptée aux fights urbains"]
  },
  {
    resource: "weevb",
    name: "Baja Weevil Blindée",
    image: "images/vehicles/baja_weevil.png",
    priceCoins: 2999,
    rarity: "Rare",
    rarityKey: "budget",
    spawn: "weevb",
    description: "Option blindée fun et mobile, parfaite pour un style décalé.",
    stats: { armor: "Niveau II+", speed: "Moyenne", accel: "Bonne", handling: "Fun" },
    features: ["Prix accessible", "Style unique", "Très bonne mobilité en ville"]
  }
];

let currentVehicleFilter = "all";
let currentVehicleSearch = "";
let toastTimer = null;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderCoinCards();
  renderVehicleCards();
  initTabs();
  initQuickTabButtons();
  initVehicleFilters();
  initVehicleSearch();
  initModal();
  initPayPalHostedButtons();
  initReveal();
  initTiltCards();
  updateVehicleCount();
});

function renderCoinCards() {
  const grid = document.getElementById("coinsGrid");

  grid.innerHTML = COIN_PACKS.map((pack) => `
    <article class="coin-card reveal">
      <div class="coin-card__top">
        <div class="coin-badge"><i></i> AceCoins</div>
        <div class="coin-price"><strong>${escapeHtml(pack.priceLabel)}</strong><span>${formatNumber(pack.amount)} AC</span></div>
      </div>

      <h3 class="coin-title">${escapeHtml(pack.title)}</h3>
      <p class="coin-desc">${escapeHtml(pack.description)}</p>

      <ul class="coin-perks">
        ${pack.perks.map((perk) => `<li>${escapeHtml(perk)}</li>`).join("")}
      </ul>

      <div class="paypal-slot" id="paypal-hosted-${escapeHtml(pack.hostedButtonId)}"></div>
      <div class="coin-foot">Après paiement : ouvre un ticket Discord avec ton pseudo FiveM + preuve PayPal.</div>
    </article>
  `).join("");
}

function renderVehicleCards() {
  const grid = document.getElementById("vehiclesGrid");

  grid.innerHTML = VEHICLES.map((v) => `
    <article class="vehicle-card reveal" data-rarity="${escapeHtml(v.rarityKey)}" data-price="${v.priceCoins}" data-name="${escapeHtml(v.name.toLowerCase())}">
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
          <a class="btn btn--ghost" href="${DISCORD_INVITE}" target="_blank" rel="noopener noreferrer">Ticket Discord</a>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll('[data-open-vehicle]').forEach((btn) => {
    btn.addEventListener('click', () => openVehicleModal(btn.dataset.openVehicle));
  });
}

function initPayPalHostedButtons() {
  const mounted = window.paypal && typeof window.paypal.HostedButtons === 'function';

  COIN_PACKS.forEach((pack) => {
    const mountId = `paypal-hosted-${pack.hostedButtonId}`;
    const mount = document.getElementById(mountId);
    if (!mount) return;

    if (!mounted) {
      mount.innerHTML = `<div class="paypal-fallback">PayPal indisponible. Recharge la page ou passe par <a href="${DISCORD_INVITE}" target="_blank" rel="noopener noreferrer">Discord</a>.</div>`;
      return;
    }

    try {
      window.paypal.HostedButtons({ hostedButtonId: pack.hostedButtonId }).render(`#${cssEsc(mountId)}`);
    } catch (error) {
      console.error('HostedButtons error', pack.hostedButtonId, error);
      mount.innerHTML = `<div class="paypal-fallback">Impossible de charger ce bouton PayPal. Contacte le staff via <a href="${DISCORD_INVITE}" target="_blank" rel="noopener noreferrer">Discord</a>.</div>`;
    }
  });

  showToast('Boutique ACEPVP chargée ✅');
}

function initTabs() {
  const buttons = Array.from(document.querySelectorAll('.segment__btn'));
  const panels = Array.from(document.querySelectorAll('.panel'));
  const thumb = document.getElementById('segmentThumb');
  const segmentBar = document.getElementById('segmentBar');

  function activate(tabKey, scrollInto = false) {
    buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.tab === tabKey));
    panels.forEach((p) => p.classList.toggle('is-active', p.dataset.panel === tabKey));

    const active = buttons.find((b) => b.dataset.tab === tabKey);
    if (active && thumb) {
      const parent = active.parentElement.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      thumb.style.width = `${rect.width}px`;
      thumb.style.transform = `translateX(${rect.left - parent.left}px)`;
    }

    if (scrollInto && segmentBar) {
      const y = segmentBar.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  buttons.forEach((btn) => btn.addEventListener('click', () => activate(btn.dataset.tab, true)));
  requestAnimationFrame(() => activate('coins'));

  window.addEventListener('resize', () => {
    const active = document.querySelector('.segment__btn.is-active');
    if (!active || !thumb) return;
    const parent = active.parentElement.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    thumb.style.width = `${rect.width}px`;
    thumb.style.transform = `translateX(${rect.left - parent.left}px)`;
  });
}

function initQuickTabButtons() {
  document.querySelectorAll('[data-switch-tab]').forEach((el) => {
    el.addEventListener('click', () => {
      const key = el.dataset.switchTab;
      const btn = document.querySelector(`.segment__btn[data-tab="${key}"]`);
      if (btn) btn.click();
    });
  });
}

function initVehicleFilters() {
  const buttons = Array.from(document.querySelectorAll('.filter'));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentVehicleFilter = btn.dataset.filter;
      applyVehicleFilters();
    });
  });
}

function initVehicleSearch() {
  const input = document.getElementById('vehicleSearch');
  if (!input) return;

  input.addEventListener('input', () => {
    currentVehicleSearch = input.value.trim().toLowerCase();
    applyVehicleFilters();
  });
}

function applyVehicleFilters() {
  const cards = Array.from(document.querySelectorAll('.vehicle-card'));

  cards.forEach((card) => {
    const rarity = card.dataset.rarity;
    const price = Number(card.dataset.price || 0);
    const name = card.dataset.name || '';

    const passSearch = !currentVehicleSearch || name.includes(currentVehicleSearch);
    let passFilter = true;

    if (currentVehicleFilter === 'epic') {
      passFilter = rarity === 'epic';
    } else if (currentVehicleFilter === 'legendary') {
      passFilter = rarity === 'legendary';
    } else if (currentVehicleFilter === 'budget') {
      passFilter = price <= 3999;
    }

    card.classList.toggle('is-hidden', !(passSearch && passFilter));
  });

  updateVehicleCount();
}

function updateVehicleCount() {
  const visible = Array.from(document.querySelectorAll('.vehicle-card')).filter((card) => !card.classList.contains('is-hidden'));
  const countEl = document.getElementById('vehicleCount');
  if (countEl) countEl.textContent = `${visible.length} véhicule(s)`;
}

function initModal() {
  const modal = document.getElementById('vehicleModal');
  if (!modal) return;

  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeVehicleModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeVehicleModal();
  });
}

function openVehicleModal(resource) {
  const vehicle = VEHICLES.find((v) => v.resource === resource);
  const modal = document.getElementById('vehicleModal');
  if (!vehicle || !modal) return;

  const titleEl = document.getElementById('modalVehicleTitle');
  const resourceEl = document.getElementById('modalVehicleResource');
  const descEl = document.getElementById('modalVehicleDesc');
  const imageEl = document.getElementById('modalVehicleImage');
  const rarityEl = document.getElementById('modalVehicleRarity');
  const priceEl = document.getElementById('modalVehiclePrice');
  const spawnEl = document.getElementById('modalVehicleSpawn');
  const armorEl = document.getElementById('modalStatArmor');
  const speedEl = document.getElementById('modalStatSpeed');
  const accelEl = document.getElementById('modalStatAccel');
  const handlingEl = document.getElementById('modalStatHandling');
  const featureList = document.getElementById('modalFeatureList');
  const discordBtn = document.getElementById('modalDiscordBtn');

  titleEl.textContent = vehicle.name;
  resourceEl.textContent = `Ressource : ${vehicle.resource}`;
  descEl.textContent = vehicle.description;
  imageEl.src = vehicle.image;
  imageEl.alt = vehicle.name;
  imageEl.onerror = () => { imageEl.src = 'images/ui/ace_logo.png'; };

  rarityEl.textContent = vehicle.rarity;
  rarityEl.className = `rarity-badge ${rarityModalClass(vehicle.rarity)}`;
  priceEl.textContent = `${formatNumber(vehicle.priceCoins)} AceCoins`;
  spawnEl.textContent = vehicle.spawn;

  armorEl.textContent = vehicle.stats.armor;
  speedEl.textContent = vehicle.stats.speed;
  accelEl.textContent = vehicle.stats.accel;
  handlingEl.textContent = vehicle.stats.handling;

  featureList.innerHTML = vehicle.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('');
  discordBtn.href = DISCORD_INVITE;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeVehicleModal() {
  const modal = document.getElementById('vehicleModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  items.forEach((el) => io.observe(el));
}

function initTiltCards() {
  const cards = document.querySelectorAll('.vehicle-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = ((px - 0.5) * 6).toFixed(2);
      const rx = ((0.5 - py) * 6).toFixed(2);
      card.style.setProperty('--rx', `${rx}deg`);
      card.style.setProperty('--ry', `${ry}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function formatNumber(value) {
  return new Intl.NumberFormat('fr-FR').format(value);
}

function rarityChipClass(rarity) {
  if (rarity === 'Mythique') return 'chip--mythic';
  if (rarity === 'Légendaire') return 'chip--legendary';
  if (rarity === 'Rare') return 'chip--epic';
  return 'chip--epic';
}

function rarityModalClass(rarity) {
  if (rarity === 'Mythique') return 'chip--mythic';
  if (rarity === 'Légendaire') return 'chip--legendary';
  if (rarity === 'Rare') return 'chip--epic';
  return 'chip--epic';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cssEsc(value) {
  if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(value);
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '\$&');
}
