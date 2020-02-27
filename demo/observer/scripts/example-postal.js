// Postal.js Syntax

{

    const channel1 = postal.channel('sumo');

    channel1.on(() => {
    });

    channel1.broadcast();

    // ---

    const channel1 = postal.channel('sumo.investigation.tab1');
    const channel2 = postal.channel('sumo.tracing.tab1');

    postal.on('sumo.#', (envelope) => {

    });

}
