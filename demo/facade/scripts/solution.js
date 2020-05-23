// Pattern: Facade

console.log('%cFile: solution.js', 'color: green');

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

    function handleMateusz() {
        makeThingA();
        makeThingB('tenis');
        makeThingC(55);
    }

    function handlePiotr() {
        makeThingA();
        makeThingB('kanapka');
        makeThingC(76);
    }

    const name = 'piotr';

    if (name === 'piotr') {
        handlePiotr();
    } else if (name === 'mateusz') {
        handleMateusz();
    }

}