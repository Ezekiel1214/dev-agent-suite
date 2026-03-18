# Dev Agent Suite Hosted Trial Worker

This Worker adds a hosted Cloudflare Workers AI trial endpoint for `dev-agent-suite.html`.

## What it does

- Exposes `POST /api/trial-chat`
- Runs prompts through Workers AI using `env.AI.run(...)`
- Adds CORS for your site origin
- Clamps prompt size, message count, and output tokens

## Default model

- `@cf/meta/llama-3.1-8b-instruct`

This is the balanced option from the Cloudflare Workers AI guidance: better quality than the cheapest models, but still much cheaper than larger models.

## Before deploy

1. Authenticate Wrangler:

```bash
npx wrangler login
```

2. Review `ALLOWED_ORIGINS` in `wrangler.jsonc`.

3. For local development, run Workers AI remotely:

```bash
cd cloudflare-trial
npx wrangler dev --remote
```

## Deploy

```bash
cd cloudflare-trial
npx wrangler deploy
```

## Connect the app to the Worker

After deploy, take the Worker base URL, for example:

```text
https://dev-agent-suite-trial.your-subdomain.workers.dev
```

Then either:

- Open the app with `?trial_api=https://dev-agent-suite-trial.your-subdomain.workers.dev`
- Or set it once in the browser console:

```js
sessionStorage.setItem('das_trial_api_base', 'https://dev-agent-suite-trial.your-subdomain.workers.dev');
location.reload();
```

When a trial endpoint is configured, the app shows a `Hosted Trial` provider button and can send prompts without any user API key.

## Important

- This is a minimal hosted trial, not a hardened abuse-resistant gateway.
- Before a broad public launch, add rate limits and/or Turnstile verification.
- If you only want free user-owned usage, keep using `Gemini Free` instead.
