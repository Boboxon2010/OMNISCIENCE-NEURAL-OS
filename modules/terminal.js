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

        // 3. AI Neural Processing (Gemini orqali)
        this.writeLog("[AI]: Analyzing intent...", "yellow");
        
        try {
            // Gemini'ga buyruqni yuborish
            const aiResponse = await window.aiQuery(`
                Sen OmniScience OS boshqaruvchisisan. Quyidagi buyruqni tahlil qil va javob ber. 
                Agar buyruq matematik bo'lsa, yechimini ber. 
                Agar ilmiy savol bo'lsa, tushuntir.
                Buyruq: ${command}
            `);

            this.writeLog(`[GEMINI]: ${aiResponse}`, "var(--glow)");

            // 4. Avtomatik harakatlar (Intent Detection)
            if (lowerCmd.includes('natriy') || lowerCmd.includes('suv') || lowerCmd.includes('reaksiya')) {
                this.writeLog("[SYS]: Chemistry module triggered by AI.", "orange");
                // Bu yerda Chemistry tabiga o'tish yoki simulyatsiyani boshlash mumkin
            }

            if (lowerCmd.includes('grafik') || lowerCmd.includes('chiz')) {
                this.writeLog("[SYS]: Plotting engine activated.", "orange");
            }

        } catch (error) {
            this.writeLog(`[ERR]: Neural link failure. ${error.message}`, "red");
            // Self-healing: Xato haqida log yozish
            this.storage.save('terminal_error', error.message);
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