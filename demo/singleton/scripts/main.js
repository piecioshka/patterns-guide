// Wzorzec: Singleton
//
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript
// http://www.algorytm.org/wzorce-projektowe/singleton-singleton.html

class UniversumManager {
    constructor(name) {
        this.name = name;

        if (UniversumManager._instance) {
            return UniversumManager._instance;
        }

        UniversumManager._instance = this;
    }

    static getInstance() {
        return UniversumManager._instance;
    }

    getName() {
        return this.name;
    }
}

let um1 = new UniversumManager('Kakarotto');
let um2 = new UniversumManager('Vegeta');
let um3 = UniversumManager.getInstance();
let um4 = UniversumManager.getInstance();

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
