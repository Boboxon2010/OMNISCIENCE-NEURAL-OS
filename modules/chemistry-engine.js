/**
 * OMNISCIENCE NEURAL OS - CHEMISTRY ENGINE PRO+
 * Powered by Gemini AI for Dynamic Chemical Reactions
 */

import { ELEMENTS } from './elements.js';

export class ChemistryEngine {
    constructor(storage) {
        this.storage = storage;
        this.isHeating = false;
        // Use generated element list
        this.elements = ELEMENTS;
    }

    initialize() {
        this.populateSelectors();
        this.setupEventListeners();
        console.log("[ChemistryEngine]: Ready and Neural Linked.");
    }

    setupEventListeners() {
        document.getElementById('mixBtn').addEventListener('click', () => this.mix());
        document.getElementById('heatBtn').addEventListener('click', () => this.heat());
    }

    populateSelectors() {
        const s1 = document.getElementById('element1');
        const s2 = document.getElementById('element2');
        if (!s1 || !s2) return;

        // Clear existing
        s1.innerHTML = '';
        s2.innerHTML = '';

        this.elements.forEach(el => {
            const label = `${el.symbol} - ${el.name}`;
            const opt1 = new Option(label, el.symbol);
            const opt2 = new Option(label, el.symbol);
            s1.add(opt1);
            s2.add(opt2);
        });

        // Set default selections if possible
        if (s1.options.length > 0) s1.selectedIndex = 0;
        if (s2.options.length > 1) s2.selectedIndex = 1;
    }

    /**
     * Reaksiyani Gemini orqali tahlil qilish (Dynamic Interaction)
     */
    async mix() {
        const el1 = document.getElementById('element1');
        const el2 = document.getElementById('element2');
        const e1 = el1 ? el1.value : null;
        const e2 = el2 ? el2.value : null;
        const resultDiv = document.getElementById('reactionResult');
        const liquid = document.getElementById('liquid');

        this.updateAIStatus(`Analyzing reaction: ${e1 || 'unknown'} + ${e2 || 'unknown'}...`);

        // Vizual aralashtirish animatsiyasi
        gsap.to(liquid, { 
            height: '80%', 
            backgroundColor: '#ffffff55', 
            duration: 0.5, 
            yoyo: true, 
            repeat: 1 
        });

        // Agar bu klassik portlash bo'lsa (Tezkor javob uchun)
        if ((e1 === 'Na' || e1 === 'K') && e2 === 'H2O') {
            this.triggerExplosion(e1, e2);
            return;
        }

        // Gemini AI orqali har qanday reaksiya tahlili
        try {
            const aiPrompt = `Kimyo reaksiyasini tahlil qil: ${e1} va ${e2} aralashsa nima bo'ladi? 
                             Faqat qisqa formula va natijani yoz. Portlash bo'lsa "EXPLOSION" so'zini qo'sh.`;
            
            const aiResponse = (typeof window.aiQuery === 'function') ? await window.aiQuery(aiPrompt) : 'Neural link offline.';
            resultDiv.innerHTML = `<div class="ai-res"><strong>AI Tahlili:</strong> ${aiResponse}</div>`;
            
            if (aiResponse.includes("EXPLOSION")) {
                this.triggerExplosion(e1, e2);
            }
            
            // StorageManager uses load/save
            const prev = (this.storage && typeof this.storage.load === 'function') ? (this.storage.load('expCount') || 0) : 0;
            if (this.storage && typeof this.storage.save === 'function') this.storage.save('expCount', prev + 1);
            // Update dashboard counter if present
            const expEl = document.getElementById('expCount');
            if (expEl) expEl.textContent = String(prev + 1);
            // Visual: color the liquid based on selected elements
            try {
                const elObj1 = this.elements.find(x => x.symbol === e1) || null;
                const elObj2 = this.elements.find(x => x.symbol === e2) || null;
                if (liquid) {
                    const c1 = elObj1 ? elObj1.color : 'rgba(0,242,255,0.6)';
                    const c2 = elObj2 ? elObj2.color : 'rgba(188,19,254,0.6)';
                    liquid.style.background = `linear-gradient(45deg, ${c1}, ${c2})`;
                }
            } catch {}

            // Play mix sound if available
            try { if (window.OS && window.OS.audio) window.OS.audio.play('mix', { volume: 0.6 }); } catch {}
        } catch (err) {
            resultDiv.innerHTML = `<p>Reaksiya noaniq. Tizim xatosi: ${err.message}</p>`;
        }
    }

    /**
     * Programmatic mix invocation (used by terminal or AI). Accepts symbols or names.
     */
    async mixFromArgs(a, b) {
        // try to set selectors if present
        const s1 = document.getElementById('element1');
        const s2 = document.getElementById('element2');
        if (s1) s1.value = a;
        if (s2) s2.value = b;
        // call standard mix
        await this.mix();
        return { ok: true, message: `Mix triggered: ${a} + ${b}` };
    }

    triggerExplosion(e1, e2) {
        const beaker = document.getElementById('beaker');
        const resultDiv = document.getElementById('reactionResult');

        resultDiv.innerHTML = `<h3 style="color:#ff2f6d">⚠️ DANGER: EXPLOSION!</h3>
                               <p>${e1} + ${e2} reaksiyasi juda faol!</p>`;

        // Flash effekti
        gsap.to(beaker, {
            boxShadow: '0 0 100px #ff2f6d, 0 0 40px #ff2f6d inset',
            backgroundColor: '#ff2f6d55',
            duration: 0.1,
            repeat: 10,
            yoyo: true,
            onComplete: () => {
                gsap.to(beaker, { boxShadow: '0 0 20px rgba(0,242,255,0.2)', backgroundColor: 'transparent' });
            }
        });

        // Kamera silkinishi (Screen Shake)
        gsap.fromTo('.workspace', { x: -10 }, { x: 10, duration: 0.05, repeat: 10, yoyo: true });
        
        this.updateAIStatus("CRITICAL: Exothermic Reaction Detected!");
        try { if (window.OS && window.OS.audio) window.OS.audio.play('explosion', { volume: 0.9 }); } catch {}
    }

    heat() {
        this.isHeating = !this.isHeating;
        const heatBtn = document.getElementById('heatBtn');
        const liquid = document.getElementById('liquid');

        if (this.isHeating) {
            heatBtn.classList.add('active-heat');
            gsap.to(liquid, { 
                backgroundColor: '#ff5f00', 
                duration: 2, 
                repeat: -1, 
                yoyo: true 
            });
            this.updateAIStatus("Heating in progress...");
        } else {
            heatBtn.classList.remove('active-heat');
            gsap.killTweensOf(liquid);
            this.updateAIStatus("System Cooled.");
        }
    }

    updateAIStatus(msg) {
        const aiStatus = document.getElementById('ai-activity');
        if (aiStatus) aiStatus.textContent = msg;
    }
}