import express from "express";

const app = express();

// Route "health" pour vérifier que ça répond
app.get("/", (req, res) => res.send("OK"));

// Webhook Tebex (simple, sans sécurité pour l’instant)
app.post("/tebex/webhook", express.json(), (req, res) => {
  console.log("Webhook reçu:", req.body);

  // IMPORTANT: Tebex envoie un event "validation.webhook"
  // Il faut répondre {"id": "<id>"} pour valider l’endpoint.
  if (req.body?.type === "validation.webhook") {
    return res.status(200).json({ id: req.body.id });
  }

  return res.sendStatus(204);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on", port));
