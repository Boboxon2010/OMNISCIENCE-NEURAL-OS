/**
 * OMNISCIENCE NEURAL OS - UI MANAGER
 * Handles navigation, smooth transitions, and real-time UI updates.
 */

export class UIManager {
    constructor() {
        this.initializeNavigation();
        this.initClock();
        this.setupParticleSystem();
    }

    /**
     * Navigatsiya va bo'limlar o'rtasidagi silliq o'tishlar
     */
    initializeNavigation() {
        const buttons = document.querySelectorAll('.nav-btn');
        const views = document.querySelectorAll('.view');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.view;

                // Agar hozirgi bo'lim bo'lsa, qayta yuklamaslik
                if (button.classList.contains('active')) return;

                // Aktiv klasslarni yangilash
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // View-larni almashtirish animatsiyasi
                this.transitionToView(target, views);
            });
        });
    }

    /**
     * GSAP orqali silliq o'tish animatsiyasi
     */
    transitionToView(targetId, views) {
        const currentView = document.querySelector('.view.active');
        const nextView = document.getElementById(targetId);

        // Chiqish animatsiyasi
        gsap.to(currentView, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            onComplete: () => {
                currentView.classList.remove('active');
                
                // Kirish animatsiyasi
                nextView.classList.add('active');
                gsap.fromTo(nextView, 
                    { opacity: 0, x: 20 }, 
                    { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
                );
            }
        });

        // AI statusini yangilash (Navigatsiyaga qarab)
        this.updateAIActivity(`Navigating to ${targetId.toUpperCase()}...`);
    }

    /**
     * AI faoliyati panelini yangilash
     */
    updateAIActivity(text) {
        const activityEl = document.getElementById('ai-activity');
        if (activityEl) {
            activityEl.textContent = text;
            gsap.fromTo(activityEl, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        }
    }

    /**
     * Real-vaqt soati (Dashboard uchun)
     */
    initClock() {
        const timeEl = document.getElementById('current-time');
        if (timeEl) {
            setInterval(() => {
                const now = new Date();
                timeEl.textContent = now.toLocaleTimeString('uz-UZ', { hour12: false });
            }, 1000);
        }
    }

    /**
     * Fon uchun zarralar (Particles) tizimi
     */
    setupParticleSystem() {
        // Bu yerda kelajakda murakkabroq Canvas animatsiyalari bo'lishi mumkin
        console.log("[UI]: Particle System initialized on background.");
    }

    /**
     * Tizim xatosi yuz berganda ekranni bloklash va AI ta'mirini ko'rsatish
     */
    showRepairOverlay(show = true) {
        const overlay = document.getElementById('ai-repair-overlay');
        if (show) {
            overlay.classList.remove('hidden');
            gsap.from(overlay, { opacity: 0, duration: 0.5 });
        } else {
            gsap.to(overlay, { opacity: 0, duration: 0.5, onComplete: () => overlay.classList.add('hidden') });
        }
    }
}