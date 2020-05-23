// Pattern: Strategy

console.log('%cFile: problem.js', 'color: red');

{
    // Define handlers
    function handleMp4Files() {
        console.log('handle mp4 file');
    }

    function handleMp3Files() {
        console.log('handle mp3 file');
    }

    function handleJpgFiles() {
        console.log('handle jpg file');
    }

    // Choose strategy
    const format = 'mp4';

    if (format === 'mp4') {
        handleMp4Files();
    } else if (format === 'mp3') {
        handleMp3Files();
    } else if (format === 'jpg') {
        handleJpgFiles();
    } else {
        // what happen here?
        console.error('Caught Error: Unsupported format');
    }
}

// Problems
// 1. Violates "Open/Close Principle from SOLID"
//      - should be open to extend
//      - should be close to modification
