const PRODUCTS = [
  { id: 'ac500', type: 'coins', name: '500 AceCoins', price: 5, icon: '🪙', perks: ['Petit pack', 'Livraison via Discord', 'Parfait pour tester'] },
  { id: 'ac1000', type: 'coins', name: '1000 AceCoins', price: 10, icon: '💰', perks: ['Pack standard', 'Bon rapport quantité/prix', 'Livraison via Discord'] },
  { id: 'ac2000', type: 'coins', name: '2000 AceCoins', price: 20, icon: '✨', perks: ['Pack conseillé', 'Correspond au VIP', 'Livraison via Discord'] },
  { id: 'ac5000', type: 'coins', name: '5000 AceCoins', price: 50, icon: '🚀', perks: ['Pack premium', 'Pour gros achats', 'Livraison via Discord'] },
  { id: 'ac10000', type: 'coins', name: '10000 AceCoins', price: 100, icon: '👑', perks: ['Très gros pack', 'Réserve idéale', 'Livraison via Discord'] },
  { id: 'unban', type: 'service', name: 'Unban ACEPVP', price: 50, icon: '🔓', perks: ['Traitement staff', 'Demande via Discord', 'Preuve PayPal requise'] }
];

const VEHICLES = [
  { name: 'Buffalo STX Blindée', priceCoins: 2499, rarity: 'Épique', icon: '🚗' },
  { name: 'Schafter RS Blindée', priceCoins: 3999, rarity: 'Épique', icon: '🚘' },
  { name: 'Kuruma Blindée', priceCoins: 1799, rarity: 'Classique', icon: '🛡️' },
  { name: 'Baller LE Blindée', priceCoins: 2899, rarity: 'Premium', icon: '🚙' },
  { name: 'Nightshark Blindée', priceCoins: 4499, rarity: 'Prestige', icon: '🦈' },
  { name: 'Patriot Mil-Spec', priceCoins: 4999, rarity: 'Prestige', icon: '⚔️' }
];

let cart = [];
let paypalButtonsRendered = false;

const eur = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = PRODUCTS.map(product => `
    <article class="product-card">
      <div class="product-top">
        <div class="product-icon">${product.icon}</div>
        <div class="price">${eur(product.price)}</div>
      </div>
      <div>
        <h3>${product.name}</h3>
        <p class="muted">${product.type === 'coins' ? 'Pack AceCoins PayPal' : 'Service PayPal'}</p>
      </div>
      <ul class="perks">${product.perks.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="card-actions">
        <span class="muted">Paiement unique</span>
        <button class="btn btn--primary btn--small" data-add="${product.id}">Ajouter</button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.add));
  });
}

function renderVehicles() {
  const grid = document.getElementById('vehicleGrid');
  grid.innerHTML = VEHICLES.map(vehicle => `
    <article class="vehicle-card">
      <div class="vehicle-thumb">${vehicle.icon}</div>
      <div>
        <h3>${vehicle.name}</h3>
        <div class="vehicle-meta"><span>${vehicle.rarity}</span><strong>${vehicle.priceCoins.toLocaleString('fr-FR')} AC</strong></div>
      </div>
      <p class="muted">Récupération en jeu après achat d'AceCoins et ticket Discord.</p>
    </article>
  `).join('');
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  saveCart();
  renderCart();
  showToast(`${product.name} ajouté au panier`);
}

function changeQty(id, delta) {
  const item = cart.find(product => product.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(product => product.id !== id);
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderCart() {
  const wrapper = document.getElementById('cartItems');
  const subtotal = document.getElementById('subtotal');
  const total = document.getElementById('total');
  const count = document.getElementById('cartCount');
  const warning = document.getElementById('paypal-warning');

  subtotal.textContent = eur(cartTotal());
  total.textContent = eur(cartTotal());
  count.textContent = `${cartCount()} article${cartCount() > 1 ? 's' : ''}`;

  if (!cart.length) {
    wrapper.className = 'cart-items empty';
    wrapper.textContent = 'Ton panier est vide.';
    warning.classList.remove('hidden');
  } else {
    wrapper.className = 'cart-items';
    wrapper.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item__top">
          <div>
            <strong>${item.name}</strong>
            <div class="muted">${eur(item.price)} / unité</div>
          </div>
          <button class="btn btn--danger btn--small" data-remove="${item.id}">Supprimer</button>
        </div>
        <div class="card-actions">
          <div class="qty">
            <button data-qty="${item.id}" data-delta="-1">−</button>
            <strong>${item.quantity}</strong>
            <button data-qty="${item.id}" data-delta="1">+</button>
          </div>
          <strong>${eur(item.price * item.quantity)}</strong>
        </div>
      </div>
    `).join('');
    warning.classList.add('hidden');
  }

  wrapper.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => removeItem(btn.dataset.remove)));
  wrapper.querySelectorAll('[data-qty]').forEach(btn => btn.addEventListener('click', () => changeQty(btn.dataset.qty, Number(btn.dataset.delta))));
}

function saveCart() {
  localStorage.setItem('acepvp_cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem('acepvp_cart') || '[]');
    if (!Array.isArray(cart)) cart = [];
  } catch {
    cart = [];
  }
}

function getPayload(details) {
  const pseudo = document.getElementById('playerPseudo').value.trim();
  const note = document.getElementById('orderNote').value.trim();
  return {
    source: 'acepvp-boutique',
    pseudo: pseudo || 'Non renseigné',
    note: note || '',
    total: Number(cartTotal().toFixed(2)),
    currency: window.SHOP_CONFIG.currency,
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: Number((item.price * item.quantity).toFixed(2))
    })),
    paypal: {
      orderID: details?.id || '',
      status: details?.status || '',
      payerEmail: details?.payer?.email_address || '',
      payerName: [details?.payer?.name?.given_name, details?.payer?.name?.surname].filter(Boolean).join(' ') || ''
    }
  };
}

function setupPaypal() {
  if (!window.paypal || paypalButtonsRendered) return;
  paypalButtonsRendered = true;

  paypal.Buttons({
    style: { layout: 'vertical', shape: 'rect', label: 'paypal' },
    onClick: function () {
      if (!cart.length) {
        showToast('Ajoute au moins un article au panier.');
        return false;
      }
      return true;
    },
    createOrder: function (data, actions) {
      if (!cart.length) throw new Error('Panier vide');
      return actions.order.create({
        purchase_units: [{
          amount: { currency_code: window.SHOP_CONFIG.currency, value: cartTotal().toFixed(2) },
          description: cart.map(item => `${item.name} x${item.quantity}`).join(' | ')
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(async function (details) {
        try {
          await fetch(`${window.SHOP_CONFIG.workerBaseUrl}/api/discord-notify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getPayload(details))
          });
        } catch (error) {
          console.error(error);
        }
        cart = [];
        saveCart();
        renderCart();
        document.getElementById('orderNote').value = '';
        showToast('Paiement validé. Le staff a reçu la notification Discord.');
      });
    },
    onError: function (err) {
      console.error(err);
      showToast('Erreur PayPal. Vérifie ton compte ou les paramètres PayPal.');
    }
  }).render('#paypal-button-container');
}

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderProducts();
  renderVehicles();
  renderCart();
  setupPaypal();
});
