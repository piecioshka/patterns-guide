// Pattern: Facade

console.log('%cFile: problem.js', 'color: red');

{
    function makeThingA() {
        console.log('make thing A happen...');
    }

    function makeThingB(thing) {
        console.log('make thing B happen...', thing);
    }

    function makeThingC(number) {
        console.log('make thing C happen...', number);
    }

    // --- logic

    const name = 'piotr';

    if (name === 'piotr') {
        makeThingA();
        makeThingB('kanapka');
        makeThingC(76);
    }

    if (name === 'mateusz') {
        makeThingA();
        makeThingB('tenis');
        makeThingC(55);
    }

}
