# Repo Truth Audit

## Summary

This workspace is a static-site project centered on `Dev Agent Suite`, with a companion `framework-finder/` tool and an optional `cloudflare-trial/` Worker. It is not the FastAPI/Postgres/CrewAI/Langfuse platform described in the fabricated "AI Platform 2026" status report.

## Claimed Delivery That Is Not In This Repo

The pasted status report claimed a separate AI platform stack with artifacts such as:

- `backend/` and `frontend/` application directories
- `vectorstore/` and PostgreSQL/pgvector setup
- `docker-compose.yml` and backend `Dockerfile`
- FastAPI, Pydantic v2, CrewAI, Langfuse, MCP route files, and RAG services
- Deployment docs such as `docs/ARCHITECTURE.md`, `docs/MCP_SETUP.md`, and `docs/DEPLOYMENT.md`

None of those repo-tracked paths exist in this workspace.

## What Actually Exists

The repo contents are consistent with a browser-first product release:

- `landing.html` for the Dev Agent Suite marketing page
- `dev-agent-suite.html` for the main app
- `framework-finder/` for the companion stack selector
- `tests_fixed.js` for the Node.js validation suite
- `cloudflare-trial/` for the hosted trial Worker
- Markdown docs, schemas, monetization notes, and agent prompt files

Before this recovery work, the existing validation suite passed with `221 passed | 0 failed | 221 total`.

## Verified Routing Conflict

The Vercel metadata and public docs identify the site as `dev-agent-suite`, and the original root `index.html` redirected visitors to `landing.html`. At the same time, the working copy of `index.html` had been replaced with the in-progress Framework Finder UI, which created a product-identity mismatch at the site root.

## Recovery Decision

The recovery keeps both products while preserving Dev Agent Suite as the primary root experience:

- `/` remains aligned with Dev Agent Suite
- `/dev-agent-suite.html` remains the main app entry
- `/framework-finder/` now holds the companion stack selector
- Docs and launch materials now acknowledge both products without reframing the repo as a backend AI platform

## Out Of Scope

- Recreating the fabricated FastAPI/Postgres/CrewAI platform
- Validating the external demo URL from the pasted status report
- Adding new backend services, Docker assets, or database infrastructure
