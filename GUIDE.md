# Dev Agent Suite - Developer Guide

**Version 1.0 | March 2026**

---

## Overview

Dev Agent Suite is a self-contained browser app with seven specialized development agents that cover the workflow from requirements to debugging. The package also includes a landing page, a Node.js test suite, shared schema documentation, a monetization plan, one Markdown config file for each agent, an optional `cloudflare-trial/` Worker scaffold, and a companion `framework-finder/` static tool for stack comparison.

The app runs directly in the browser against Gemini free tier or the Anthropic API using your own API key. If you want a hosted no-key free trial, the optional Cloudflare Worker can proxy requests through Workers AI. No build pipeline is required for the static app.

---

## Quick Start

1. Open `index.html` or `landing.html` in a modern browser to view the Dev Agent Suite landing page.
2. Open `dev-agent-suite.html` when you want the app itself.
3. Open `framework-finder/index.html` when you want the companion stack selector.
4. In the app, select **Hosted Trial** to continue without a user API key, or switch to **Gemini Free** / **Anthropic**.
5. If you choose a BYOK provider, click **Set API Key**, then open any agent and start typing.

Provider keys are stored only in `sessionStorage` and are sent directly to the selected provider endpoint. Hosted trial mode skips user key storage and calls the configured Worker endpoint instead.

---

## Architecture

The main application is a single HTML file. Styling, layout, agent definitions, workflows, API calls, and markdown rendering all live inside that file.

```text
dev-agent-suite.html
|-- <style>      CSS variables, layout, components, responsive rules
|-- <nav>        Top navigation and API key controls
|-- <div.app>    Sidebar, home panel, and per-agent chat panels
|-- API modal    Prompt for the selected provider API key when required
`-- <script>     AGENTS, WORKFLOWS, state, rendering, send(), esc()
```

Key runtime pieces:

- `AGENTS[]` defines the seven agents, their prompts, colors, models, and quick prompts.
- `WORKFLOWS[]` defines Workflow A, Workflow B, Workflow C, and Workflow D.
- `PROVIDERS` tracks Hosted Trial, Gemini Free, and Anthropic state.
- `send()` routes conversation history to Hosted Trial, Anthropic, or Gemini depending on the selected provider.
- `renderMd()` formats assistant output for display.
- `esc()` escapes user-controlled text before it reaches the DOM.

The optional hosted-trial Worker lives outside the HTML bundle:

```text
cloudflare-trial/
|-- wrangler.jsonc
|-- README.md
`-- src/index.js
```

The companion Framework Finder stays separate from the Dev Agent Suite runtime:

```text
framework-finder/
|-- index.html
|-- app.js
`-- styles.css
```

---

## Agent Reference

### Model assignments

| Agent | Model | Purpose |
|---|---|---|
| `orchestrator` | `claude-sonnet-4-6` | Coordinates workflows and handoffs |
| `story-generator` | `claude-sonnet-4-6` | Turns requirements into structured stories |
| `dev-planner` | `claude-sonnet-4-6` | Breaks stories into implementation plans |
| `ui-sketcher` | `claude-sonnet-4-6` | Produces ASCII wireframes and UX flows |
| `test-writer` | `claude-sonnet-4-6` | Drafts testing strategy and test artifacts |
| `code-reviewer` | `claude-opus-4-6` | Performs deeper review and risk analysis |
| `bug-analyzer` | `claude-opus-4-6` | Investigates failures and likely root causes |

### JSON schema handoffs

Each agent ends with a structured JSON block that can be pasted into the next agent.

| Produced by | Schema | Consumed by |
|---|---|---|
| `story-generator` | `feature_brief.json` | `dev-planner`, `ui-sketcher`, `test-writer` |
| `dev-planner` | `dev_plan_summary.json` | `code-reviewer`, `orchestrator` |
| `ui-sketcher` | `ui_spec.json` | `code-reviewer`, `orchestrator` |
| `test-writer` | `test_report.json` | `orchestrator` |
| `code-reviewer` | `review_report.json` | `orchestrator` |
| `bug-analyzer` | `bug_report.json` | `test-writer`, `code-reviewer`, `orchestrator` |

---

## Standard Workflows

### Workflow A - New Feature

```text
story-generator
  -> feature_brief.json
  -> dev-planner -> dev_plan_summary.json
  -> ui-sketcher -> ui_spec.json
  -> [implementation happens outside the app]
  -> test-writer -> test_report.json
  -> code-reviewer -> review_report.json
```

Best for greenfield features, backlog grooming, and turning requirements into an implementation plan.

### Workflow B - Bug Fix

```text
bug-analyzer -> bug_report.json
test-writer  -> test_report.json
code-reviewer -> review_report.json
```

Best for production incidents, regressions, and hard-to-reproduce bugs.

### Workflow C - Code Review

```text
code-reviewer -> review_report.json
bug-analyzer  -> optional follow-up for critical issues
```

Best for pre-merge review, audits, and legacy code assessment.

### Workflow D - Requirements and Design

```text
story-generator -> feature_brief.json
dev-planner     -> dev_plan_summary.json
ui-sketcher     -> ui_spec.json
```

Best for early planning and design-focused discovery work.

Use `orchestrator` when you want the suite to guide the full workflow.

---

## Customizing Agents

Every agent lives in the `AGENTS` array inside `dev-agent-suite.html`.

### Agent object structure

```javascript
{
  id: 'story-generator',
  label: 'Story Generator',
  emoji: '...',
  color: '#7c6af7',
  model: 'claude-sonnet-4-6',
  badge: 'spec',
  desc: 'Long description shown in the panel header',
  shortDesc: 'Short description shown in the sidebar',
  tags: ['tag1', 'tag2'],
  quickPrompts: ['Prompt 1', 'Prompt 2'],
  systemPrompt: `...`
}
```

To add a new agent:

1. Add a new object to `AGENTS`.
2. Pick a unique lowercase hyphenated `id`.
3. Choose a supported model such as `claude-sonnet-4-6` or `claude-opus-4-6`.
4. Define the output contract and expected JSON handoff.
5. Reload the page.

Current model strings used in this release:

```text
claude-opus-4-6
claude-sonnet-4-6
claude-haiku-4-5-20251001
```

Check [docs.anthropic.com/en/docs/about-claude/models/overview](https://docs.anthropic.com/en/docs/about-claude/models/overview) before changing model names.

---

## Provider State And API Keys

The app stores provider keys in `sessionStorage` when the active provider requires one:

```javascript
sessionStorage.setItem('das_gemini_key', keyValue);
sessionStorage.setItem('das_anthropic_key', keyValue);
const apiKey = sessionStorage.getItem('das_anthropic_key') || '';
```

Keys are not persisted across tabs or browser restarts. Anthropic requests use `x-api-key` plus `anthropic-dangerous-direct-browser-access`; Gemini requests call the Gemini Developer API with the selected key. Hosted trial mode uses `das_trial_api_base` to remember the Worker base URL for the current browser session and does not store a provider key. In the current production build, the default Worker is `https://dev-agent-suite-trial.bouroguis.workers.dev`.

### Getting an API key

1. For Gemini free tier, go to [Google AI Studio](https://aistudio.google.com/apikey) and create a key.
2. For Anthropic, go to [console.anthropic.com](https://console.anthropic.com).
3. Create or sign in to your account.
4. Open **API Keys** and copy the provider key you want to use.
5. Skip this step entirely if you are using Hosted Trial.

### Cost notes

- `claude-sonnet-4-6` is used for the faster planning and authoring agents.
- `claude-opus-4-6` is used for the deeper review and debugging agents.
- Check [anthropic.com/pricing](https://anthropic.com/pricing) for current rates.

---

## Conversation Management

Each agent keeps its own in-memory conversation array for the current browser session.

```javascript
const convos = {};
AGENTS.forEach(a => { convos[a.id] = []; });
```

Messages are sent to the selected provider as a normalized `messages` array. Use the app's clear action to reset an agent's conversation. Reloading the page or closing the tab clears the session history.

---

## Error Handling

The `send()` function handles both HTTP failures and runtime failures.

```javascript
if (!res.ok) {
  const err = await res.json().catch(() => ({}));
  throw new Error(err?.error?.message || `HTTP ${res.status}`);
}

// Later in the same flow:
thinkEl.querySelector('.m-bubble').innerHTML =
  `<span style="color:#f0714a">Error: ${esc(err.message)}</span>`;
```

Common issues:

| Error | Cause | Fix |
|---|---|---|
| `401 Unauthorized` | Invalid or missing API key | Set the key again |
| `429 Too Many Requests` | Rate limiting | Wait and retry |
| `529 Overloaded` | Anthropic service load | Retry later |
| `HTTP 400` | Malformed or oversized request | Clear conversation and retry |
| `403 Origin not allowed` | Worker CORS allowlist mismatch | Update `ALLOWED_ORIGINS` in `cloudflare-trial/wrangler.jsonc` |

---

## Security Considerations

- Never hardcode or commit an API key.
- `esc()` escapes user-controlled text before DOM insertion.
- The app uses `sessionStorage`, not `localStorage`, for key handling.
- Runtime network calls target Anthropic, Gemini, or your configured Worker depending on the selected provider.
- Anthropic browser requests include `anthropic-dangerous-direct-browser-access` as documented by Anthropic.

---

## Browser Compatibility

The app expects:

- `fetch` with async/await support
- `sessionStorage`
- CSS custom properties
- Modern JavaScript features such as optional chaining

Recent Chrome, Edge, Firefox, and Safari versions should work.

---

## Running the Tests

Run the bundled suite from the release folder:

```bash
node tests_fixed.js
```

Current packaged suite: **220 tests** across 13 categories.

1. Release file inventory
2. App HTML structure
3. App model strings
4. App agent definitions
5. App security
6. App UI and behavior
7. App markdown renderer
8. App error handling
9. Landing page
10. Agent config files
11. `SCHEMAS.md`
12. Documentation quality
13. Cross-file consistency

No external dependencies are required. Exit code `0` means success and exit code `1` means one or more failures.

---

## File Structure

The core static bundle extracts into a single flat folder, and this workspace also includes an optional hosted-trial Worker:

```text
dev-agent-suite/
|-- index.html
|-- dev-agent-suite.html
|-- landing.html
|-- framework-finder/
|   |-- index.html
|   |-- app.js
|   `-- styles.css
|-- tests_fixed.js
|-- REPO_TRUTH_AUDIT.md
|-- README.md
|-- GUIDE.md
|-- SCHEMAS.md
|-- MONETIZATION_STRATEGY.md
|-- cloudflare-trial/
|   |-- README.md
|   |-- wrangler.jsonc
|   `-- src/index.js
|-- orchestrator.md
|-- story-generator.md
|-- dev-planner.md
|-- ui-sketcher.md
|-- test-writer.md
|-- code-reviewer.md
`-- bug-analyzer.md
```

---

## Deployment

### Local use

Open `index.html` for the landing flow, `dev-agent-suite.html` for the app, or `framework-finder/index.html` for the companion tool. No server is required.

### GitHub Pages

1. Push the extracted folder contents to a repository.
2. Configure Pages to deploy from the branch root.
3. Visit `https://yourusername.github.io/repo-name/` for the landing page, `https://yourusername.github.io/repo-name/dev-agent-suite.html` for the app, or `https://yourusername.github.io/repo-name/framework-finder/` for the companion tool.

### Netlify / Vercel

Deploy the extracted release folder as a static site. In this repo, `index.html` already serves as the root entry point for Dev Agent Suite, while the companion stack selector lives at `/framework-finder/`.

### Cloudflare Workers AI hosted trial

1. Open `cloudflare-trial/wrangler.jsonc` and update `ALLOWED_ORIGINS`.
2. Run `npx wrangler login` if you are not already authenticated.
3. From `cloudflare-trial/`, run `npx wrangler dev --remote` for testing or `npx wrangler deploy` for production.
4. Open the static app with `?trial_api=https://your-worker.workers.dev`, or replace the default trial endpoint in `dev-agent-suite.html`, to route the `Hosted Trial` provider through your Worker.

### Any static host

Upload `dev-agent-suite.html` by itself if you only need the app, or upload the full extracted folder if you also want the landing page, companion framework selector, docs, and agent config files online.

---

## Changelog

### v1.0 (March 2026)

- Initial release
- 7 agents: `orchestrator`, `story-generator`, `dev-planner`, `ui-sketcher`, `test-writer`, `code-reviewer`, `bug-analyzer`
- Model strings: `claude-sonnet-4-6` and `claude-opus-4-6`
- Shared JSON handoff protocol across six schema files
- Workflow A, Workflow B, Workflow C, and Workflow D
- Flat static-site packaging plus optional `cloudflare-trial/` hosted-trial scaffold
- Bundled `tests_fixed.js` suite reporting 220 tests in the current package
- `anthropic-dangerous-direct-browser-access` header for direct browser API calls
- `sessionStorage`-based API key management
