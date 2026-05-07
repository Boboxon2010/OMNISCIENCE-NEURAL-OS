// Lightweight particle background using canvas. Non-blocking and simple.
export class ParticleSystem {
	constructor(containerId = 'particles') {
		this.container = document.getElementById(containerId);
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.particles = [];
		this.raf = null;
		this.resizeHandler = this.resize.bind(this);
	}

	start() {
		if (!this.container) return;
		this.container.appendChild(this.canvas);
		this.resize();
		window.addEventListener('resize', this.resizeHandler);
		for (let i = 0; i < 40; i++) this.particles.push(this.createParticle());
		this.loop();
	}

	stop() {
		cancelAnimationFrame(this.raf);
		window.removeEventListener('resize', this.resizeHandler);
		if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
	}

	resize() {
		this.canvas.width = this.container.clientWidth || window.innerWidth;
		this.canvas.height = this.container.clientHeight || window.innerHeight;
	}

	createParticle() {
		return {
			x: Math.random() * this.canvas.width,
			y: Math.random() * this.canvas.height,
			r: Math.random() * 2 + 0.5,
			vx: (Math.random() - 0.5) * 0.2,
			vy: (Math.random() - 0.5) * 0.2,
			hue: Math.random() * 360
		};
	}

	loop() {
		this.raf = requestAnimationFrame(() => this.loop());
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (const p of this.particles) {
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < 0) p.x = this.canvas.width;
			if (p.x > this.canvas.width) p.x = 0;
			if (p.y < 0) p.y = this.canvas.height;
			if (p.y > this.canvas.height) p.y = 0;

			ctx.beginPath();
			ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.08)`;
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}

