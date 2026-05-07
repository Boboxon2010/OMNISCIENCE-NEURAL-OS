export class UIManager {
constructor() {
this.initializeNavigation();
}
initializeNavigation() {
const buttons = document.querySelectorAll('.nav-btn');
buttons.forEach(button => {
button.addEventListener('click', () => {
document.querySelectorAll('.view').forEach(view => {
view.classList.remove('active');
});
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.classList.remove('active');
});
button.classList.add('active');
const target = button.dataset.view;
document.getElementById(target).classList.add('active');
8
gsap.from(`#${target}`, {
opacity: 0,
y: 20,
duration: 0.5
});
});
});
}
}
