/**
 * OMNISCIENCE NEURAL OS - SELF-EVOLVING CORE
 * Gemini 1.5 Pro AI Controller bilan to'liq integratsiya
 */

import { UIManager } from '../modules/ui.js';
import { ChemistryEngine } from '../modules/chemistry-engine.js';
import { MathEngine } from '../modules/math-engine.js';
import { PhysicsEngine } from '../modules/physics-engine.js';
import { Terminal } from '../modules/terminal.js';
import { StorageManager } from '../modules/storage.js';
import { AudioManager } from '../modules/audio.js';
import { ParticleSystem } from '../modules/particles.js';

class NeuralOS {
    constructor() {
        this.apiKey = "AIzaSyCoDRhZ60BSzaYRsmSer5MibZjvgVnOzyc";
        
        // Modullarni yaratish
    this.storage = new StorageManager();
        this.chemistry = new ChemistryEngine(this.storage);
        this.mathEngine = new MathEngine(this.storage);
        this.physics = new PhysicsEngine();
        this.terminal = new Terminal(this.mathEngine, this.chemistry, this.physics, this.storage);
        this.ui = new UIManager();
    this.audio = new AudioManager();
    this.particles = new ParticleSystem();

        // AI-ga kodni o'zgartirishga ruxsat berish
        this.allowSelfRewrite = true; 
        
        this.init();
    }

    async init() {
        try {
            console.log("%c[OmniScience] System Booting...", "color: #00f2ff; font-weight: bold;");
            
            // initialize functions may be synchronous; call without await when not returning promises
            if (typeof this.chemistry.initialize === 'function') this.chemistry.initialize();
            if (typeof this.mathEngine.initialize === 'function') this.mathEngine.initialize();
            if (typeof this.physics.initialize === 'function') this.physics.initialize();
            this.terminal.initialize();

            // Start particle background
            try { this.particles.start(); } catch (e) { console.warn('Particles failed:', e); }

            // Load audio assets (non-blocking)
            try {
                this.audio.loadAll([
                    ['mix', 'assets/sounds/mix.mp3'],
                    ['explosion', 'assets/sounds/explosion.mp3'],
                    ['click', 'assets/sounds/click.mp3']
                ]);
            } catch (e) { console.warn('Audio init failed:', e); }

            this.setupGlobalAI();
            this.startHealthCheck();

        } catch (error) {
            this.repairSystem(error, "initialization");
        }
    }

    /**
     * Gemini-ni tizim "superuser"i sifatida sozlash
     */
    setupGlobalAI() {
        window.aiQuery = async (prompt) => {
            const systemContext = `
                Siz OmniScience OS-ning yadrosiz. Sizga JavaScript kodini tiriklayin O'ZGARTIRISH ruxsati berildi.
                Agar foydalanuvchi xato haqida yozsa yoki tizim xato bersa, javobingizda faqat tushuntirish emas, 
                balki maxsus formatda tuzatishni yuboring:
                ||FIX_CODE||: [obyekt_nomi].[funksiya_nomi] = [yangi_funksiya_kodi]
            `;

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: systemContext + prompt }] }]
                    })
                });
                const data = await response.json();
                const aiText = data.candidates[0].content.parts[0].text;

                // Agar javobda FIX_CODE bo'lsa, uni bajarish
                if (aiText.includes("||FIX_CODE||")) {
                    this.applyLivePatch(aiText);
                }

                return aiText;
            } catch (err) {
                console.error("AI Aloqa xatosi:", err);
                return "Neural link offline.";
            }
        };
    }

    /**
     * KODNI TIRIKLAYIN O'ZGARTIRISH (The Core Magic)
     */
    applyLivePatch(patchCommand) {
        try {
            const codePart = patchCommand.split("||FIX_CODE||:")[1].trim();
            
            // Masalan: "this.chemistry.mix = function() { ... }"
            // Biz buni 'this' kontekstida eval qilamiz
            const rewriteLogic = new Function('os', `return os.${codePart}`);
            rewriteLogic(this);

            console.log("%c[AI REPAIR]: Kod muvaffaqiyatli yangilandi!", "color: #39ff14; font-weight: bold;");
            this.terminal.writeLog("[SYS]: AI tizim kodiga o'zgartirish kiritdi. Tuzatish muvaffaqiyatli.", "green");
            
            // Vizual bildirishnoma
            this.ui.updateAIActivity("System Self-Healed.");
        } catch (err) {
            console.error("AI tuzatish kiritishda xato qildi:", err);
        }
    }

    /**
     * Tizimni avtomatik diagnostika qilish
     */
    async repairSystem(error, source) {
        console.warn(`[DIAGNOSTICS]: Xato aniqlandi (${source}):`, error.message);
        
        this.ui.showRepairOverlay(true);
        this.ui.updateAIActivity("AI is rewriting corrupted logic...");

        const repairPrompt = `Tizimda xato chiqdi: "${error.message}". Manba: ${source}. 
        Iltimos, ushbu funksiyani tuzatish uchun ||FIX_CODE|| formatida JS kodini yubor.`;

        await window.aiQuery(repairPrompt);

        setTimeout(() => {
            this.ui.showRepairOverlay(false);
            this.ui.updateAIActivity("System Stabilized.");
        }, 2000);
    }

    startHealthCheck() {
        // CPU va Memory simulyatsiyasi (Dashboard uchun)
        setInterval(() => {
            document.getElementById('cpuUsage').textContent = (Math.random() * 5 + 1).toFixed(1) + '%';
            document.getElementById('memoryUsage').textContent = (Math.random() * 20 + 150).toFixed(0) + ' MB';
        }, 2000);
    }
}

// OS ishga tushirish
window.addEventListener('DOMContentLoaded', () => {
    window.OS = new NeuralOS();
});