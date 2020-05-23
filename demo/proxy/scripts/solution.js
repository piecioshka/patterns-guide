// Pattern: Proxy

console.log('%cFile: solution.js', 'color: green');

{
    class RequestWithCache {
        static cache = new Map();

        static async makeRequest(url) {
            let response = RequestWithCache.cache.get(url);

            if (!response) {
                response = await Request.makeRequest(url);
                RequestWithCache.cache.set(url, response);
            }

            return response;
        }
    }

    class Request {
        static async makeRequest(url) {
            const response = await fetch(url);
            return response.json();
        }
    }

    async function main() {
        const url = 'https://fakes.herokuapp.com/videos';
        const data1 = await RequestWithCache.makeRequest(url);
        console.log(data1);
        const data2 = await RequestWithCache.makeRequest(url);
        console.log(data2);
    }

    main();
}
