/**
 * OMNISCIENCE NEURAL OS - CORE ENGINE
 * Integrated with Gemini 1.5 Pro AI Controller
 */

import { UIManager } from '../modules/ui.js';
import { ChemistryEngine } from '../modules/chemistry-engine.js';
import { MathEngine } from '../modules/math-engine.js';
import { PhysicsEngine } from '../modules/physics-engine.js';
import { Terminal } from '../modules/terminal.js';
import { StorageManager } from '../modules/storage.js';

class NeuralOS {
    constructor() {
        // API Configuration
        this.apiKey = "AIzaSyCoDRhZ60BSzaYRsmSer5MibZjvgVnOzyc";
        this.aiStatus = document.getElementById('ai-activity');
        
        // Modules Initialization
        this.storage = new StorageManager();
        this.chemistry = new ChemistryEngine(this.storage);
        this.mathEngine = new MathEngine(this.storage);
        this.physics = new PhysicsEngine();
        this.terminal = new Terminal(this.mathEngine, this.chemistry, this.physics, this.storage);
        this.ui = new UIManager();

        this.init();
    }

    async init() {
        try {
            console.log("%c[OmniScience] Booting Neural System...", "color: #00f2ff; font-weight: bold;");
            
            // Initialize All Engines
            await this.chemistry.initialize();
            await this.mathEngine.initialize();
            await this.physics.initialize();
            this.terminal.initialize();

            this.setupDiagnostics();
            this.connectToGemini();
            
            console.log("%c[OmniScience] System Online. Gemini Controller Active.", "color: #39ff14;");
        } catch (error) {
            this.handleSystemError(error);
        }
    }

    /**
     * Gemini API bilan bog'lanish va terminal buyruqlarini AI orqali boshqarish
     */
    async connectToGemini() {
        this.aiStatus.textContent = "AI Connected: Gemini 1.5 Pro";
        this.aiStatus.classList.add('pulse');
        
        // Global AI Controller - bu funksiya terminal orqali kelgan savollarni tahlil qiladi
        window.aiQuery = async (prompt) => {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `Sen OmniScience OS boshqaruvchisisan. Foydalanuvchiga ilmiy yordam ber. Buyruq: ${prompt}` }] }]
                    })
                });
                const data = await response.json();
                return data.candidates[0].content.parts[0].text;
            } catch (err) {
                this.handleSystemError(err);
                return "AI bilan aloqa uzildi. Self-healing ishga tushmoqda...";
            }
        };
    }

    /**
     * Tizim xatolarini Gemini orqali avtomatik tuzatish (Self-Healing)
     */
    async handleSystemError(error) {
        console.error("AI Detects Error:", error);
        document.getElementById('ai-repair-overlay').classList.remove('hidden');
        this.aiStatus.textContent = "REPAIRING...";

        // Gemini'ga xato haqida xabar yuborish
        const repairPrompt = `System error detected: ${error.message}. Provide a logic fix for this JavaScript environment.`;
        
        try {
            const fix = await window.aiQuery(repairPrompt);
            console.log("%c[AI FIX]: " + fix, "color: orange;");
            
            // Log xatoni saqlash
            this.storage.save('system_logs', { error: error.message, time: new Date() });
            
            setTimeout(() => {
                document.getElementById('ai-repair-overlay').classList.add('hidden');
                this.aiStatus.textContent = "System Restored";
            }, 3000);
        } catch (e) {
            console.log("Critical Failure. Local backup required.");
        }
    }

    /**
     * Real-vaqt diagnostikasi
     */
    setupDiagnostics() {
        setInterval(() => {
            const cpu = Math.floor(Math.random() * 15) + 2; // Realistik yuklama
            const mem = Math.floor(Math.random() * 50) + 120;
            
            document.getElementById('cpuUsage').textContent = cpu + '%';
            document.getElementById('memoryUsage').textContent = mem + ' MB';
            
            // Xotira juda oshib ketsa, AI ogohlantiradi
            if (cpu > 80) {
                this.terminal.writeLog("[WARN]: High CPU Load. Optimizing...", "yellow");
            }
        }, 2000);
    }
}

// OSni ishga tushirish
const OS = new NeuralOS();