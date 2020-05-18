// Pattern: PubSub

console.log('%cFile: solution.js', 'color: green');

const channels = {};

function channel(name) {
    if (channels[name]) {
        return channels[name];
    }
    return channels[name] = {
        _listeners: [],
        on(cb) {
            this._listeners.push(cb);
        },
        emit(payload) {
            this._listeners.forEach(cb => cb(payload));
        }
    }
}

const publisher = channel('click');
const subscriber = (payload) => {
    console.log(payload.random);
};

publisher.on(subscriber);

publisher.emit({ random: Math.random() });
publisher.emit({ random: Math.random() });

const publisher2 = channel('click');
publisher2.emit({ random: Math.random() });