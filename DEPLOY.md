# Come mettere le modifiche online (Ohana B&B)

## 1. Salva tutto su Git e pusha

Da terminale, nella cartella del progetto:

```bash
cd /Users/salvatorestasio/Progetti/ohana-bnb

# Vedi cosa è stato modificato
git status

# Aggiungi tutti i file modificati
git add .

# Commit con un messaggio
git commit -m "Aggiornamenti: galleria, video, contatti, pulsanti, sync video"

# Invia su GitHub/GitLab (sostituisci con il tuo remote se diverso)
git push origin main
```

Se usi un altro branch (es. `master`), usa quello al posto di `main`.

---

## 2. Deploy su Vercel (consigliato per Next.js)

1. **Vai su [vercel.com](https://vercel.com)** e accedi (anche con account GitHub/GitLab).

2. **Importa il progetto**
   - "Add New" → "Project"
   - Collega il repository Git (GitHub/GitLab) e seleziona `ohana-bnb`
   - Vercel rileva automaticamente Next.js

3. **Variabili d’ambiente**
   - Nella configurazione del progetto vai in **Settings → Environment Variables**
   - Aggiungi le stesse variabili che hai in `.env.local`, ad esempio:
     - `STRIPE_SECRET_KEY`
     - `STRIPE_WEBHOOK_SECRET`
     - `NEXT_PUBLIC_BASE_URL` (es. `https://tuodominio.vercel.app` o il tuo dominio)
     - `RESEND_API_KEY`
     - `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`
     - `DISCOUNT_CODES`, `DISCOUNT_LIMITS` (se usi i codici sconto)
   - **Non** caricare il file `.env.local`: le variabili si impostano solo dal pannello Vercel.

4. **Deploy**
   - Clicca **Deploy**
   - Ogni volta che fai `git push origin main`, Vercel farà un nuovo deploy automatico.

---

## 3. Dominio personalizzato (opzionale)

In **Settings → Domains** su Vercel puoi aggiungere il tuo dominio (es. `ohanabnb.it`) e seguire le istruzioni per puntare DNS a Vercel.

---

## 4. Dopo il deploy

- Controlla che **tutte le variabili d’ambiente** siano impostate, altrimenti pagamenti, email e codici sconto non funzioneranno.
- Se usi Stripe, **webhook**: in Stripe Dashboard imposta l’URL del webhook su  
  `https://tuodominio.vercel.app/api/webhooks/stripe` (o il tuo URL reale).
- Le immagini e i video in `public/` sono già inclusi nel deploy.
