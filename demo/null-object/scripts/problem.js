// Pattern: Null Object

console.log('%cFile: problem.js', 'color: red');

{
    class VideoPlayer {
        play() {
            console.log('VideoPlayer#play');
        }
    }

    class AudioPlayer {
        play() {
            console.log('AudioPlayer#play');
        }
    }

    let player = null;
    const format = 'mp3';

    switch (format) {
        case 'mp4':
            player = new VideoPlayer();
            player.play();
            break;
        case 'mp3':
            player = new AudioPlayer();
            player.play();
            break;
        default:
        // do nothing
    }
}
