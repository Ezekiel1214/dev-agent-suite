# Dev Agent Suite

Seven AI-powered development agents packaged as a browser-first toolkit. The core release stays flat and browser-friendly: the app, the sales page, the test suite, the docs, the schema reference, the monetization plan, and seven agent config files. This workspace also includes an optional `cloudflare-trial/` Worker scaffold for teams that want a hosted free-trial endpoint.

## Live Links

- Landing page: [dev-agent-suite.vercel.app](https://dev-agent-suite.vercel.app)
- App: [dev-agent-suite.vercel.app/dev-agent-suite.html](https://dev-agent-suite.vercel.app/dev-agent-suite.html)
- Hosted trial worker: [dev-agent-suite-trial.bouroguis.workers.dev/health](https://dev-agent-suite-trial.bouroguis.workers.dev/health)
- Launch copy pack: `LAUNCH_KIT.md`
- Final ready-to-post copy: `FINAL_LAUNCH_COPY.md`

## Agents

| ID | Model | What it does |
|---|---|---|
| `orchestrator` | Sonnet | Routes work across all agents and manages workflow state |
| `story-generator` | Sonnet | Turns requirements into user stories with GWT acceptance criteria |
| `dev-planner` | Sonnet | Converts stories into tasks, timelines, research notes, and risks |
| `ui-sketcher` | Sonnet | Produces ASCII wireframes and interaction flows |
| `test-writer` | Sonnet | Drafts unit, integration, and end-to-end test coverage |
| `code-reviewer` | Opus | Reviews code for security, performance, and reliability issues |
| `bug-analyzer` | Opus | Performs root-cause analysis for bugs and failures |

## Quick Start

```text
1. Open dev-agent-suite.html in your browser.
2. Select `Hosted Trial` to start with no user API key, or switch to `Gemini Free` / `Anthropic`.
3. If you choose a BYOK provider, click `Set API Key`.
4. Paste a free Gemini key from AI Studio or your Anthropic key.
5. Pick an agent and start typing.
```

Get a Gemini key at [Google AI Studio](https://aistudio.google.com/apikey) or an Anthropic key at [console.anthropic.com](https://console.anthropic.com). The production app now defaults to the hosted trial at `https://dev-agent-suite-trial.bouroguis.workers.dev`, and self-hosters can still override that with `?trial_api=https://your-worker.workers.dev`.

## Workflows

Workflow A - New Feature
`story-generator -> dev-planner + ui-sketcher -> test-writer -> code-reviewer`

Workflow B - Bug Fix
`bug-analyzer -> test-writer -> code-reviewer`

Workflow C - Code Review
`code-reviewer -> bug-analyzer (if critical)`

Workflow D - Requirements and Design
`story-generator -> dev-planner + ui-sketcher`

Use `orchestrator` to run any workflow end to end.

## Running Tests

```bash
node tests_fixed.js
# 220 passed | 0 failed | 220 total
```

No dependencies - pure Node.js.

## Package Contents

```text
dev-agent-suite.html       <- The self-contained app
landing.html               <- The sales and pricing page
tests_fixed.js             <- The bundled 220-test suite
GUIDE.md                   <- Full developer guide
README.md                  <- This file
SCHEMAS.md                 <- Shared schema reference
MONETIZATION_STRATEGY.md   <- Pricing and go-to-market notes
cloudflare-trial/         <- Optional Workers AI hosted-trial scaffold
orchestrator.md            <- Agent config
story-generator.md         <- Agent config
dev-planner.md             <- Agent config
ui-sketcher.md             <- Agent config
test-writer.md             <- Agent config
code-reviewer.md           <- Agent config
bug-analyzer.md            <- Agent config
```

## Deployment

Local: open `dev-agent-suite.html` directly. No server is required.

GitHub Pages: publish the repository root, then browse directly to `/dev-agent-suite.html` or `/landing.html`.

Netlify / Vercel: drag the extracted release folder onto the dashboard, or deploy the repo root as a static site.

Cloudflare hosted trial: deploy `cloudflare-trial/` with Wrangler, then either set your Worker as the default trial endpoint in `dev-agent-suite.html` or open the app using `?trial_api=https://your-worker.workers.dev`.

## Models Used

- `claude-sonnet-4-6` for `orchestrator`, `story-generator`, `dev-planner`, `ui-sketcher`, and `test-writer`
- `claude-opus-4-6` for `code-reviewer` and `bug-analyzer`

## Provider Options

- `Gemini Free` uses `gemini-2.5-flash` with a free-tier Gemini API key.
- `Anthropic` keeps the original Claude BYOK flow.
- `Hosted Trial` uses the `cloudflare-trial/` Worker scaffold plus Cloudflare Workers AI, so the browser talks to your Worker instead of storing a user key.

See [docs.anthropic.com/en/docs/about-claude/models/overview](https://docs.anthropic.com/en/docs/about-claude/models/overview) for current model strings.

## Security

- API key stored in `sessionStorage` only and cleared when the tab closes
- All user input HTML-escaped before DOM insertion
- No runtime third-party JavaScript
- Direct browser calls go to Anthropic or Gemini depending on the selected provider
- Optional hosted-trial calls go to your configured Cloudflare Worker endpoint

## License

MIT
