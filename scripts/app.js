import { UIManager } from '../modules/ui.js';
import { ChemistryEngine } from '../modules/chemistry-engine.js';
import { MathEngine } from '../modules/math-engine.js';
import { PhysicsEngine } from '../modules/physics-engine.js';
import { Terminal } from '../modules/terminal.js';
import { StorageManager } from '../modules/storage.js';
7
const storage = new StorageManager();
const chemistry = new ChemistryEngine(storage);
const mathEngine = new MathEngine(storage);
const physics = new PhysicsEngine();
const terminal = new Terminal(mathEngine, chemistry, physics, storage);
new UIManager();
chemistry.initialize();
mathEngine.initialize();
physics.initialize();
terminal.initialize();
setInterval(() => {
document.getElementById('cpuUsage').textContent =
Math.floor(Math.random() * 100) + '%';
document.getElementById('memoryUsage').textContent =
Math.floor(Math.random() * 800) + ' MB';
}, 1000);
