// Pattern: Singleton

console.log('%cFile: main.js', 'color: green');

class UniversumManager {
    static _instance = null;

    constructor(name) {
        if (UniversumManager._instance) {
            return UniversumManager._instance;
        }

        this.name = name;
        UniversumManager._instance = this;
    }

    static getInstance() {
        return UniversumManager._instance;
    }

    getName() {
        return this.name;
    }
}

const um1 = new UniversumManager('Kakarotto');
const um2 = new UniversumManager('Vegeta');
const um3 = UniversumManager.getInstance();
const um4 = UniversumManager.getInstance();

console.log(um1 === um2);
console.log(um1 === um3);
console.log(um1 === um4);
console.log(um2 === um3);
console.log(um2 === um4);
console.log(um3 === um4);

console.log(um1.getName() === 'Kakarotto');
console.log(um2.getName() === 'Kakarotto');
console.log(um3.getName() === 'Kakarotto');
console.log(um4.getName() === 'Kakarotto');
