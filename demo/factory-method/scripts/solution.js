// Pattern: Factory Method

console.log('%cFile: solution.js', 'color: green');

{

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
    const cf = new ComputerFactory();

    // Append list of produces computers.
    cf.addComputerType('notebook');
    cf.addComputerType('pc');

    computer = cf.createComputer('notebook');
    console.log(computer); // Computer {type: "notebook"}

    computer = cf.createComputer('macbook');
    console.log(computer); // null

}
