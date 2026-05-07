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
        document.getElementById('solveBtn').addEventListener('click', () => this.solve());
        document.getElementById('plotBtn').addEventListener('click', () => this.plot());
        console.log("[MathEngine]: Neural Computational Unit Online.");
    }

    /**
     * Gemini va MathJS yordamida masalalarni yechish
     */
    async solve() {
        const input = document.getElementById('mathInput').value;
        if (!input) return;

        this.updateAIStatus(`Processing formula: ${input}...`);
        
        try {
            // 1. MathJS yordamida tezkor hisoblash (Algebraik/Sonli)
            const result = math.evaluate(input);
            
            // 2. Gemini orqali qadam-baqadam tushuntirish olish
            const aiExplanation = await window.aiQuery(
                `Matematik masalani qisqa qadamlarda tushuntir: ${input}. Natija: ${result}`
            );

            this.output.innerHTML = `
                <div class="math-card glass-card">
                    <div class="result-header">Result: ${result}</div>
                    <div class="step-explanation">${aiExplanation}</div>
                </div>
            `;
            
            this.storage.save('last_math_result', result);
        } catch (err) {
            // Self-healing: Agar xato bo'lsa, Gemini'dan to'g'ri formatni so'rash
            const fix = await window.aiQuery(`Mana bu matematik ifodadagi xatoni tuzat: ${input}. Faqat to'g'ri ifodani qaytar.`);
            this.output.innerHTML = `<p class="error-text">Xato! Balki demoqchisiz: <b>${fix}</b></p>`;
        }
    }

    /**
     * Neon uslubidagi professional grafiklar
     */
    plot() {
        const expression = document.getElementById('mathInput').value;
        const ctx = document.getElementById('chart').getContext('2d');
        
        const xValues = [];
        const yValues = [];

        // -10 dan 10 gacha bo'lgan nuqtalar
        for (let x = -10; x <= 10; x += 0.2) {
            xValues.push(x.toFixed(1));
            try {
                yValues.push(math.evaluate(expression, { x }));
            } catch {
                yValues.push(null); // Grafikda uzilishlar uchun
            }
        }

        if (this.chart) {
            this.chart.destroy();
        }

        // Chart.js uchun Premium Neon Dizayn
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
    }

    createGradient(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 242, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 242, 255, 0)');
        return gradient;
    }

    updateAIStatus(msg) {
        const aiStatus = document.getElementById('ai-activity');
        if (aiStatus) aiStatus.textContent = msg;
    }
}