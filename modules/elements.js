// Minimal elements dataset (common elements). For higher atomic numbers placeholders are generated.
export const BASE_ELEMENTS = [
    { symbol: 'H', name: 'Hydrogen', number: 1, mass: 1.008, phase: 'gas' },
    { symbol: 'He', name: 'Helium', number: 2, mass: 4.0026, phase: 'gas' },
    { symbol: 'Li', name: 'Lithium', number: 3, mass: 6.94, phase: 'solid' },
    { symbol: 'Be', name: 'Beryllium', number: 4, mass: 9.0122, phase: 'solid' },
    { symbol: 'B', name: 'Boron', number: 5, mass: 10.81, phase: 'solid' },
    { symbol: 'C', name: 'Carbon', number: 6, mass: 12.011, phase: 'solid' },
    { symbol: 'N', name: 'Nitrogen', number: 7, mass: 14.007, phase: 'gas' },
    { symbol: 'O', name: 'Oxygen', number: 8, mass: 15.999, phase: 'gas' },
    { symbol: 'F', name: 'Fluorine', number: 9, mass: 18.998, phase: 'gas' },
    { symbol: 'Ne', name: 'Neon', number: 10, mass: 20.180, phase: 'gas' },
    { symbol: 'Na', name: 'Sodium', number: 11, mass: 22.990, phase: 'solid' },
    { symbol: 'Mg', name: 'Magnesium', number: 12, mass: 24.305, phase: 'solid' },
    { symbol: 'Al', name: 'Aluminium', number: 13, mass: 26.982, phase: 'solid' },
    { symbol: 'Si', name: 'Silicon', number: 14, mass: 28.085, phase: 'solid' },
    { symbol: 'P', name: 'Phosphorus', number: 15, mass: 30.974, phase: 'solid' },
    { symbol: 'S', name: 'Sulfur', number: 16, mass: 32.06, phase: 'solid' },
    { symbol: 'Cl', name: 'Chlorine', number: 17, mass: 35.45, phase: 'gas' },
    { symbol: 'Ar', name: 'Argon', number: 18, mass: 39.948, phase: 'gas' },
    { symbol: 'K', name: 'Potassium', number: 19, mass: 39.098, phase: 'solid' },
    { symbol: 'Ca', name: 'Calcium', number: 20, mass: 40.078, phase: 'solid' },
    { symbol: 'Fe', name: 'Iron', number: 26, mass: 55.845, phase: 'solid' },
    { symbol: 'Cu', name: 'Copper', number: 29, mass: 63.546, phase: 'solid' },
    { symbol: 'Zn', name: 'Zinc', number: 30, mass: 65.38, phase: 'solid' },
    { symbol: 'Ag', name: 'Silver', number: 47, mass: 107.8682, phase: 'solid' },
    { symbol: 'Au', name: 'Gold', number: 79, mass: 196.96657, phase: 'solid' },
    { symbol: 'Pb', name: 'Lead', number: 82, mass: 207.2, phase: 'solid' }
];

// Generate placeholders up to 118 if needed and assign HSL-based color for visualization
export const ELEMENTS = (() => {
    const result = [];
    const max = 118;
    const baseByNumber = new Map(BASE_ELEMENTS.map(e => [e.number, e]));
    for (let n = 1; n <= max; n++) {
        const base = baseByNumber.get(n);
        if (base) {
            const hue = (n * 137) % 360;
            result.push({ ...base, color: `hsl(${hue} 80% 55%)` });
        } else {
            const symbol = `E${n}`;
            const name = `Element ${n}`;
            const hue = (n * 137) % 360;
            result.push({ symbol, name, number: n, mass: null, phase: 'unknown', color: `hsl(${hue} 70% 50%)` });
        }
    }
    return result;
})();
