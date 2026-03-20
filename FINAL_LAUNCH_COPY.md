# Dev Agent Suite Final Launch Copy

Prepared March 18, 2026.

Use this file for the exact public-facing copy. `LAUNCH_KIT.md` is the broader strategy document. This file is the polished posting script.

Repo note: `framework-finder/` is a companion experience in this workspace. Keep the public copy here focused on Dev Agent Suite unless you intentionally want to promote the companion tool too.

## Product Hunt

### Name

`Dev Agent Suite`

### Tagline

`7 AI dev agents in one HTML file with hosted trial and BYOK`

### Description

`A browser-first AI dev toolkit for stories, planning, wireframes, tests, code review, and bug analysis. Start with the hosted trial or switch to Gemini Free / Anthropic.`

### Why It Matters

```text
Dev Agent Suite is built for the work around coding, not just code generation.

Instead of one general assistant, it gives you 7 purpose-built agents:
- orchestrator
- story generator
- dev planner
- UI sketcher
- test writer
- code reviewer
- bug analyzer

What makes it different:
- the main app is a single HTML file
- there is a live hosted trial
- users can switch to Gemini Free or Anthropic BYOK
- outputs are structured so workflows chain cleanly across agents

The goal is simple: go from requirements to implementation plan, tests, review, and root-cause analysis in one browser-first workflow.
```

### Maker Comment

```text
Hi Product Hunt - I built Dev Agent Suite because most AI dev tools are strong at generating code, but weak at everything around it.

I wanted a browser-first tool that helps with the whole workflow:
- turn rough ideas into stories
- break them into a real dev plan
- sketch the UI
- generate test coverage
- review code
- analyze bugs

The part I am most excited about is the workflow chaining.
Each agent has a clear job, and the suite passes structured output between them instead of forcing you to constantly rewrite context by hand.

A few details:
- the app runs as a single HTML file
- there is a hosted trial live now
- users can also switch to Gemini Free or Anthropic BYOK
- the project includes a bundled validation suite and the repo is public
- the repo also contains a companion Framework Finder at `/framework-finder/`

If you try it, I would especially love feedback on:
1. which agent or workflow feels most useful in real work
2. whether the hosted trial removes enough setup friction

Live app: https://dev-agent-suite.vercel.app/dev-agent-suite.html
Companion tool: https://dev-agent-suite.vercel.app/framework-finder/
Repo: https://github.com/Ezekiel1214/dev-agent-suite
```

### Gallery Captions

Use these under screenshots or clips:

1. `Start with the hosted trial, then switch to Gemini Free or Anthropic if you want direct provider control.`
2. `The Orchestrator connects all 7 agents into reusable development workflows.`
3. `Turn a rough idea into structured stories, plans, and UI wireframes in one flow.`
4. `Generate test coverage and review outputs instead of relying on codegen alone.`
5. `Debug production issues with a dedicated bug-analysis workflow.`

### Product Hunt FAQ Answers

Suggested answer for `How is this different from Copilot or Cursor?`

```text
Copilot and Cursor are excellent coding tools, but they are mostly optimized for code generation and inline editing.

Dev Agent Suite is designed around the broader workflow:
requirements -> plan -> wireframes -> tests -> review -> debugging.

It is also packaged very differently:
- browser-first
- one HTML app
- hosted trial available
- optional Gemini Free / Anthropic BYOK
```

Suggested answer for `Why one HTML file?`

```text
I wanted the app to feel lightweight, portable, and inspectable.

A single-file app makes it easy to try, share, archive, and self-host without a build pipeline. It also keeps the product honest: the core value has to come from the prompts, the workflows, and the handoff design.
```

## Hacker News

### Title

`Show HN: Dev Agent Suite - 7 AI dev agents in one HTML file`

### Submission URL

`https://dev-agent-suite.vercel.app`

### First Comment

Important:
- Post this in your own words if possible.
- HN explicitly warns against generated or AI-edited comments, so treat this as a polished draft to humanize before posting.

```text
I built this because most AI dev tools are optimized for writing code, but not for the workflow around it.

Dev Agent Suite is a browser-first toolkit with 7 agents:
- orchestrator
- story generator
- dev planner
- UI sketcher
- test writer
- code reviewer
- bug analyzer

The unusual part is the packaging and flow:
- the main app is one HTML file
- there is now a hosted trial, so people can test it without bringing a key first
- users can also switch to Gemini Free or Anthropic BYOK
- the agents hand off structured JSON outputs so the workflow can chain cleanly

The idea is to cover more than code generation:
requirements -> planning -> UI thinking -> tests -> review -> debugging

Live app:
https://dev-agent-suite.vercel.app/dev-agent-suite.html

GitHub:
https://github.com/Ezekiel1214/dev-agent-suite

Happy to answer questions about the architecture, the hosted trial Worker, or why I kept it browser-first instead of turning it into another full SaaS app.
```

### Prepared HN Replies

Reply if someone says `why not just use Copilot / Cursor?`

```text
That is the main comparison, and I do think those tools are great for inline coding.

What I felt was missing was the rest of the workflow: story generation, planning, UI thinking, explicit test coverage, structured code review, and root-cause analysis.

This is trying to be a workflow tool more than an autocomplete tool.
```

Reply if someone says `single HTML file sounds gimmicky`

```text
That is fair. For me the single-file constraint was useful because it forced the product to stay simple and portable.

If the value disappears when you remove the stack complexity, then the real value was never the workflow design. I wanted the opposite: the prompts and handoffs should still be useful even in a very lightweight package.
```

Reply if someone says `hosted trial will get abused`

```text
Yes, that is a real concern. The current hosted trial is intentionally minimal so people can try the product quickly.

The next hardening steps are rate limits and Turnstile. I wanted to remove onboarding friction first, then harden based on actual usage patterns.
```

Reply if someone asks `what does it cost to use`

```text
The hosted trial is live for quick testing.

After that, users can switch to Gemini Free or Anthropic BYOK. The product itself is positioned as a one-time purchase, and the ongoing model cost is mostly the user's own provider spend rather than a monthly seat subscription to me.
```

## X / Twitter

### Launch Post

```text
I shipped Dev Agent Suite: 7 AI dev agents in one HTML file.

It covers more than codegen:
requirements -> planning -> wireframes -> tests -> review -> bug analysis

It now has a hosted trial, and you can also switch to Gemini Free or Anthropic BYOK.

Live app: https://dev-agent-suite.vercel.app
Repo: https://github.com/Ezekiel1214/dev-agent-suite
```

### Thread

```text
1. I shipped Dev Agent Suite: 7 AI dev agents in one HTML file.

2. Most AI dev tools help with code generation, but not the rest of the workflow.

3. This one is built for:
stories -> planning -> UI sketching -> tests -> review -> bug analysis

4. There are 7 agents:
orchestrator, story generator, dev planner, UI sketcher, test writer, code reviewer, and bug analyzer.

5. The app now has a hosted trial, so you can try it without bringing a key first.

6. If you want direct provider control, you can switch to Gemini Free or Anthropic BYOK.

7. The workflow part is the interesting bit:
agents hand off structured outputs so you are not rewriting context every step.

8. Live app:
https://dev-agent-suite.vercel.app

9. Repo:
https://github.com/Ezekiel1214/dev-agent-suite

10. I would love sharp feedback from people building real products with AI.
```

## Short Bio Line

Use this if a platform asks `What is this?`

```text
Dev Agent Suite is a browser-first toolkit that bundles 7 AI development agents into one workflow, with a hosted trial and optional BYOK provider switching.
```
