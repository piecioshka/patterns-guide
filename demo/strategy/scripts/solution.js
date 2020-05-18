// Pattern: Strategy

console.log('%cFile: solution.js', 'color: green');

// strategies.js
const sm = new Map();

// strategies/handle-mp4.js
(sm => {
    const strategy = () => console.log('handle mp4 file');
    sm.set('mp4', strategy);
})(sm);

// strategies/handle-mp3.js
(sm => {
    const strategy = () => console.log('handle mp3 file');
    sm.set('mp3', strategy);
})(sm);

// strategies/handle-jpg.js
(sm => {
    const strategy = () => console.log('handle jpg file');
    sm.set('jpg', strategy);
})(sm);

(sm => {
    // Choose a strategy
    const format = 'mp4';
    const strategy = sm.get(format);

    try {
        strategy.call(null);
    } catch (err) {
        // what happen here?
        console.error('Caught Error', err);
    }
})(sm);
