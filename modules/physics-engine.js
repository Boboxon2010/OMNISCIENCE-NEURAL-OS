export class PhysicsEngine {
	initialize() {
		const btn = document.getElementById('simulatePhysics');
		if (btn) btn.addEventListener('click', () => this.simulate());
	}

	simulate() {
		const massInput = document.getElementById('massInput');
		const forceInput = document.getElementById('forceInput');
		const resultEl = document.getElementById('physicsResult');

		const mass = massInput ? parseFloat(massInput.value) : NaN;
		const force = forceInput ? parseFloat(forceInput.value) : NaN;

		if (!isFinite(mass) || mass <= 0) {
			if (resultEl) resultEl.innerHTML = `<p class="error-text">Iltimos, massa uchun ijobiy son kiriting.</p>`;
			return;
		}
		if (!isFinite(force)) {
			if (resultEl) resultEl.innerHTML = `<p class="error-text">Iltimos, kuch uchun son kiriting.</p>`;
			return;
		}

		const acceleration = force / mass;
		if (resultEl) resultEl.innerHTML = `\n <p>Acceleration: ${acceleration.toFixed(2)} m/s²</p>\n `;

		// Animate object safely
		try {
			gsap.to('#physicsObject', {
				x: acceleration * 50,
				duration: 2,
				ease: 'power2.out'
			});
		} catch (e) { console.warn('Physics animation failed', e); }

		// play click sound if available
		try { if (window.OS && window.OS.audio) window.OS.audio.play('click', { volume: 0.4 }); } catch {}
	}

	/**
	 * Programmatic simulate: accepts force and mass (or an object) and returns computed values.
	 */
	simulateFromArgs(force, mass) {
		const f = Number(force);
		const m = Number(mass);
		if (!isFinite(f) || !isFinite(m) || m <= 0) return { error: 'Invalid args' };
		const a = f / m;
		const momentum = this.computeMomentum(m, a); // using a as velocity rough proxy (not literal)
		return { acceleration: a, momentum };
	}

	computeMomentum(mass, velocity) {
		return Number(mass) * Number(velocity);
	}

	computeKineticEnergy(mass, velocity) {
		return 0.5 * Number(mass) * Math.pow(Number(velocity), 2);
	}

	computePotentialEnergy(mass, height, g = 9.81) {
		return Number(mass) * Number(g) * Number(height);
	}
}
