/**
 * OMNISCIENCE NEURAL OS - CHEMISTRY ENGINE PRO+
 * Powered by Gemini AI for Dynamic Chemical Reactions
 */

class ChemicalElement {
    constructor(symbol, name, mass, phase, color) {
        this.symbol = symbol;
        this.name = name;
        this.mass = mass;
        this.phase = phase;
        this.color = color;
    }
}

export class ChemistryEngine {
    constructor(storage) {
        this.storage = storage;
        this.isHeating = false;
        // Kengaytirilgan elementlar bazasi
        this.elements = [
            new ChemicalElement('Na', 'Sodium', 22.9, 'solid', '#ffd166'),
            new ChemicalElement('H2O', 'Water', 18, 'liquid', '#00e5ff'),
            new ChemicalElement('HCl', 'Hydrochloric Acid', 36.5, 'liquid', '#ff2f6d'),
            new ChemicalElement('NaOH', 'Sodium Hydroxide', 40, 'solid', '#9b5cff'),
            new ChemicalElement('K', 'Potassium', 39.1, 'solid', '#ff9ff3'),
            new ChemicalElement('H2SO4', 'Sulfuric Acid', 98, 'liquid', '#f1c40f')
        ];
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

        this.elements.forEach(el => {
            s1.add(new Option(`${el.symbol} - ${el.name}`, el.symbol));
            s2.add(new Option(`${el.symbol} - ${el.name}`, el.symbol));
        });
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
            
            const aiResponse = await window.aiQuery(aiPrompt);
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