const SHOP = window.SHOP_CONFIG || {};

const PACKS = [
  { id: 'ac500', name: '500 AceCoins', price: 5, image: 'images/packs/pack_500.png', description: 'Petit pack pour commencer rapidement.', chips: ['Paiement PayPal', 'Livraison via ticket', 'Instantané'] },
  { id: 'ac1000', name: '1000 AceCoins', price: 10, image: 'images/packs/pack_1000.png', description: 'Le pack classique pour les achats rapides.', chips: ['Paiement PayPal', 'Panier groupé', 'Support Discord'] },
  { id: 'ac2000', name: '2000 AceCoins', price: 20, image: 'images/packs/pack_2000.png', description: 'Pack recommandé pour acheter le VIP ACEPVP.', chips: ['VIP = 2000 AC', 'Paiement sécurisé', 'Ajout panier'] },
  { id: 'ac5000', name: '5000 AceCoins', price: 50, image: 'images/packs/pack_5000.png', description: 'Pack premium pour plusieurs achats en jeu.', chips: ['Gros volume', 'Paiement sécurisé', 'Ticket boutique'] },
  { id: 'ac10000', name: '10000 AceCoins', price: 100, image: 'images/packs/pack_10000.png', description: 'Le plus gros pack pour optimiser ton solde.', chips: ['Mega pack', 'Paiement PayPal', 'Panier multi-articles'] }
];

const SERVICES = [
  { id: 'unban', name: 'Unban ACEPVP', price: 50, image: 'images/products/unban.png', description: "Le unban sur AcePvP exclut automatiquement la personne visée des giveaway, événements etc etc. Le fait de se faire unban n'exclut pas non le fait de se refaire ban si récidive. Aucun remboursement n'aura lieu conformément à notre politique de remboursement.", chips: ['Ajout au panier', 'Paiement PayPal', 'Ticket Discord boutique'] }
];

const VEHICLES = [
  { id: 'x90_2021', name: 'X90 2021', priceCoins: 5999, image: 'images/vehicles/x90_2021.png', badge: 'Prestige', tags: ['Transmission intégrale', 'Très rare'] },
  { id: 'growler_custom', name: 'Growler Custom', priceCoins: 4999, image: 'images/vehicles/growler_custom.png', badge: 'Prestige', tags: ['Pursuit', 'Custom'] },
  { id: 'ubermacht_sentinel_rts', name: 'Ubermacht Sentinel RTS', priceCoins: 4599, image: 'images/vehicles/ubermacht_sentinel_rts.png', badge: 'Prestige', tags: ['Street', 'Sport'] },
  { id: 'benefactor_scharmann', name: 'Benefactor Scharmann', priceCoins: 4299, image: 'images/vehicles/benefactor_scharmann.png', badge: 'Élite', tags: ['Berline blindée', 'Confort'] },
  { id: 'annis_elegy', name: 'Annis Elegy', priceCoins: 3999, image: 'images/vehicles/annis_elegy.png', badge: 'Élite', tags: ['Rapide', 'Stable'] },
  { id: 'karin_s95_bagged', name: 'Karin S95 Bagged', priceCoins: 3799, image: 'images/vehicles/karin_s95_bagged.png', badge: 'Élite', tags: ['Showcar', 'Basculée'] },
  { id: 'karin_s95', name: 'Karin S95', priceCoins: 3599, image: 'images/vehicles/karin_s95.png', badge: 'Rare', tags: ['Compacte', 'Polyvalente'] },
  { id: 'baja_weevil', name: 'Baja Weevil', priceCoins: 3399, image: 'images/vehicles/baja_weevil.png', badge: 'Rare', tags: ['Off-road', 'Fun'] },
  { id: 'benefactor_schafter', name: 'Benefactor Schafter', priceCoins: 2999, image: 'images/vehicles/benefactor_schafter.png', badge: 'Rare', tags: ['Berline', 'Accessible'] }
];

let cart = loadCart();
let toastTimer = null;
let paypalButtons = null;
let paypalRendered = false;

const els = {};

document.addEventListener('DOMContentLoaded', () => {
  bindElements();
  renderProducts();
  renderVehicles();
  renderCart();
  bindEvents();
  initReveal();
  initPayPal();
});

function bindElements() {
  els.packsGrid = document.getElementById('packsGrid');
  els.servicesGrid = document.getElementById('servicesGrid');
  els.vehiclesGrid = document.getElementById('vehiclesGrid');
  els.cartFab = document.getElementById('cartFab');
  els.heroCartButton = document.getElementById('heroCartButton');
  els.cartDrawer = document.getElementById('cartDrawer');
  els.cartOverlay = document.getElementById('cartOverlay');
  els.closeCart = document.getElementById('closeCart');
  els.cartItems = document.getElementById('cartItems');
  els.cartCount = document.getElementById('cartCount');
  els.cartSubtotal = document.getElementById('cartSubtotal');
  els.cartTotal = document.getElementById('cartTotal');
  els.discordPseudo = document.getElementById('discordPseudo');
  els.toast = document.getElementById('toast');
  els.paypalWrap = document.getElementById('paypalButtonWrap');
  els.paypalHelp = document.getElementById('paypalHelp');
}

function renderProducts() {
  els.packsGrid.innerHTML = PACKS.map(renderProductCard).join('');
  els.servicesGrid.innerHTML = SERVICES.map(renderProductCard).join('');
}

function renderProductCard(product) {
  return `
    <article class="card reveal">
      <div class="card__media">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
      </div>
      <div class="card__body">
        <div class="card__head">
          <div>
            <h3 class="card__title">${escapeHtml(product.name)}</h3>
            <p class="card__desc">${escapeHtml(product.description)}</p>
          </div>
          <div class="card__price">${formatPrice(product.price)}</div>
        </div>
        <div class="card__chips">${product.chips.map(chip => `<span>${escapeHtml(chip)}</span>`).join('')}</div>
        <div class="card__actions">
          <div class="card__paypal">Paiement PayPal</div>
          <button class="card__button" data-add-to-cart="${product.id}">Ajouter</button>
        </div>
      </div>
    </article>
  `;
}

function renderVehicles() {
  els.vehiclesGrid.innerHTML = VEHICLES.map(vehicle => `
    <article class="vehicle-card reveal">
      <div class="vehicle-card__media">
        <span class="vehicle-badge">${escapeHtml(vehicle.badge)}</span>
        <img src="${vehicle.image}" alt="${escapeHtml(vehicle.name)}" loading="lazy" />
      </div>
      <div class="vehicle-card__body">
        <div class="vehicle-meta">
          <h3>${escapeHtml(vehicle.name)}</h3>
          <div class="vehicle-price">${formatNumber(vehicle.priceCoins)} AC</div>
        </div>
        <p>Disponible via AceCoins en jeu. Ouvre un ticket boutique si tu as une question avant achat.</p>
        <div class="vehicle-tags">${vehicle.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
    </article>
  `).join('');
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const addBtn = event.target.closest('[data-add-to-cart]');
    if (addBtn) {
      addToCart(addBtn.dataset.addToCart);
      return;
    }

    const qtyBtn = event.target.closest('[data-cart-action]');
    if (qtyBtn) {
      handleCartAction(qtyBtn.dataset.cartAction, qtyBtn.dataset.id);
    }
  });

  [els.cartFab, els.heroCartButton].forEach(btn => btn?.addEventListener('click', openCart));
  [els.cartOverlay, els.closeCart].forEach(btn => btn?.addEventListener('click', closeCart));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCart();
  });
}

function addToCart(productId) {
  const product = [...PACKS, ...SERVICES].find(item => item.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
  }
  persistCart();
  renderCart();
  showToast(`${product.name} ajouté au panier.`);
}

function handleCartAction(action, id) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;

  if (action === 'minus') {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(entry => entry.id !== id);
    }
  }

  if (action === 'plus') {
    item.quantity += 1;
  }

  if (action === 'remove') {
    cart = cart.filter(entry => entry.id !== id);
  }

  persistCart();
  renderCart();
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getCartTotal();

  els.cartCount.textContent = totalItems;
  els.cartSubtotal.textContent = formatPrice(totalPrice);
  els.cartTotal.textContent = formatPrice(totalPrice);

  if (!cart.length) {
    els.cartItems.innerHTML = '<div class="cart-empty">Ton panier est vide. Ajoute un pack AceCoins ou l’unban pour continuer.</div>';
  } else {
    els.cartItems.innerHTML = cart.map(item => `
      <article class="cart-row">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" />
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${formatPrice(item.price)} • quantité ${item.quantity}</p>
          <div class="cart-controls">
            <button class="qty-btn" data-cart-action="minus" data-id="${item.id}">−</button>
            <button class="qty-btn" data-cart-action="plus" data-id="${item.id}">+</button>
            <button class="remove-btn" data-cart-action="remove" data-id="${item.id}">Retirer</button>
          </div>
        </div>
        <div class="cart-line-price">${formatPrice(item.price * item.quantity)}</div>
      </article>
    `).join('');
  }

  const hasItems = cart.length > 0;
  const hasDiscordPseudo = getDiscordPseudo().length >= 2;
  const ready = canCheckout();
  els.paypalWrap.classList.toggle('is-disabled', !ready);
  els.paypalHelp.textContent = !hasItems
    ? 'Ajoute au moins un article au panier pour afficher le paiement PayPal.'
    : !hasDiscordPseudo
      ? 'Renseigne d\'abord ton pseudo Discord pour débloquer le paiement PayPal.'
      : 'Le paiement s\'affiche ci-dessous. Après paiement, ouvre un ticket Discord catégorie boutique.';
  if (els.discordPseudo) {
    els.discordPseudo.classList.toggle('is-invalid', hasItems && !hasDiscordPseudo);
  }
}

function openCart() {
  els.cartDrawer.classList.add('is-open');
  els.cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  els.cartDrawer.classList.remove('is-open');
  els.cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function loadCart() {
  try {
    const raw = localStorage.getItem('acepvp_cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistCart() {
  localStorage.setItem('acepvp_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getDiscordPseudo() {
  return els.discordPseudo?.value.trim() || '';
}

function canCheckout() {
  return cart.length > 0 && getDiscordPseudo().length >= 2;
}

function buildNotifyPayload(details, orderData) {
  return {
    discordPseudo: getDiscordPseudo() || 'Non renseigné',
    total: Number(getCartTotal().toFixed(2)),
    currency: SHOP.currency || 'EUR',
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit_price: Number(item.price.toFixed(2)),
      total_price: Number((item.price * item.quantity).toFixed(2))
    })),
    paypal: {
      orderID: orderData?.orderID || details?.id || 'N/A',
      status: details?.status || 'COMPLETED',
      payerName: details?.payer?.name ? `${details.payer.name.given_name || ''} ${details.payer.name.surname || ''}`.trim() : 'Non transmis',
      payerEmail: details?.payer?.email_address || 'Non transmis'
    }
  };
}

async function sendDiscordNotification(payload) {
  if (!SHOP.workerBaseUrl) return;

  try {
    await fetch(`${SHOP.workerBaseUrl}/api/discord-notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error('Erreur notification Discord', error);
  }
}

function initPayPal() {
  const checkSdk = () => {
    if (!window.paypal?.Buttons) {
      setTimeout(checkSdk, 250);
      return;
    }

    if (paypalRendered) return;

    paypalButtons = window.paypal.Buttons({
      style: { layout: 'vertical', shape: 'rect', label: 'paypal', height: 46 },
      onClick() {
        if (!cart.length) {
          showToast('Ajoute un article avant de payer.');
          return Promise.reject();
        }
        if (!getDiscordPseudo()) {
          showToast('Le pseudo Discord est obligatoire avant le paiement.');
          els.discordPseudo?.focus();
          return Promise.reject();
        }
        return Promise.resolve();
      },
      createOrder(data, actions) {
        const total = getCartTotal();
        if (!total) throw new Error('Panier vide');
        if (!getDiscordPseudo()) throw new Error('Pseudo Discord obligatoire');
        return actions.order.create({
          purchase_units: [{
            description: `ACEPVP - ${cart.map(item => `${item.name} x${item.quantity}`).join(', ').slice(0, 120)}`,
            amount: {
              currency_code: SHOP.currency || 'EUR',
              value: total.toFixed(2)
            }
          }]
        });
      },
      async onApprove(data, actions) {
        const details = await actions.order.capture();
        const payload = buildNotifyPayload(details, data);
        await sendDiscordNotification(payload);
        cart = [];
        persistCart();
        renderCart();
        closeCart();
        showToast('Paiement validé. Ouvre un ticket Discord catégorie boutique.');
      },
      onError(error) {
        console.error(error);
        showToast('Erreur PayPal. Vérifie ton compte ou réessaie.');
      }
    });

    paypalButtons.render('#paypal-button-container');
    paypalRendered = true;
  };

  checkSdk();
}

function formatPrice(value) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat('fr-FR').format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  toastTimer = setTimeout(() => {
    els.toast.classList.remove('is-visible');
  }, 2600);
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
