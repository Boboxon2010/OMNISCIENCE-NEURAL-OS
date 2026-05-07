OmniScience - Local Development & Smoke Tests

Quick start

1) Serve the project locally (recommended):

PowerShell example using `serve` (npm):

npx serve -s . -l 5000

Open http://localhost:5000 in your browser.

If you use VSCode, you can also use Live Server.

What this app includes

- Math view: MathJS-based evaluator + Chart.js plots. KaTeX rendering used for nicer math output when KaTeX is loaded.
- Chemistry view: Element palette (elements 1..118 generated), beaker visualization, mixing simulation with visual color blending.
- Physics view: Simple physics simulation, utilities for momentum/kinetic/potential energy, and terminal integration.
- Terminal: Chat-like interface. Commands: `solve`, `plot`, `plotrange`, `chem`, `physics simulate`, `ai`, `help`, `clear`.
- Fallbacks: If a generative AI (window.aiQuery) is offline, the terminal provides simple local responses; AI CALL tokens (||CALL||:JSON) can trigger safe method calls.

Smoke test (quick manual)

1) Start the app (see Quick start).
2) Open the Developer Tools (Console) in the browser after the page loads.
3) Run the smoke test script by pasting the following in console:

fetch('scripts/smoke-test.js').then(r=>r.text()).then(eval).then(() => runSmokeTest());

The script will run a few checks and print PASS/FAIL results for core flows (module presence, math compute, chemistry selectors, physics simulate).

Notes & Next steps

- The project is intentionally modular: see `modules/` for engines and `scripts/app.js` for application bootstrap.
- If you want AI-backed features, host a secure server-side proxy for your AI key and set `window.aiQuery` accordingly from that server.
- If you'd like, I can add automated headless tests (Node + Puppeteer) or a small Express proxy for AI integration.

Contact / Iteration

If you want additional features (3D lab models, full formula database, or interactive physics timelines), tell me which one to prioritize and I will implement the next steps.
