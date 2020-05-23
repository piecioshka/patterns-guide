// Postal.js Syntax

{
    // Simple implementation of Postal.js. Full implementation is available here:
    // <https://github.com/postaljs/postal.js>
    const postal = {
        channel(name) {
            const channels = postal._channels || (postal._channels = []);
            return channels[name] = new class {
                on(cb) {
                    channels[name].subs = channels[name].subs || [];
                    channels[name].subs.push(cb);
                }
                broadcast() {
                    channels[name].subs.forEach((cb) => cb());
                }
            };
        }
    };

    const channel1 = postal.channel('sumo');

    channel1.on(() => {
        console.log('works');
    });

    channel1.broadcast();

    // ---

    const channel2 = postal.channel('sumo.investigation.tab1');
    const channel3 = postal.channel('sumo.tracing.tab1');

    postal.on('sumo.#', (envelope) => {

    });

}
