// Pattern: Strategy

console.log('%cFile: main.js', 'color: green');

{
    const sm = new Map();

    // Define strategies
    sm.set('mp4', () => console.log('handle mp4 file'));
    sm.set('mp3', () => console.log('handle mp3 file'));
    sm.set('jpg', () => console.log('handle jpg file'));

    // Choose strategy
    const format = 'mp4';
    const strategy = sm.get(format);

    try {
        strategy();
    } catch (err) {
        // what happen here?
        console.error('Caught Error', err);
    }
}
