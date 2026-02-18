This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Pagamenti con Stripe

I pagamenti online usano **Stripe**: i soldi vengono accreditati sul tuo account Stripe.

### Cosa ti serve

1. **Account Stripe** – [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Secret key** – da Dashboard → Sviluppatori → Chiavi API. Per i test usa `sk_test_...`, in produzione `sk_live_...`.

### Configurazione

Copia `.env.example` in `.env.local` e imposta:

- `NEXT_PUBLIC_BASE_URL` – in sviluppo `http://localhost:3000`, in produzione l'URL del sito.
- `STRIPE_SECRET_KEY` – la chiave segreta Stripe.

Riavvia il server dopo le modifiche. In produzione imposta le stesse variabili nel pannello del tuo hosting.

### Andare online (produzione)

1. **Fai il deploy** del progetto (es. su [Vercel](https://vercel.com): collega il repo, deploy).
2. **Ottieni l’URL del sito**  
   - Con Vercel avrai un indirizzo tipo `https://ohana-bnb.vercel.app`  
   - Oppure collega il tuo dominio (es. `https://www.ohana-bnb.it`) nelle impostazioni del progetto.
3. **Imposta le variabili d’ambiente** nel pannello del hosting (es. Vercel → progetto → Settings → Environment Variables):

   | Nome | Valore | Note |
   |------|--------|------|
   | `NEXT_PUBLIC_BASE_URL` | **L’URL del tuo sito** (es. `https://www.ohana-bnb.it` o `https://ohana-bnb.vercel.app`) | Senza slash finale. Serve per Stripe (success/cancel) e link. |
   | `STRIPE_SECRET_KEY` | La tua chiave **sk_live_...** (da Stripe, modalità Live) | Solo per l’ambiente Production. |

4. **Rideploy** (se le variabili le aggiungi dopo il primo deploy), così il sito usa l’URL e la chiave live.

In locale tieni `.env.local` con `NEXT_PUBLIC_BASE_URL=http://localhost:3000` e `STRIPE_SECRET_KEY=sk_test_...`.

## Recensioni e moderazione

Gli ospiti possono lasciare recensioni dalla sezione **Recensioni** in homepage. Le recensioni restano in stato "in attesa" finché non le approvi o rifiuti.

- **Pannello moderazione:** apri **/admin/reviews** e inserisci la password admin.
- **Variabile d'ambiente:** in `.env.local` (e in produzione) imposta `REVIEW_ADMIN_SECRET` con una password sicura. Senza questa variabile il pannello admin non è accessibile.
- Le recensioni sono salvate in memoria: restano fino al riavvio del server. Su Vercel si resettano a ogni redeploy; per persistenza permanente si può aggiungere in seguito un database (es. Upstash Redis).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
