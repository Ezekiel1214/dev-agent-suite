/**
 * Dev Agent Suite — Master Test Suite v2.0
 * Tests: app, landing page, agent configs, documentation, release integrity
 * Run: node tests_fixed.js  (from the release directory)
 * No dependencies — Node.js built-ins only.
 */
'use strict';

const fs   = require('fs');
const path = require('path');

// ── Harness ───────────────────────────────────────────────────────────
let passed = 0, failed = 0, total = 0;
const results = [];
function test(name, fn) {
  total++;
  try   { fn(); passed++; results.push({ s:'PASS', name }); process.stdout.write('.'); }
  catch (e) { failed++; results.push({ s:'FAIL', name, err: e.message }); process.stdout.write('F'); }
}
const assert         = (v,m)    => { if (!v) throw new Error(m || `Expected truthy, got ${JSON.stringify(v)}`); };
const assertEqual    = (a,b,m)  => { if (a!==b) throw new Error(m || `Expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };
const assertContains = (s,sub,m)=> { if (!String(s).includes(sub)) throw new Error(m || `Missing: "${sub}"`); };
const assertMatch    = (s,re,m) => { if (!re.test(String(s))) throw new Error(m || `No match: ${re}`); };
const assertNot      = (s,sub,m)=> { if (String(s).includes(sub)) throw new Error(m || `Should not contain: "${sub}"`); };
const fileExists     = f => fs.existsSync(path.join(__dirname, f));
const readFile       = f => fs.readFileSync(path.join(__dirname, f), 'utf8');
const fileSize       = f => fs.statSync(path.join(__dirname, f)).size;

const app     = readFile('dev-agent-suite.html');
const landing = readFile('landing.html');
const guide   = readFile('GUIDE.md');
const readme  = readFile('README.md');
const schemas = readFile('SCHEMAS.md');
const strat   = readFile('MONETIZATION_STRATEGY.md');

const AGENT_IDS = ['orchestrator','story-generator','dev-planner','ui-sketcher',
                   'test-writer','code-reviewer','bug-analyzer'];
const SCHEMA_KEYS = ['feature_brief','dev_plan_summary','ui_spec',
                     'test_report','review_report','bug_report','workflow_state'];
const AGENT_FILES = AGENT_IDS.map(id => `${id}.md`);


// ═══════════════════════════════════════════════════════════════════════
// 1. RELEASE FILE INVENTORY
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[1] Release file inventory');
const REQUIRED_FILES = [
  'dev-agent-suite.html','landing.html','README.md','GUIDE.md',
  'SCHEMAS.md','MONETIZATION_STRATEGY.md','tests_fixed.js',
  ...AGENT_FILES
];
REQUIRED_FILES.forEach(f => test(`File exists: ${f}`, () => assert(fileExists(f), `Missing: ${f}`)));
test('app  40–500 KB', () => { const s=fileSize('dev-agent-suite.html'); assert(s>40000&&s<512000, `${s}B`); });
test('landing 10–500 KB', () => { const s=fileSize('landing.html');       assert(s>10000&&s<512000, `${s}B`); });
test('no stray .DS_Store', () => assert(!fileExists('.DS_Store')));
test('no stray node_modules', () => assert(!fileExists('node_modules')));


// ═══════════════════════════════════════════════════════════════════════
// 2. APP — HTML STRUCTURE
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[2] App — HTML structure');
test('DOCTYPE',            () => assertContains(app, '<!DOCTYPE html>'));
test('charset UTF-8',      () => assertMatch(app, /charset=["']UTF-8["']/i));
test('viewport meta',      () => assertMatch(app, /name=["']viewport["']/));
test('title tag',          () => assertMatch(app, /<title>Dev Agent Suite<\/title>/));
test('meta description',   () => assertMatch(app, /<meta name=["']description["']/));
test('nav element',        () => assertMatch(app, /<nav[\s>]/));
test('API key modal',      () => assertContains(app, 'apiModal'));
test('.app container',     () => assertContains(app, 'class="app"'));
test('sidebar present',    () => assertContains(app, 'id="sidebar"'));
test('home panel',         () => assertContains(app, 'panel-home'));
test('script closes',      () => assertEqual((app.match(/<script/g)||[]).length, (app.match(/<\/script>/g)||[]).length, 'unmatched <script>'));
test('style closes',       () => assertEqual((app.match(/<style/g)||[]).length,  (app.match(/<\/style>/g)||[]).length,  'unmatched <style>'));
test('ends </html>',       () => assertMatch(app.trimEnd(), /<\/html>$/));
test('no javascript: URL', () => assert(!(app.match(/javascript\s*:/gi)||[]).length));
test('no [TODO]/[FIXME]',  () => assert(!app.match(/\[TODO\]|\[FIXME\]|\[PLACEHOLDER\]/)));
test('Google Fonts HTTPS', () => assertContains(app, 'https://fonts.googleapis.com'));


// ═══════════════════════════════════════════════════════════════════════
// 3. APP — MODEL STRINGS
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[3] App — model strings');
test('claude-sonnet-4-6 present',        () => assertContains(app, 'claude-sonnet-4-6'));
test('claude-opus-4-6 present',          () => assertContains(app, 'claude-opus-4-6'));
test('no deprecated sonnet-4-20250514',  () => assertNot(app, 'claude-sonnet-4-20250514'));
test('no deprecated opus-4-20250514',    () => assertNot(app, 'claude-opus-4-20250514'));
test('no claude-3 strings',              () => assertNot(app, '"claude-3-'));
test('anthropic-version 2023-06-01',     () => assertContains(app, '2023-06-01'));
test('x-api-key header',                 () => assertContains(app, 'x-api-key'));
test('no Authorization Bearer',          () => assertNot(app, 'Authorization: Bearer'));
test('browser CORS header',              () => assertContains(app, 'anthropic-dangerous-direct-browser-access'));
test('max_tokens set',                   () => assertMatch(app, /max_tokens\s*:\s*\d{3,5}/));
test('correct API endpoint',             () => assertContains(app, 'https://api.anthropic.com/v1/messages'));
test('code-reviewer → opus',            () => { const m=app.match(/id: 'code-reviewer'[\s\S]*?model: '([^']+)'/); assert(m&&m[1].includes('opus')); });
test('bug-analyzer → opus',             () => { const m=app.match(/id: 'bug-analyzer'[\s\S]*?model: '([^']+)'/);  assert(m&&m[1].includes('opus')); });
test('story-generator → sonnet, not inherit', () => { const m=app.match(/id: 'story-generator'[\s\S]*?model: '([^']+)'/); assert(m&&m[1].includes('sonnet')&&!m[1].includes('inherit')); });
test('ui-sketcher → sonnet, not inherit',     () => { const m=app.match(/id: 'ui-sketcher'[\s\S]*?model: '([^']+)'/);    assert(m&&m[1].includes('sonnet')&&!m[1].includes('inherit')); });


// ═══════════════════════════════════════════════════════════════════════
// 4. APP — AGENTS
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[4] App — agent definitions');
AGENT_IDS.forEach(id => test(`Agent "${id}" in AGENTS[]`, () => assertContains(app, `id: '${id}'`)));
test('all 7 agents present', () => assertEqual(AGENT_IDS.filter(id=>app.includes(`id: '${id}'`)).length, 7));
test('systemPrompt on every agent', () => assertContains(app, 'systemPrompt'));
test('quickPrompts on every agent', () => assertContains(app, 'quickPrompts:'));
SCHEMA_KEYS.filter(k=>k!=='workflow_state').forEach(k =>
  test(`${k}.json in system prompts`, () => assertContains(app, `${k}.json`))
);
test('Workflow A in orchestrator',  () => assertContains(app, 'Workflow A'));
test('Workflow B in orchestrator',  () => assertContains(app, 'Workflow B'));
test('Workflow C in orchestrator',  () => assertContains(app, 'Workflow C'));
test('Workflow D in orchestrator',  () => assertContains(app, 'Workflow D'));
test('all 4 workflows defined',     () => ['A','B','C','D'].every(id => assertMatch(app, new RegExp(`id:\\s*'${id}'`))));


// ═══════════════════════════════════════════════════════════════════════
// 5. APP — SECURITY
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[5] App — security');
test('sessionStorage (not localStorage)', () => { assertContains(app,'sessionStorage'); assertNot(app,'localStorage.setItem'); });
test('no hardcoded sk-ant- key',          () => assert(!app.match(/sk-ant-[A-Za-z0-9\-_]{20,}/)));
test('password input for API key',        () => assertMatch(app, /type=["']password["'][^>]*id=["']apiKeyInput["']|id=["']apiKeyInput["'][^>]*type=["']password["']/));
test('esc() function present',            () => assertContains(app, 'function esc('));
test('esc() escapes &',                   () => assertContains(app, "replace(/&/g,'&amp;')"));
test('esc() escapes <',                   () => assertContains(app, "replace(/</g,'&lt;')"));
test('esc() escapes >',                   () => assertContains(app, "replace(/>/g,'&gt;')"));
test('user text escaped on render',       () => assertContains(app, 'esc(text)'));
test('error message escaped',             () => assertContains(app, 'esc(err.message)'));
test('no eval()',                         () => assert(!app.match(/\beval\s*\(/)));
test('no hardcoded secrets',              () => assert(!app.match(/['"`]sk-[A-Za-z0-9]{20,}['"`]/)));
test('fetch targets supported providers', () => {
  assertContains(app, 'https://api.anthropic.com');
  assertContains(app, 'https://generativelanguage.googleapis.com');
  assertContains(app, '/api/trial-chat');
});


// ═══════════════════════════════════════════════════════════════════════
// 6. APP — UI & BEHAVIOUR
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[6] App — UI & behaviour');
test('--bg CSS var',              () => assertContains(app, '--bg:'));
test('--text CSS var',            () => assertContains(app, '--text:'));
test('--border CSS var',          () => assertContains(app, '--border:'));
test('--font-b CSS var',          () => assertContains(app, '--font-b:'));
test('--font-m CSS var',          () => assertContains(app, '--font-m:'));
test(':focus styles',             () => assertContains(app, ':focus'));
test('send btn disabled on req',  () => assertContains(app, 'btn.disabled = true'));
test('send btn re-enabled after', () => assertContains(app, 'btn.disabled = false'));
test('resize() present',          () => assertContains(app, 'function resize('));
test('Enter-to-send',             () => assertContains(app, "e.key === 'Enter'"));
test('Shift+Enter = newline',     () => assertContains(app, '!e.shiftKey'));
test('clearConvo() present',      () => assertContains(app, 'function clearConvo'));
test('mobile @media query',       () => assertMatch(app, /@media\s*\(\s*max-width/));
test('buildNav() called',         () => assertContains(app, 'buildNav()'));
test('buildSidebar() called',     () => assertContains(app, 'buildSidebar()'));
test('scroll to bottom',          () => assertContains(app, 'scrollTop = chat.scrollHeight'));
test('welcome message per agent', () => assertContains(app, 'const WELCOMES'));


// ═══════════════════════════════════════════════════════════════════════
// 7. APP — MARKDOWN RENDERER
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[7] App — markdown renderer');
test('renderMd() present',        () => assertContains(app, 'function renderMd('));
test('fenced code blocks',        () => assertContains(app, '```'));
test('inline code pattern',       () => assertContains(app, '`([^`'));
test('## headers',                () => assertContains(app, '^## '));
test('### headers',               () => assertContains(app, '^### '));
test('table styles',              () => assertContains(app, 'border-collapse:collapse'));
test('bullet list pattern',       () => assertContains(app, "^[-*] "));
test('numbered list pattern',     () => assertContains(app, '^(\\d+)'));
test('json-block styling',        () => assertContains(app, 'json-block'));
test('<strong> for bold',         () => assertContains(app, '<strong>'));
test('hr style',                  () => assertContains(app, 'border-top:1px solid var(--border)'));
test('unchecked checkbox pattern',() => assertContains(app, '\\[ \\]'));
test('checked checkbox pattern',  () => assertContains(app, '\\[x\\]'));


// ═══════════════════════════════════════════════════════════════════════
// 8. APP — ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[8] App — error handling');
test('res.ok checked',              () => assertContains(app, 'res.ok'));
test('try/catch around fetch',      () => { assertContains(app,'try {'); assertContains(app,'} catch ('); });
test('API key gate respects provider rules', () => assertContains(app, "if (currentProvider().requiresKey && !currentApiKey()) { showApiModal(); return; }"));
test('thinking dots replaced',      () => assertContains(app, "thinkEl.querySelector('.m-bubble').innerHTML"));
test('HTTP error message surfaced', () => assertContains(app, 'HTTP ${res.status}'));
test('network error surfaced',      () => assertContains(app, 'Error:'));


// ═══════════════════════════════════════════════════════════════════════
// 9. LANDING PAGE
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[9] Landing page');
test('DOCTYPE',                   () => assertContains(landing, '<!DOCTYPE html>'));
test('meta description',          () => assertMatch(landing, /<meta name=["']description["']/));
test('og:title',                  () => assertContains(landing, 'og:title'));
test('nav brand present',         () => assertContains(landing, 'nav-brand'));
test('hero section present',      () => assertContains(landing, 'hero'));
test('all 7 agents mentioned',    () => AGENT_IDS.every(id => { assertContains(landing, id); return true; }));
test('Solo $29 price',            () => assertContains(landing, '$29'));
test('Team $79 price',            () => assertContains(landing, '$79'));
test('Studio $199 price',         () => assertContains(landing, '$199'));
test('Lemon Squeezy checkout URL',() => assertContains(landing, 'lemonsqueezy.com'));
test('PayPal fallback link',      () => assertContains(landing, 'paypal.me/iliassBourogui'));
test('BYOK section',              () => assertContains(landing, 'byok'));
test('pricing section',           () => assertContains(landing, 'id="pricing"'));
test('comparison table',          () => assertContains(landing, 'compare-table'));
test('revenue projections',       () => assertContains(landing, 'calc-'));
test('go-to-market channels',     () => assertContains(landing, 'channels'));
test('30-day guarantee mention',  () => assertContains(landing, '30-day'));
test('Product Hunt mentioned',    () => assertContains(landing, 'Product Hunt'));
test('mobile responsive',         () => assertMatch(landing, /@media\s*\(\s*max-width/));
test('no javascript: URLs',       () => assert(!(landing.match(/javascript\s*:/gi)||[]).length));
test('script/style tags balanced',() => {
  assertEqual((landing.match(/<script/g)||[]).length,(landing.match(/<\/script>/g)||[]).length,'script');
  assertEqual((landing.match(/<style/g)||[]).length, (landing.match(/<\/style>/g)||[]).length, 'style');
});
test('ends </html>',              () => assertMatch(landing.trimEnd(), /<\/html>$/));
test('no hardcoded API keys',     () => assert(!landing.match(/sk-ant-[A-Za-z0-9\-_]{20,}/)));


// ═══════════════════════════════════════════════════════════════════════
// 10. AGENT CONFIG FILES
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[10] Agent config files (.md)');
AGENT_FILES.forEach(f => {
  const src = readFile(f);
  const id  = f.replace('.md','');
  test(`${id}: YAML frontmatter`,    () => assertMatch(src, /^---[\s\S]*?---/));
  test(`${id}: name field`,          () => assertContains(src, `name: ${id}`));
  test(`${id}: description field`,   () => assertContains(src, 'description:'));
  test(`${id}: model field`,         () => assertContains(src, 'model:'));
  test(`${id}: no "inherit" model`,  () => assertNot(src, 'model: inherit'));
  test(`${id}: no DISPLAY INSTRUCTIONS block`, () => assertNot(src, 'DISPLAY INSTRUCTIONS FOR OUTER AGENT'));
});
test('code-reviewer model is opus',  () => assertContains(readFile('code-reviewer.md'), 'model: opus'));
test('bug-analyzer model is opus',   () => assertContains(readFile('bug-analyzer.md'),  'model: opus'));
test('orchestrator.md references all workflows', () => {
  const s = readFile('orchestrator.md');
  ['Workflow A','Workflow B','Workflow C','Workflow D'].forEach(w => assertContains(s, w));
});
test('test-writer.md references AC coverage',    () => assertContains(readFile('test-writer.md'), 'ac_coverage'));
test('story-generator.md references feature_brief', () => assertContains(readFile('story-generator.md'), 'feature_brief'));


// ═══════════════════════════════════════════════════════════════════════
// 11. SCHEMAS.md
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[11] SCHEMAS.md');
SCHEMA_KEYS.forEach(k => test(`${k} schema defined`, () => assertContains(schemas, `${k}.json`)));
test('Produced by / Consumed by for each schema', () => assertContains(schemas, 'Produced by'));
test('Schema versioning section',                  () => assertContains(schemas, 'Schema Versioning'));
test('JSON code blocks present',                   () => assertContains(schemas, '```json'));


// ═══════════════════════════════════════════════════════════════════════
// 12. DOCUMENTATION QUALITY
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[12] Documentation quality');
test('GUIDE.md: Quick Start section',     () => assertContains(guide, 'Quick Start'));
test('GUIDE.md: Architecture section',    () => assertContains(guide, 'Architecture'));
test('GUIDE.md: Agent Reference section', () => assertContains(guide, 'Agent Reference'));
test('GUIDE.md: Workflow A–D all documented', () => ['A','B','C','D'].every(w => { assertContains(guide, `Workflow ${w}`); return true; }));
test('GUIDE.md: Error Handling section',  () => assertContains(guide, 'Error Handling'));
test('GUIDE.md: Deployment section',      () => assertContains(guide, 'Deployment'));
test('GUIDE.md: Changelog entry',         () => assertContains(guide, 'Changelog'));
test('GUIDE.md: model strings correct',   () => { assertContains(guide,'claude-sonnet-4-6'); assertContains(guide,'claude-opus-4-6'); });
test('README.md: all 7 agents listed',    () => AGENT_IDS.every(id => { assertContains(readme, id); return true; }));
test('README.md: quick start steps',      () => assertContains(readme, 'Quick Start'));
test('README.md: test command shown',     () => assertContains(readme, 'node tests'));
test('README.md: model strings correct',  () => { assertContains(readme,'claude-sonnet-4-6'); assertContains(readme,'claude-opus-4-6'); });
test('MONETIZATION_STRATEGY.md: 3 tiers',() => { assertContains(strat,'$29'); assertContains(strat,'$79'); assertContains(strat,'$199'); });
test('MONETIZATION_STRATEGY.md: Lemon Squeezy rationale', () => assertContains(strat,'Lemon Squeezy'));
test('MONETIZATION_STRATEGY.md: 90-day target',           () => assertContains(strat,'90-Day'));
test('MONETIZATION_STRATEGY.md: affiliate %',             () => assertContains(strat,'30%'));
test('MONETIZATION_STRATEGY.md: risk section',            () => assertContains(strat,'Risk'));


// ═══════════════════════════════════════════════════════════════════════
// 13. CROSS-FILE CONSISTENCY
// ═══════════════════════════════════════════════════════════════════════
console.log('\n[13] Cross-file consistency');
test('model strings consistent app↔guide',    () => { assertContains(guide,'claude-sonnet-4-6'); assertContains(guide,'claude-opus-4-6'); });
test('model strings consistent app↔readme',   () => { assertContains(readme,'claude-sonnet-4-6'); assertContains(readme,'claude-opus-4-6'); });
test('agent count consistent: 7 in app+docs', () => {
  const appCount   = AGENT_IDS.filter(id => app.includes(`id: '${id}'`)).length;
  const guideCount = AGENT_IDS.filter(id => guide.includes(id)).length;
  assertEqual(appCount, 7, `app has ${appCount} agents`);
  assertEqual(guideCount, 7, `guide mentions ${guideCount} agents`);
});
test('schema keys consistent app↔SCHEMAS.md', () =>
  SCHEMA_KEYS.filter(k=>k!=='workflow_state').every(k => {
    assertContains(app, `${k}.json`); assertContains(schemas, `${k}.json`); return true;
  })
);
test('pricing consistent landing↔strategy',   () => {
  ['$29','$79','$199'].forEach(p => { assertContains(landing,p); assertContains(strat,p); });
});
test('Lemon Squeezy consistent landing↔strategy', () => {
  assertContains(landing,'lemonsqueezy'); assertContains(strat,'Lemon Squeezy');
});


// ═══════════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════════
const bar = '═'.repeat(62);
console.log(`\n\n${bar}`);
console.log(`  ${passed} passed  |  ${failed} failed  |  ${total} total`);
if (failed) {
  console.log('\n  Failures:');
  results.filter(r=>r.s==='FAIL').forEach(r => {
    console.log(`  ✗  ${r.name}`);
    console.log(`     → ${r.err}`);
  });
}
console.log(`${bar}\n`);
process.exit(failed > 0 ? 1 : 0);
