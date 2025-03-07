// Pattern: Singleton

console.log('%cFile: solution.js', 'color: green');

{

    class UniversalManager {
        static _instance = null;

        constructor(name) {
            if (UniversalManager._instance) {
                return UniversalManager._instance;
            }

            this.name = name;
            UniversalManager._instance = this;
        }

        static getInstance() {
            return UniversalManager._instance;
        }

        getName() {
            return this.name;
        }
    }

    const um1 = new UniversalManager('Kakarotto');
    const um2 = new UniversalManager('Vegeta');
    const um3 = UniversalManager.getInstance();
    const um4 = UniversalManager.getInstance();

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

}
