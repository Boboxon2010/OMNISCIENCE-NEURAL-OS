/**
 * OMNISCIENCE NEURAL OS - TERMINAL ENGINE
 * The central AI-Human interface powered by Gemini 1.5 Pro.
 */

export class Terminal {
    constructor(mathEngine, chemistry, physics, storage) {
        this.mathEngine = mathEngine;
        this.chemistry = chemistry;
        this.physics = physics;
        this.storage = storage;
        this.output = document.getElementById('terminalOutput');
        this.input = document.getElementById('terminalInput');
    }

    initialize() {
        if (!this.input) return;

        this.input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && this.input.value.trim() !== '') {
                const cmd = this.input.value;
                this.input.value = '';
                await this.process(cmd);
            }
        });

        this.writeLog("Neural Terminal Online. System link established.", "cyan");
    }

    async process(command) {
        // 1. Foydalanuvchi buyrug'ini ko'rsatish
        this.writeLog(`> ${command}`, "white");
        this.storage.save('last_command', command);

        const lowerCmd = command.toLowerCase();

        // 2. Klassik qisqa buyruqlar
        if (lowerCmd === 'clear') {
            this.output.innerHTML = '';
            return;
        }

        if (lowerCmd === 'help') {
            this.writeLog(`
                Mavjud buyruqlar:
                - solve [ifoda]: Matematik masalani yechish
                - chem [modda1] + [modda2]: Kimyoviy tahlil
                - ai [savol]: Gemini bilan bevosita muloqot
                - status: Tizim holatini tekshirish
                - clear: Terminalni tozalash
            `, "gray");
            return;
        }

        // 3. Direct command parsing (allow users to call features directly)
        try {
            if (lowerCmd.startsWith('solve ')) {
                const expr = command.slice(6).trim();
                const res = await this.mathEngine.compute(expr, true);
                if (res.error) this.writeLog(`[ERR]: ${res.error}`, 'red');
                else this.writeLog(`[MATH]: Result: ${res.result}`, 'cyan');
                return;
            }

            if (lowerCmd.startsWith('plot ')) {
                // syntax: plot <expr> [xmin xmax step]
                const parts = command.slice(5).trim().split(/\s+/);
                const expr = parts.slice(0, parts.length).join(' ');
                // try parse numbers at end if provided
                const nums = expr.match(/(-?\d+(?:\.\d+)?)/g) || [];
                // fallback: call plotRangeFromArgs via mathEngine
                // simplest: call plot with default or UI values
                await this.mathEngine.plot();
                this.writeLog('[SYS]: Plot requested. See Math view.', 'orange');
                return;
            }

            if (lowerCmd.startsWith('chem ')) {
                // syntax: chem Na + H2O
                const rest = command.slice(5).replace('+', ' ').trim().split(/\s+/);
                const a = rest[0] || '';
                const b = rest[1] || '';
                const r = await this.chemistry.mixFromArgs(a, b);
                this.writeLog(`[CHEM]: ${r.message}`, 'orange');
                return;
            }

            if (lowerCmd.startsWith('ai ')) {
                const q = command.slice(3).trim();
                if (typeof window.aiQuery === 'function') {
                    const reply = await window.aiQuery(q);
                    this.writeLog(`[GEMINI]: ${reply}`, 'var(--glow)');
                    // If AI responds with a CALL token, try to execute
                    await this.processAICalls(reply);
                } else {
                    this.writeLog('[ERR]: AI offline.', 'red');
                }
                return;
            }

            // Fallback: send to AI for intent analysis
            this.writeLog('[AI]: Analyzing intent...', 'yellow');
            if (typeof window.aiQuery !== 'function') {
                this.writeLog('[ERR]: AI not available.', 'red');
                return;
            }

            const aiResponse = await window.aiQuery(`Sen OmniScience OS boshqaruvchisisan. Foydalanuvchi buyruq: ${command}. Qisqacha javob ber.`);
            this.writeLog(`[GEMINI]: ${aiResponse}`, 'var(--glow)');
            await this.processAICalls(aiResponse);

        } catch (error) {
            this.writeLog(`[ERR]: Processing failure. ${error.message}`, 'red');
            this.storage.save('terminal_error', error.message);
        }
    }

    /**
     * Look for special CALL tokens in AI response and execute allowed actions.
     * Expected format in AI response: ||CALL||:{"module":"math","method":"plotRangeFromArgs","args":["x^2", -10, 10, 0.2]}
     */
    async processAICalls(aiText) {
        if (!aiText || typeof aiText !== 'string') return;
        const marker = '||CALL||:';
        if (!aiText.includes(marker)) return;
        const part = aiText.split(marker)[1].trim();
        try {
            const callObj = JSON.parse(part);
            // allowed modules and methods
            const allowed = {
                math: ['compute','plotRangeFromArgs'],
                chemistry: ['mixFromArgs']
            };

            if (!allowed[callObj.module] || !allowed[callObj.module].includes(callObj.method)) {
                this.writeLog(`[SEC]: AI attempted disallowed call: ${callObj.module}.${callObj.method}`, 'red');
                return;
            }

            // dispatch
            if (callObj.module === 'math') {
                const res = await this.mathEngine[callObj.method].apply(this.mathEngine, callObj.args || []);
                this.writeLog(`[AUTO:${callObj.module}]: ${JSON.stringify(res)}`, 'green');
            }
            if (callObj.module === 'chemistry') {
                const res = await this.chemistry[callObj.method].apply(this.chemistry, callObj.args || []);
                this.writeLog(`[AUTO:${callObj.module}]: ${JSON.stringify(res)}`, 'green');
            }
        } catch (e) {
            this.writeLog(`[ERR]: Failed to process AI call: ${e.message}`, 'red');
        }
    }

    /**
     * Terminalga xabar yozish funksiyasi
     */
    writeLog(message, color = "silver") {
        const logEntry = document.createElement('div');
        logEntry.style.color = color;
        logEntry.style.marginBottom = "8px";
        logEntry.style.lineHeight = "1.4";
        logEntry.innerHTML = message.replace(/\n/g, '<br>');
        
        this.output.appendChild(logEntry);
        
        // Avtomatik pastga tushish animatsiyasi
        gsap.from(logEntry, { opacity: 0, x: -10, duration: 0.3 });
        this.output.scrollTop = this.output.scrollHeight;
    }
}