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
9
constructor(storage) {
this.storage = storage;
this.elements = [
new ChemicalElement('Na', 'Sodium', 22.9, 'solid', '#ffd166'),
new ChemicalElement('H2O', 'Water', 18, 'liquid', '#00e5ff'),
new ChemicalElement('HCl', 'Hydrochloric Acid', 36.5, 'liquid',
'#ff2f6d'),
new ChemicalElement('NaOH', 'Sodium Hydroxide', 40, 'solid', '#9b5cff')
];
}
initialize() {
this.populateSelectors();
document.getElementById('mixBtn')
.addEventListener('click', () => this.mix());
document.getElementById('heatBtn')
.addEventListener('click', () => this.heat());
}
populateSelectors() {
const s1 = document.getElementById('element1');
const s2 = document.getElementById('element2');
this.elements.forEach(el => {
const option1 = new Option(el.symbol, el.symbol);
const option2 = new Option(el.symbol, el.symbol);
s1.add(option1);
s2.add(option2);
});
}
mix() {
const e1 = document.getElementById('element1').value;
const e2 = document.getElementById('element2').value;
const result = document.getElementById('reactionResult');
if ((e1 === 'Na' && e2 === 'H2O') ||
(e2 === 'Na' && e1 === 'H2O')) {
result.innerHTML = `
 <h3>Explosive Reaction</h3>
 <p>2Na + 2H2O → 2NaOH + H2</p>
 `;
gsap.to('.beaker', {
background: '#ff2f6d',
duration: 0.2,
repeat: 5,
yoyo: true
});
this.storage.appendHistory('Na + H2O reaction');
}
else {
result.innerHTML = '<p>No significant reaction.</p>';
}
}
heat() {
gsap.to('.beaker', {
boxShadow: '0 0 60px red',
duration: 1,
yoyo: true,
repeat: 1
});
}
}
