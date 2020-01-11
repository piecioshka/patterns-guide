// Wzorzec: Fabryka
//
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript
// http://www.algorytm.org/wzorce-projektowe/metoda-wytworcza-factory-method.html

if (!Array.prototype.includes) {
    Array.prototype.includes = function (array, value) {
        return array.indexOf(value) !== -1;
    };
}

// -----------------------------------------------------------------------------

class ComputerFactory {
    constructor() {
        this._computerTypes = [];
    }

    addComputerType(type) {
        this._computerTypes.push(type);
    }

    createComputer(type) {
        if (!this._computerTypes.includes(type)) {
            return null;
        }

        return new Computer({ type });
    }
}

class Computer {
    constructor(options) {
        this.type = options.type;
    }
}

// -----------------------------------------------------------------------------

let computer;
let cf = new ComputerFactory();

// Append list of produces computers.
cf.addComputerType('notebook');
cf.addComputerType('pc');
cf.addComputerType('imac');

computer = cf.createComputer('notebook');
console.log(computer);

computer = cf.createComputer('macbook');
console.log(computer);
