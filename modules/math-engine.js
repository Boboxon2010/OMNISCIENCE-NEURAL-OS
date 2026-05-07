export class MathEngine {
constructor(storage) {
this.storage = storage;
this.chart = null;
}
initialize() {
document.getElementById('solveBtn')
.addEventListener('click', () => this.solve());
document.getElementById('plotBtn')
.addEventListener('click', () => this.plot());
}
solve() {
const input = document.getElementById('mathInput').value;
try {
const result = math.evaluate(input);
document.getElementById('mathOutput').innerHTML =
`<h3>Result:</h3><p>${result}</p>`;
11
this.storage.appendHistory(input);
}
catch (err) {
document.getElementById('mathOutput').innerHTML =
`<p>${err.message}</p>`;
}
}
plot() {
const expression = document.getElementById('mathInput').value;
const ctx = document.getElementById('chart');
const xValues = [];
const yValues = [];
for (let x = -10; x <= 10; x += 0.5) {
xValues.push(x);
try {
yValues.push(math.evaluate(expression, { x }));
}
catch {
yValues.push(0);
}
}
if (this.chart) {
this.chart.destroy();
}
this.chart = new Chart(ctx, {
type: 'line',
data: {
labels: xValues,
datasets: [{
label: expression,
data: yValues
}]
}
});
}
}
