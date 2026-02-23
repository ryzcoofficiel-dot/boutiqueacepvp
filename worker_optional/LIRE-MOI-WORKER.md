# Worker Cloudflare (optionnel) — Log PayPal -> Discord

Ce dossier sert à **recevoir un webhook PayPal** puis **envoyer un message dans un salon Discord**.

---

## 1) Déployer le Worker (dashboard Cloudflare)

1. Cloudflare -> **Workers & Pages**
2. **Create application**
3. **Create Worker**
4. Nom conseillé : `acepvp-paypal-log`
5. **Deploy**
6. **Edit code**
7. Remplace le code par le contenu de `paypal_discord_worker.js`
8. **Deploy**

---

## 2) Ajouter le secret Discord

Dans ton Worker :

- **Settings** -> **Variables and Secrets** -> **Add**
- Type : **Secret**
- Nom : `DISCORD_WEBHOOK_URL`
- Valeur : ton URL webhook Discord
- Clique **Deploy**

---

## 3) URL à utiliser dans PayPal

Si ton Worker est :

`https://acepvp-paypal-log.xxx.workers.dev`

Alors l'URL webhook à mettre dans PayPal est :

`https://acepvp-paypal-log.xxx.workers.dev/paypal-webhook`

---

## 4) Événements PayPal conseillés

- `PAYMENT.CAPTURE.COMPLETED`
- `CHECKOUT.ORDER.APPROVED` (optionnel)
- `PAYMENT.SALE.COMPLETED` (utile selon le flux PayPal)

---

## 5) Tester rapidement

### Test santé Worker
Ouvre dans le navigateur :

`https://acepvp-paypal-log.xxx.workers.dev/`

Tu dois voir un JSON `ok: true`.

### Test réel
- Fais un paiement test / réel sur la boutique
- Vérifie que le log arrive dans ton salon Discord

---

## 6) Important (sécurité)

Le code fourni est un **exemple simple**.
Pour une vraie production, ajoute :

- vérification de signature PayPal
- anti-doublon (idempotence)
- logs d'erreurs plus détaillés

