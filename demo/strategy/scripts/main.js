// Wzorzec: Strategia
//
// http://adamczuk.net.pl/2012/02/10/wzorzec-projektowy-strategia/
// http://bumbu.ru/javascript-strategy-pattern/
// http://www.algorytm.org/wzorce-projektowe/strategia-strategy.html
// http://burczu-programator.pl/blog/wzorce-projektowe-w-javascript-strategia

class StrategyManager {
    constructor() {
        this._strategies = [];
    }

    addStrategy(name, handler) {
        this._strategies.push({ name, handler })
    }

    getStrategy(mission) {
        let strategyHandler = null;

        this._strategies.forEach(function (strategy) {
            if (strategy.name === mission.type) {
                strategyHandler = strategy.handler;
            }
        });

        return strategyHandler;
    }
}

let strategy;
let sm = new StrategyManager();

// Add a lot of strategies.
sm.addStrategy('device-a', () => console.log('A'));
sm.addStrategy('device-b', () => console.log('B'));

// Choose first strategy.
strategy = sm.getStrategy({ type: 'device-a' });
strategy();

// Choose second strategy.
strategy = sm.getStrategy({ type: 'device-b' });
strategy();

// Choose unsupported strategy.
strategy = sm.getStrategy({ type: 'device-c' });

try {
    strategy();
} catch (err) {
    console.error('Caught Error');
    console.error(err);
}
