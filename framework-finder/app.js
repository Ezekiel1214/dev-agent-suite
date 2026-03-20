const frameworkCatalog = {
  mern: {
    id: "mern",
    name: "MERN",
    accent: "#1f8f63",
    baseline: "Vite + React 19.2, Express 5, MongoDB 8.0",
    architecture: "Vite-powered React 19 frontend, Express 5 API, MongoDB 8.0 data layer",
    tagline: "Best when one JavaScript-first team wants speed, flexibility, and a modern Vite-based React workflow.",
    summary:
      "MERN stays compelling for startups that want one language, lightweight backend composition, and fast iteration without falling back to older CRA-era tooling.",
    idealFor: [
      "Lean product teams that want one hiring profile across the stack",
      "Realtime or collaborative apps using websockets and event-driven flows",
      "Fast-moving MVPs where schema flexibility helps early discovery"
    ],
    watchouts: [
      "Treat MERN as Vite + React in 2026 rather than a Create React App-style setup",
      "You will make more architectural decisions yourself as the app grows",
      "Content-heavy SEO experiences often need extra care compared with Next.js 16",
      "MongoDB flexibility can become inconsistent modeling if boundaries are weak"
    ],
    evidence:
      "React's official versions page is on 19.2, and MongoDB 8.0 is still receiving patch releases, including 8.0.20 on March 17, 2026.",
    tags: ["React 19.2", "Express 5", "MongoDB 8.0"],
    sources: [
      { label: "React versions", url: "https://react.dev/versions" },
      { label: "CRA deprecation and Vite guidance", url: "https://react.dev/blog/2025/02/14/sunsetting-create-react-app" },
      { label: "Express support policy", url: "https://expressjs.com/en/support/" },
      { label: "MongoDB 8.0 release notes", url: "https://www.mongodb.com/docs/manual/release-notes/8.0/" }
    ]
  },
  mean: {
    id: "mean",
    name: "MEAN",
    accent: "#c6504f",
    baseline: "Angular 21, Express 5, MongoDB 8.0",
    architecture: "Angular 21 frontend, Express 5 API, MongoDB 8.0 data layer",
    tagline: "Strong fit for structured teams that value conventions, TypeScript discipline, and Angular 21-era front-end architecture.",
    summary:
      "MEAN shines when Angular's opinionated structure, typed contracts, and enterprise-ready patterns help a larger team move predictably.",
    idealFor: [
      "Enterprise portals with role-heavy workflows and many shared UI patterns",
      "Teams already invested in Angular and TypeScript conventions",
      "Products that benefit from explicit architecture and front-end guardrails"
    ],
    watchouts: [
      "Angular adds more up-front structure and onboarding weight than React stacks",
      "SEO and marketing-led experiences are rarely its main advantage",
      "The talent pool is narrower than general React hiring in many markets"
    ],
    evidence:
      "Angular's support table shows 21.x as the active line, while MongoDB 8.0 continues to get current patch releases.",
    tags: ["Angular 21", "Express 5", "Enterprise-friendly"],
    sources: [
      { label: "Angular release schedule", url: "https://angular.dev/reference/releases" },
      { label: "Express support policy", url: "https://expressjs.com/en/support/" },
      { label: "MongoDB 8.0 release notes", url: "https://www.mongodb.com/docs/manual/release-notes/8.0/" }
    ]
  },
  nextFastApi: {
    id: "nextFastApi",
    name: "Next.js + FastAPI",
    accent: "#3567d6",
    baseline: "Next.js 16, FastAPI 0.135.1",
    architecture: "Next.js 16 app router, FastAPI 0.135.1 services, Postgres or Redis-backed APIs",
    tagline: "The modern hybrid choice for products that need top-tier UX, SEO, and Python-powered services.",
    summary:
      "This pairing balances a polished React web experience with a high-throughput Python backend, making it especially strong for AI-forward and content-aware products in 2026.",
    idealFor: [
      "AI products that need Python APIs, orchestration, or data pipelines",
      "Customer-facing apps where SEO and front-end performance matter",
      "Growth-stage platforms that want React velocity without giving up Python services"
    ],
    watchouts: [
      "You are coordinating two ecosystems, so platform boundaries should be intentional",
      "Auth and deployment design need clarity early to avoid duplicated logic",
      "For simple CRUD back offices, this can be more moving pieces than necessary"
    ],
    evidence:
      "Next.js 16 is in the official Active LTS line, and FastAPI's official release notes list 0.135.1 as the latest release.",
    tags: ["Next.js 16", "FastAPI 0.135.1", "SEO leader"],
    sources: [
      { label: "Next.js support policy", url: "https://nextjs.org/support-policy" },
      { label: "Next.js 16 release", url: "https://nextjs.org/blog/next-16" },
      { label: "FastAPI release notes", url: "https://fastapi.tiangolo.com/release-notes/" }
    ]
  },
  djangoReact: {
    id: "djangoReact",
    name: "Django + React",
    accent: "#9b6bd4",
    baseline: "Django 6.0.3, React 19.2",
    architecture: "Django 6.0.3 backend, Django admin/auth, React 19.2 client for rich product surfaces",
    tagline: "Best when your backend needs batteries included features, operational clarity, and strong data modeling from day one.",
    summary:
      "Django + React remains a dependable 2026 stack for admin-heavy, data-rich, and workflow-centric products that benefit from Django's mature foundations.",
    idealFor: [
      "Operational platforms with permissions, dashboards, forms, and internal tooling",
      "Marketplaces or back-office systems that need strong modeling and admin access",
      "Python-oriented teams that want mature auth, ORM, and background task patterns"
    ],
    watchouts: [
      "You still manage a separate React app if you want a highly dynamic front end",
      "Marketing-led rendering experiences are less seamless than full Next.js",
      "Teams that want a single-language stack may prefer JavaScript alternatives"
    ],
    evidence:
      "Django 6.0.3 shipped on March 3, 2026, and React's current official docs line remains 19.2.",
    tags: ["Django 6.0.3", "React 19.2", "Admin powerhouse"],
    sources: [
      { label: "Django 6.0 release notes", url: "https://docs.djangoproject.com/en/6.0/releases/6.0/" },
      { label: "Django 6.0.3 release notes", url: "https://docs.djangoproject.com/en/6.0/releases/6.0.3/" },
      { label: "React versions", url: "https://react.dev/versions" }
    ]
  }
};

const scoringRules = {
  projectType: {
    saas: {
      nextFastApi: { score: 32, reason: "handles polished product UX while keeping the backend ready for APIs and growth" },
      djangoReact: { score: 28, reason: "ships core business features quickly with strong auth, ORM, and admin foundations" },
      mern: { score: 24, reason: "moves fast for SaaS MVPs when the team wants one JavaScript stack" },
      mean: { score: 20, reason: "fits structured dashboard-heavy apps, especially with Angular teams" }
    },
    content: {
      nextFastApi: { score: 35, reason: "owns this lane with excellent rendering, caching, and SEO ergonomics" },
      djangoReact: { score: 24, reason: "works well when editorial workflows and admin tooling are just as important as the frontend" },
      mern: { score: 16, reason: "can work, but content-heavy rendering is not its sharpest edge" },
      mean: { score: 12, reason: "brings more application structure than most content products need" }
    },
    marketplace: {
      djangoReact: { score: 33, reason: "strong data models, admin surfaces, and role-based workflows fit marketplace operations" },
      nextFastApi: { score: 29, reason: "handles buyer-facing UX nicely while leaving room for Python services" },
      mern: { score: 22, reason: "supports flexible feature iteration, especially early in marketplace discovery" },
      mean: { score: 18, reason: "is workable, though less naturally aligned with marketplace velocity and SEO needs" }
    },
    internal: {
      djangoReact: { score: 32, reason: "wins on built-in admin, auth, and pragmatic business workflow tooling" },
      mean: { score: 28, reason: "fits internal enterprise dashboards with consistent front-end conventions" },
      nextFastApi: { score: 21, reason: "works when internal tools still need a polished React surface or Python services" },
      mern: { score: 18, reason: "is nimble, but gives you fewer built-in operational features" }
    },
    ai: {
      nextFastApi: { score: 36, reason: "pairs modern product UX with the strongest Python ecosystem for model and data work" },
      djangoReact: { score: 27, reason: "is solid when AI features sit inside a broader workflow-heavy platform" },
      mern: { score: 20, reason: "can integrate AI services well, especially if the team is firmly JavaScript-first" },
      mean: { score: 15, reason: "is dependable, though rarely the most natural fit for fast AI experimentation" }
    },
    enterprise: {
      mean: { score: 32, reason: "benefits from Angular structure, team conventions, and long-term maintainability patterns" },
      djangoReact: { score: 31, reason: "is mature, operationally clear, and excellent for complex back-office rules" },
      nextFastApi: { score: 24, reason: "works well when enterprise teams still need customer-grade frontend and Python APIs" },
      mern: { score: 16, reason: "offers flexibility, but less guardrail-heavy structure for large teams" }
    }
  },
  scale: {
    prototype: {
      mern: { score: 20, reason: "keeps the path to a prototype extremely light and flexible" },
      nextFastApi: { score: 18, reason: "gets you a polished prototype without much compromise on quality" },
      djangoReact: { score: 17, reason: "lets you stand up real business workflows surprisingly quickly" },
      mean: { score: 12, reason: "can feel heavier than needed at prototype stage" }
    },
    growth: {
      nextFastApi: { score: 24, reason: "balances product speed, performance, and service-oriented backend growth" },
      djangoReact: { score: 23, reason: "scales reliably for business systems with strong backend conventions" },
      mern: { score: 20, reason: "supports growth well when your architecture discipline stays strong" },
      mean: { score: 20, reason: "becomes valuable once a team wants a more formal front-end structure" }
    },
    global: {
      nextFastApi: { score: 27, reason: "supports high-performance web delivery with a capable API layer behind it" },
      djangoReact: { score: 26, reason: "excels when a larger operational surface needs consistency and governance" },
      mean: { score: 23, reason: "fits larger organizations that optimize for predictability and standards" },
      mern: { score: 18, reason: "can scale, but architecture consistency matters more as complexity rises" }
    }
  },
  language: {
    javascript: {
      mern: { score: 30, reason: "keeps one JavaScript or TypeScript mental model across the whole product" },
      mean: { score: 28, reason: "also stays in the TypeScript lane while adding more front-end structure" },
      nextFastApi: { score: 14, reason: "still works, but introduces Python just where you said you least want it" },
      djangoReact: { score: 10, reason: "is harder to justify if backend Python is not a team preference" }
    },
    balanced: {
      nextFastApi: { score: 21, reason: "benefits most when the team is free to choose Python where it adds leverage" },
      djangoReact: { score: 20, reason: "gains points because a mixed-language stack is acceptable" },
      mern: { score: 20, reason: "stays a practical choice if the app values simplicity over specialization" },
      mean: { score: 18, reason: "remains viable when process and structure matter as much as language" }
    },
    python: {
      djangoReact: { score: 31, reason: "leans fully into Python strengths for business logic, data models, and admin flows" },
      nextFastApi: { score: 30, reason: "is almost as strong thanks to FastAPI and the broader Python ecosystem" },
      mern: { score: 8, reason: "loses ground when backend Python is a firm preference" },
      mean: { score: 6, reason: "is rarely a first-choice path for Python-oriented teams" }
    }
  },
  priorities: {
    velocity: {
      mern: { score: 10, reason: "is excellent for quick iteration with minimal ceremony" },
      nextFastApi: { score: 10, reason: "moves fast while still delivering premium frontend polish" },
      djangoReact: { score: 9, reason: "wins time through built-in admin, auth, and ORM scaffolding" },
      mean: { score: 6, reason: "prefers structure over the lightest possible setup" }
    },
    seo: {
      nextFastApi: { score: 12, reason: "leads on rendering, caching, and customer-facing performance" },
      djangoReact: { score: 6, reason: "can support SEO needs, though not as seamlessly" },
      mern: { score: 4, reason: "needs more deliberate choices to match Next.js on SEO" },
      mean: { score: 3, reason: "rarely chosen for SEO-first product direction" }
    },
    admin: {
      djangoReact: { score: 14, reason: "has the clearest edge thanks to Django admin and mature auth patterns" },
      mean: { score: 8, reason: "benefits from structured forms and enterprise dashboard patterns" },
      nextFastApi: { score: 6, reason: "can do this well, but most admin features are still assembled by hand" },
      mern: { score: 4, reason: "relies more on custom implementation for operational tooling" }
    },
    enterprise: {
      mean: { score: 12, reason: "gains ground when explicit conventions and maintainability are prized" },
      djangoReact: { score: 11, reason: "pairs maturity and governance-friendly backend patterns well" },
      nextFastApi: { score: 8, reason: "remains solid, especially for enterprise customer products with modern UX" },
      mern: { score: 5, reason: "is powerful, but less inherently prescriptive for large organizations" }
    },
    realtime: {
      mern: { score: 11, reason: "pairs naturally with event-driven, websocket-heavy product experiences" },
      nextFastApi: { score: 9, reason: "supports realtime well while keeping the frontend modern and performant" },
      mean: { score: 7, reason: "can handle realtime patterns, especially in structured app environments" },
      djangoReact: { score: 6, reason: "works, but is not usually the sharpest tool for websocket-first UX" }
    },
    ai: {
      nextFastApi: { score: 14, reason: "gains a major edge from Python's AI, data, and serving ecosystem" },
      djangoReact: { score: 10, reason: "works well when AI is embedded in broader workflow-heavy systems" },
      mern: { score: 6, reason: "remains reasonable if AI features are mostly consumed via external APIs" },
      mean: { score: 4, reason: "is stable, though rarely the first stack teams reach for in AI-heavy work" }
    }
  }
};

const projectLabels = {
  saas: "SaaS platform",
  content: "content product",
  marketplace: "marketplace",
  internal: "internal tools",
  ai: "AI product",
  enterprise: "enterprise portal"
};

const scaleLabels = {
  prototype: "prototype-stage",
  growth: "growth-stage",
  global: "global-scale"
};

const languageLabels = {
  javascript: "JavaScript-first",
  balanced: "language-flexible",
  python: "Python-first"
};

const form = document.querySelector("#framework-form");
const resetButton = document.querySelector("#reset-button");
const winnerCard = document.querySelector("#winner-card");
const scoreboard = document.querySelector("#scoreboard");
const evidenceGrid = document.querySelector("#evidence-grid");
const frameworkCards = document.querySelector("#framework-cards");
const scenarioSummary = document.querySelector("#scenario-summary");

const defaultState = {
  projectType: "saas",
  scale: "growth",
  language: "balanced",
  priorities: ["velocity", "seo"]
};

function getState() {
  const formData = new FormData(form);
  return {
    projectType: formData.get("projectType"),
    scale: formData.get("scale"),
    language: formData.get("language"),
    priorities: formData.getAll("priority")
  };
}

function scoreState(state) {
  const totals = Object.values(frameworkCatalog).map((framework) => ({
    ...framework,
    score: 0,
    reasons: []
  }));

  const frameworkById = Object.fromEntries(totals.map((framework) => [framework.id, framework]));

  addRuleGroup(frameworkById, scoringRules.projectType[state.projectType]);
  addRuleGroup(frameworkById, scoringRules.scale[state.scale]);
  addRuleGroup(frameworkById, scoringRules.language[state.language]);

  state.priorities.forEach((priority) => {
    addRuleGroup(frameworkById, scoringRules.priorities[priority]);
  });

  return totals.sort((left, right) => right.score - left.score || left.name.localeCompare(right.name));
}

function addRuleGroup(frameworkById, group) {
  Object.entries(group).forEach(([frameworkId, contribution]) => {
    frameworkById[frameworkId].score += contribution.score;
    frameworkById[frameworkId].reasons.push(contribution.reason);
  });
}

function render() {
  const state = getState();
  const rankings = scoreState(state);
  const [winner, runnerUp] = rankings;
  const maxScore = Math.max(...rankings.map((framework) => framework.score), 1);

  scenarioSummary.textContent = `${projectLabels[state.projectType]}, ${scaleLabels[state.scale]}, ${languageLabels[state.language]}`;
  renderWinner(winner, runnerUp, state);
  renderScoreboard(rankings, maxScore);
  renderEvidencePanel(rankings);
  renderFrameworkCards(rankings);
}

function renderWinner(winner, runnerUp, state) {
  const priorities = state.priorities.length
    ? state.priorities.map(priorityLabel).join(", ")
    : "general-purpose balance";
  const lead = Math.max(winner.score - runnerUp.score, 0);
  const reasons = winner.reasons.slice(0, 3).map((reason) => `<li>${reason}</li>`).join("");
  const watchouts = winner.watchouts.slice(0, 3).map((item) => `<li>${item}</li>`).join("");

  winnerCard.innerHTML = `
    <article class="winner-card is-ready" style="--accent:${winner.accent}">
      <div class="winner-banner">
        <div class="winner-topline">
          <div>
            <p class="badge">Top recommendation</p>
            <h2 id="winner-title" class="winner-name">${winner.name}</h2>
          </div>
          <div class="winner-score">${winner.score} pts${lead ? ` | ${lead} ahead` : ""}</div>
        </div>
        <p class="winner-tagline">${winner.tagline}</p>
        <p class="winner-baseline">Current baseline: ${winner.baseline}</p>
        <p class="winner-architecture">${winner.architecture}</p>
      </div>
      <div class="winner-grid">
        <section class="winner-subcard">
          <h3>Why it wins</h3>
          <ul class="winner-list">${reasons}</ul>
        </section>
        <section class="winner-subcard">
          <h3>Watch for</h3>
          <ul class="winner-list">${watchouts}</ul>
        </section>
      </div>
      <section class="winner-subcard">
        <h3>Scenario fit</h3>
        <p class="score-copy">
          For a ${projectLabels[state.projectType]} at ${scaleLabels[state.scale]} with ${languageLabels[state.language]}
          preferences, this stack performs best when the team cares about ${priorities}.
        </p>
      </section>
    </article>
  `;
}

function renderScoreboard(rankings, maxScore) {
  scoreboard.innerHTML = rankings
    .map((framework, index) => {
      const percent = Math.round((framework.score / maxScore) * 100);
      return `
        <article class="score-row ${index === 0 ? "is-top" : ""}" style="--accent:${framework.accent}">
          <div class="score-row-header">
            <div>
              <div class="stack-name">${framework.name}</div>
              <div class="stack-baseline">${framework.baseline}</div>
            </div>
            <span class="stack-score">${framework.score} pts</span>
          </div>
          <div class="score-bar">
            <div class="score-fill" style="--score:${percent}"></div>
          </div>
          <p class="score-copy">${framework.summary}</p>
        </article>
      `;
    })
    .join("");
}

function renderFrameworkCards(rankings) {
  const winnerId = rankings[0]?.id;
  frameworkCards.innerHTML = rankings
    .map((framework) => {
      const idealFor = framework.idealFor.slice(0, 2).map((item) => `<li>${item}</li>`).join("");
      const tags = framework.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
      const sourceLinks = framework.sources
        .map(
          (source) => `
            <a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>
          `
        )
        .join("");
      return `
        <article class="framework-card ${framework.id === winnerId ? "is-highlighted" : ""}" style="--accent:${framework.accent}">
          <div class="detail-meta">
            <h3>${framework.name}</h3>
            <span class="stack-score">${framework.score} pts</span>
          </div>
          <div class="tag-row">${tags}</div>
          <p class="framework-baseline">Current baseline: ${framework.baseline}</p>
          <p>${framework.summary}</p>
          <p><strong>Architecture:</strong> ${framework.architecture}</p>
          <ul>${idealFor}</ul>
          <p class="framework-sources-label">Official references</p>
          <div class="source-list">
            ${sourceLinks}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderEvidencePanel(rankings) {
  evidenceGrid.innerHTML = rankings
    .map((framework) => {
      return `
        <article class="evidence-card" style="--accent:${framework.accent}">
          <div class="detail-meta">
            <h3>${framework.name}</h3>
            <span class="stack-score">Verified</span>
          </div>
          <p class="framework-baseline">Current baseline: ${framework.baseline}</p>
          <p class="score-copy">${framework.evidence}</p>
        </article>
      `;
    })
    .join("");
}

function priorityLabel(priority) {
  const labels = {
    velocity: "fast MVP delivery",
    seo: "SEO and front-end performance",
    admin: "built-in admin and auth",
    enterprise: "strong conventions",
    realtime: "realtime collaboration",
    ai: "AI and data services"
  };
  return labels[priority];
}

function resetForm() {
  form.reset();

  form.querySelector(`input[name="projectType"][value="${defaultState.projectType}"]`).checked = true;
  form.querySelector(`input[name="scale"][value="${defaultState.scale}"]`).checked = true;
  form.querySelector(`input[name="language"][value="${defaultState.language}"]`).checked = true;

  form.querySelectorAll('input[name="priority"]').forEach((input) => {
    input.checked = defaultState.priorities.includes(input.value);
  });

  render();
}

form.addEventListener("input", render);
resetButton.addEventListener("click", resetForm);

resetForm();
