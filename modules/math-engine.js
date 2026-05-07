/**
 * OMNISCIENCE NEURAL OS - MATH ENGINE PRO+
 * Integrated with MathJS and Gemini for symbolic mathematics.
 */

export class MathEngine {
    constructor(storage) {
        this.storage = storage;
        this.chart = null;
        this.output = document.getElementById('mathOutput');
    }

    initialize() {
        const solveBtn = document.getElementById('solveBtn');
        const plotBtn = document.getElementById('plotBtn');
        if (solveBtn) solveBtn.addEventListener('click', () => this.solve());
        if (plotBtn) plotBtn.addEventListener('click', () => this.plot());
        const plotUpdate = document.getElementById('plotUpdateBtn');
        if (plotUpdate) plotUpdate.addEventListener('click', () => this.plotWithRange());
        console.log("[MathEngine]: Neural Computational Unit Online.");
    }

    /**
     * Compute a math expression programmatically. Returns result string and updates math output.
     * askAI: if true and window.aiQuery exists, asks AI for step-by-step explanation.
     */
    async compute(expression, askAI = true) {
        if (!expression) return { error: 'Empty expression' };
        try {
            const result = math.evaluate(expression);
            let explanation = null;
            if (askAI && typeof window.aiQuery === 'function') {
                try {
                    explanation = await window.aiQuery(`Matematik ifodani bosqichma-bosqich tushuntir: ${expression}. Natija: ${result}`);
                } catch (e) { explanation = null; }
            }

            if (this.output) {
                let resultHtml = '';
                try {
                    if (typeof katex !== 'undefined' && katex && katex.renderToString) {
                        resultHtml = katex.renderToString(String(result), { throwOnError: false });
                    } else {
                        resultHtml = `<pre style="white-space:pre-wrap">${String(result)}</pre>`;
                    }
                } catch (e) { resultHtml = `<pre>${String(result)}</pre>`; }

                this.output.innerHTML = `\n                <div class="math-card glass-card">\n                    <div class="result-header">Result:</div>\n                    <div class="result-body">${resultHtml}</div>\n                    <div class="step-explanation">${explanation || ''}</div>\n                </div>\n            `;
            }

            // persist
            if (this.storage && typeof this.storage.save === 'function') this.storage.save('last_math_result', result);
            return { result, explanation };
        } catch (err) {
            // try to ask AI for fix if available
            if (typeof window.aiQuery === 'function') {
                try {
                    const fix = await window.aiQuery(`Mana bu matematik ifodadagi xatoni tuzat: ${expression}. Faqat to'g'ri ifodani qaytar.`);
                    return { error: 'Invalid expression', suggestion: fix };
                } catch (e) { /* ignore */ }
            }
            return { error: err.message };
        }
    }

    /**
     * Plot with given expression and range. Returns status message.
     */
    async plotRangeFromArgs(expression, xMin = -10, xMax = 10, xStep = 0.2) {
        if (!expression) return { error: 'Empty expression' };
        // set DOM input so UI reflects
        const input = document.getElementById('mathInput');
        if (input) input.value = expression;

        try {
            this.plot(Number(xMin), Number(xMax), Number(xStep));
            return { ok: true, message: `Plotted ${expression} from ${xMin} to ${xMax} step ${xStep}` };
        } catch (err) {
            return { error: err.message };
        }
    }

    /**
     * Gemini va MathJS yordamida masalalarni yechish
     */
    async solve() {
        const input = (document.getElementById('mathInput') || {}).value || '';
        if (!input) return;

        this.updateAIStatus(`Processing formula: ${input}...`);
        const res = await this.compute(input, true);
        if (res.error) {
            if (this.output) this.output.innerHTML = `<p class="error-text">Error: ${res.error}${res.suggestion ? `<br>Suggestion: ${res.suggestion}` : ''}</p>`;
        }
    }

    /**
     * Plot with custom range inputs (xMin, xMax, xStep) and render values table
     */
    plotWithRange() {
        const xMin = parseFloat((document.getElementById('xMin') || {}).value) || -10;
        const xMax = parseFloat((document.getElementById('xMax') || {}).value) || 10;
        const xStep = parseFloat((document.getElementById('xStep') || {}).value) || 0.2;

        if (xStep <= 0) {
            if (this.output) this.output.innerHTML = `<p class="error-text">Step must be > 0</p>`;
            return;
        }

        this.plot(xMin, xMax, xStep);
    }

    /**
     * Neon uslubidagi professional grafiklar
     */
    // plot optionally accepts range args; defaults used when not provided
    plot(xMin = -10, xMax = 10, xStep = 0.2) {
        const expression = (document.getElementById('mathInput') || {}).value || '';
        if (!expression) {
            if (this.output) this.output.innerHTML = `<p class="error-text">Iltimos, chizilishi kerak bo'lgan ifodani kiriting.</p>`;
            return;
        }

        const canvas = document.getElementById('chart');
        if (!canvas) return;

        // Resize canvas to container size for Chart.js
        const container = canvas.parentElement;
        canvas.width = container ? container.clientWidth : 800;
        canvas.height = container ? Math.max(420, container.clientHeight) : 420;
        const ctx = canvas.getContext('2d');
        
        const xValues = [];
        const yValues = [];

        // generate x range using provided bounds
        for (let x = xMin; x <= xMax; x = Number((x + xStep).toFixed(10))) {
            xValues.push(x);
            try {
                const y = math.evaluate(expression, { x });
                yValues.push(typeof y === 'number' && isFinite(y) ? y : null);
            } catch {
                yValues.push(null);
            }
        }

        if (this.chart) this.chart.destroy();

        // Chart.js uchun Premium Neon Dizayn
        try {
            this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    label: `f(x) = ${expression}`,
                    data: yValues,
                    borderColor: '#00f2ff',
                    borderWidth: 3,
                    pointRadius: 0,
                    tension: 0.4, // Silliq chiziq (Spline)
                    fill: true,
                    backgroundColor: this.createGradient(ctx),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#8b949e', font: { family: 'Orbitron' } } }
                },
                scales: {
                    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8b949e' } },
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8b949e' } }
                }
            }
            });

            this.updateAIStatus(`Graph rendered for: ${expression}`);

            // render values table in mathOutput
            if (this.output) {
                const rows = xValues.slice(0, 200).map((x, i) => `<tr><td>${x}</td><td>${yValues[i] === null ? '—' : yValues[i]}</td></tr>`).join('');
                this.output.innerHTML = `<div class="math-card glass-card"><h4>Values (first ${Math.min(200,xValues.length)}):</h4><div style="max-height:200px;overflow:auto"><table style="width:100%;border-collapse:collapse"><thead><tr><th style="text-align:left">x</th><th style="text-align:left">f(x)</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
            }
        } catch (err) {
            console.error('Chart render failed', err);
            if (this.output) this.output.innerHTML = `<p class="error-text">Grafik chizishda xato: ${err.message}</p>`;
        }
    }

    createGradient(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 242, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');
        return gradient;
    }

    /**
     * Generate an AI image from prompt. Uses window.aiQuery and expects a URL or base64.
     */
    

    updateAIStatus(msg) {
        const aiStatus = document.getElementById('ai-activity');
        if (aiStatus) aiStatus.textContent = msg;
    }
}