export class Terminal {
constructor(mathEngine, chemistry, physics, storage) {
this.mathEngine = mathEngine;
this.chemistry = chemistry;
this.physics = physics;
this.storage = storage;
}
initialize() {
const input = document.getElementById('terminalInput');
input.addEventListener('keydown', e => {
if (e.key === 'Enter') {
this.process(input.value);
13
input.value = '';
}
});
}
process(command) {
const output = document.getElementById('terminalOutput');
output.innerHTML += `<div>> ${command}</div>`;
this.storage.appendHistory(command);
if (command.startsWith('solve')) {
const expression = command.replace('solve', '').trim();
try {
const result = math.evaluate(expression);
output.innerHTML += `<div>${result}</div>`;
}
catch {
output.innerHTML += `<div>Error</div>`;
}
}
else if (command === 'help') {
output.innerHTML += `
 <div>
 Commands:
 help
 solve
 plot
 chem
 physics
 </div>
 `;
}
else {
output.innerHTML += `<div>Unknown command</div>`;
}
output.scrollTop = output.scrollHeight;
}
}
