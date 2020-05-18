// Pattern: Null Object

console.log('%cFile: solution.js', 'color: green');

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

    class NullPlayer {
        play() {
            console.log('NullPlayer#play');
        }
    }

    const videos = {
        'mp4': VideoPlayer,
        'mp3': AudioPlayer,
        null: NullPlayer,
    };

    // Single
    // const format = null;
    // const player = new videos[format];
    // player.play();

    // Collection
    const formats = ['mp3', 'mp4', null];
    formats.forEach((format) => {
        const player = new videos[format];
        player.play();
    });

}