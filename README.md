# ACEPVP Boutique (FiveM) — Guide complet A à Z

Boutique statique **ACEPVP** (HTML/CSS/JS) avec uniquement les **packs AceCoins** et les **boutons PayPal Hosted Buttons**.

Ce pack est prêt à être hébergé sur **GitHub + Cloudflare Pages**.

---

## ✅ Contenu du projet

- `index.html` — page boutique (client)
- `style.css` — design violet ACEPVP
- `script.js` — packs + rendu des boutons PayPal Hosted Buttons
- `images/ui/` — logo, bannière, fond
- `worker/` — optionnel (logs automatiques PayPal -> Discord)
- `.nojekyll` — utile pour GitHub Pages si tu testes aussi via GitHub Pages

---

## 1) Préparer les fichiers (sur ton PC)

1. **Décompresse le ZIP**
2. Vérifie que tu as bien ce dossier :
   - `acepvp_boutique_client_clean_v2/`
3. Ouvre le dossier dans **VS Code** (conseillé)

### Test local (optionnel mais conseillé)

#### Option A — VS Code (Live Server)
- Installe l'extension **Live Server**
- Clic droit sur `index.html` -> **Open with Live Server**

#### Option B — Python
Dans le dossier du projet :

```bash
python -m http.server 8080
```

Puis ouvre : `http://localhost:8080`

---

## 2) GitHub — créer le repo et envoyer la boutique

Tu peux le faire **sans ligne de commande** (plus simple) ou avec Git.

### Méthode simple (web GitHub)

1. Va sur **GitHub**
2. Clique sur **New repository**
3. Nom du repo (exemple) : `acepvp-boutique`
4. Mets-le en **Public** (ou Private si tu veux)
5. Clique **Create repository**
6. Dans le repo, clique **Add file** -> **Upload files**
7. Glisse-dépose **tout le contenu du dossier** `acepvp_boutique_client_clean_v2` (pas forcément le ZIP lui-même)
8. Clique **Commit changes**

### Méthode pro (Git en ligne de commande)

Dans le dossier du projet :

```bash
git init
git add .
git commit -m "Initial commit - Boutique ACEPVP"
git branch -M main
git remote add origin https://github.com/TON_PSEUDO/acepvp-boutique.git
git push -u origin main
```

> Si Git te demande ton identité :

```bash
git config --global user.name "TonPseudo"
git config --global user.email "tonmail@example.com"
```

---

## 3) Cloudflare Pages — héberger la boutique (site public)

### A. Connecter GitHub à Cloudflare

1. Connecte-toi à **Cloudflare**
2. Va dans **Workers & Pages**
3. Clique **Create application**
4. Clique sur l'onglet **Pages**
5. Clique **Connect to Git** / **Import an existing Git repository**
6. Autorise GitHub si demandé
7. Sélectionne le repo `acepvp-boutique`

### B. Configuration de build (très important)

Comme la boutique est **100% statique** (HTML/CSS/JS) :

- **Framework preset** : `None`
- **Build command** : *(laisser vide)*
- **Build output directory** : `/`

Ensuite clique **Save and Deploy**.

### C. Résultat

Cloudflare te donne une URL du style :

```txt
https://acepvp-boutique.pages.dev
```

Ton site est en ligne ✅

### D. Domaine personnalisé (optionnel)

Si tu as un domaine (ex: `shop.acepvp.fr`) :

1. Ouvre ton projet Pages
2. Va dans **Custom domains**
3. Clique **Set up a custom domain**
4. Suis les instructions Cloudflare

---

## 4) PayPal — configurer les paiements (Hosted Buttons)

Ta boutique utilise des **Hosted Buttons** PayPal (mode simple/no-code), et les IDs suivants sont déjà intégrés dans `script.js` :

- 500 AceCoins -> `TZDHY3VPULC2U`
- 1000 AceCoins -> `LWRB63XQHWR4Q`
- 2000 AceCoins -> `DKQZDYUBH3KV2`
- 5000 AceCoins -> `MBU2H7X5W69MW`
- 10000 AceCoins -> `9ZL4PWSUNUKG8`

### A. Vérifier / remplacer le Client ID PayPal

Dans `index.html`, tu as déjà ce script :

```html
<script src="https://www.paypal.com/sdk/js?client-id=...&components=hosted-buttons&disable-funding=venmo&currency=EUR" defer></script>
```

Si un jour tu veux changer le compte PayPal, remplace **uniquement** le `client-id=` par le tien.

### B. Si tu veux créer de nouveaux boutons PayPal plus tard

1. Va sur ton **compte PayPal Business**
2. Ouvre l'outil **Payment Links / Buttons** (Button Builder)
3. Crée un bouton par pack (1 bouton = 1 pack)
4. Récupère l'ID `hostedButtonId`
5. Remplace l'ID dans `script.js` (tableau `PACKS`)

### C. Modifier les prix/labels affichés sur la boutique

Ouvre `script.js`, section `PACKS`, et modifie :

- `title` (ex: `500 AceCoins`)
- `price` (ex: `5,00 €`)
- `desc` (description)
- `id` (ID PayPal Hosted Button)

> ⚠️ Le prix réellement débité vient du **bouton PayPal**, pas juste du texte affiché.

### D. Test de paiement

- Fais un test réel à petit montant (ou un bouton test si tu en as un)
- Vérifie que :
  - le bouton charge correctement,
  - le paiement s'ouvre,
  - le paiement arrive sur ton compte PayPal.

---

## 5) Discord — créer le webhook (pour logs boutique)

> Le site client **n'utilise pas directement** le webhook Discord (pour éviter d'exposer ton URL webhook côté navigateur).
> Les logs automatiques se font via le **Worker Cloudflare** (section 6).

### Créer un webhook Discord

1. Ouvre ton serveur Discord
2. Va dans **Paramètres du serveur**
3. **Intégrations**
4. **Webhooks**
5. Clique **Créer un webhook**
6. Choisis le salon (ex: `#logs-boutique`)
7. Donne un nom (ex: `ACEPVP Logs`)
8. Clique **Copier l'URL du webhook**

Tu obtiens une URL de ce type :

```txt
https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN
```

⚠️ **Ne partage jamais cette URL** publiquement.

---

## 6) Cloudflare Worker (optionnel) — logs automatiques PayPal -> Discord

Cette partie est **optionnelle**, mais c'est la bonne méthode si tu veux un log auto après paiement.

### Pourquoi il faut un Worker ?

Les **Hosted Buttons** PayPal sont simples à intégrer, mais tu n'as pas un `onApprove` custom dans ta page comme sur une intégration PayPal plus avancée.

Donc, pour avoir un log auto :

**PayPal (webhook) -> Cloudflare Worker -> Discord webhook**

---

### A. Créer le Worker sur Cloudflare

1. Va sur **Cloudflare** -> **Workers & Pages**
2. Clique **Create application**
3. Clique **Create Worker** (ou *Start with Hello World*)
4. Donne un nom (ex: `acepvp-paypal-log`)
5. Clique **Deploy**
6. Ouvre ensuite **Edit code**

### B. Mettre le code du Worker

1. Ouvre le fichier local : `worker/paypal_discord_worker.js`
2. Copie-colle le code dans l'éditeur Cloudflare Worker
3. Clique **Deploy**

### C. Ajouter le secret Discord dans le Worker

1. Dans ton Worker : **Settings**
2. Va dans **Variables and Secrets**
3. **Add** -> Type **Secret**
4. Nom : `DISCORD_WEBHOOK_URL`
5. Valeur : colle ton URL webhook Discord
6. **Deploy**

> Si tu préfères, tu peux aussi ajouter un secret `PAYPAL_VERIFY` plus tard pour une vérification avancée (non obligatoire dans cet exemple).

### D. URL du Worker (endpoint)

Ton Worker aura une URL du style :

```txt
https://acepvp-paypal-log.<ton-subdomain>.workers.dev
```

L'endpoint webhook PayPal sera :

```txt
https://acepvp-paypal-log.<ton-subdomain>.workers.dev/paypal-webhook
```

---

## 7) PayPal Webhook — envoyer les événements de paiement vers ton Worker

### A. Ouvrir le dashboard développeur PayPal

1. Va sur **PayPal Developer Dashboard**
2. Ouvre **Apps & Credentials**
3. Sélectionne ton application (celle liée à ton compte / client ID)
4. Trouve la section **Webhooks**

### B. Ajouter le webhook

1. Clique **Add Webhook**
2. Colle l'URL de ton Worker :

```txt
https://acepvp-paypal-log.<ton-subdomain>.workers.dev/paypal-webhook
```

3. Choisis les événements à écouter (au minimum) :
   - `PAYMENT.CAPTURE.COMPLETED`
   - `CHECKOUT.ORDER.APPROVED` (optionnel)
   - `PAYMENT.SALE.COMPLETED` (utile selon certains flux/boutons)

4. Sauvegarde

### C. Tester le webhook PayPal

Tu peux :
- faire un vrai paiement test (petit montant), **ou**
- utiliser l'outil de test / renvoi d'événement PayPal (si disponible dans ton dashboard)

Ensuite, vérifie ton salon Discord `#logs-boutique`.

---

## 8) Vérifications finales avant ouverture boutique

### Checklist client (site)
- [ ] Le logo ACEPVP s'affiche
- [ ] Les 5 packs AceCoins s'affichent
- [ ] Les boutons PayPal se chargent
- [ ] Le lien Discord fonctionne
- [ ] Le site est bien responsive sur mobile

### Checklist paiement
- [ ] Le paiement arrive bien sur le bon compte PayPal
- [ ] Les montants correspondent à tes packs

### Checklist logs (si Worker activé)
- [ ] Le Worker répond sur `/paypal-webhook`
- [ ] Le secret `DISCORD_WEBHOOK_URL` est bien configuré
- [ ] Le webhook PayPal est bien enregistré
- [ ] Les logs arrivent sur Discord

---

## 9) Modifications rapides (si tu veux changer la boutique plus tard)

### Changer le texte du header
- Fichier : `index.html`

### Changer le design / couleurs
- Fichier : `style.css`

### Changer les packs / IDs PayPal
- Fichier : `script.js` -> tableau `PACKS`

### Changer logo / fond
- Remplace les fichiers dans `images/ui/` en gardant les mêmes noms :
  - `ace_logo.png`
  - `hero_banner.png`
  - `bg_acepvp.jpg`

---

## 10) Sécurité / bonnes pratiques (important)

- **Ne mets pas ton webhook Discord dans `index.html` ou `script.js`** (sinon il sera visible par tout le monde)
- Utilise le **Worker + Secret Cloudflare** pour les logs
- Sauvegarde ton repo GitHub avant de modifier les packs
- Fais un paiement test après chaque gros changement

---

## 11) Besoin d'une V2 plus avancée ?

Tu pourras ajouter ensuite :
- une page FAQ séparée
- une page "règlement / CGV"
- une page "support / ticket"
- un système de maintenance banner
- une version plus premium (animations + effets glow)

