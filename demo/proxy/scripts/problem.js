// Pattern: Proxy

console.log('%cFile: problem.js', 'color: red');

{
    class Request {
        static async makeRequest(url) {
            const response = await fetch(url);
            return response.json();
        }
    }

    async function main() {
        const url = 'https://fakes.piecioshka.io/videos';
        const data1 = await Request.makeRequest(url);
        console.log(data1);
        const data2 = await Request.makeRequest(url);
        console.log(data2);
    }

    main();

    // How to add Cache?
}
