/*
 * Simple AudioManager for OmniScience
 * Loads short sound effects and exposes play/stop methods.
 */
export class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.enabled = true;
    }

    async load(name, src) {
        try {
            const audio = new Audio(src);
            audio.preload = 'auto';
            // small convenience wrapper
            this.sounds.set(name, audio);
            return audio;
        } catch (err) {
            console.warn('[AudioManager] Failed to load', name, src, err);
            return null;
        }
    }

    async loadAll(list) {
        const promises = list.map(([name, src]) => this.load(name, src));
        await Promise.all(promises);
    }

    play(name, options = {}) {
        if (!this.enabled) return;
        const snd = this.sounds.get(name);
        if (!snd) return;

        // clone to allow overlapping sounds
        const audio = snd.cloneNode();
        if (options.loop) audio.loop = true;
        if (typeof options.volume === 'number') audio.volume = options.volume;
        audio.play().catch(() => {});
        return audio;
    }

    stop(name) {
        const snd = this.sounds.get(name);
        if (!snd) return;
        try { snd.pause(); snd.currentTime = 0; } catch {}
    }

    setEnabled(enabled) { this.enabled = !!enabled; }
}
