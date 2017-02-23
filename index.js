const fs = require('fs');
(async function dfd() {
    let text = await fs.readFileSync('./input/kittens.in', 'utf8');
    let array = text.split('\n');
    let input = array[0];
    let config = {};
    const configArray = array[0].split(' ');
    config.videos = configArray[0];
    config.endpoints = configArray[1];
    config.descriptions = configArray[2];
    config.caches = configArray[3];
    config.size = configArray[4];
    const videoSizes = array[1].split(' ');
    let endpoint = {
        dcLatency: array[2].split(' ')[0],
        connections: Number(array[2].split(' ')[1]),
        cashes: {}
    };
    array.splice(0, 3);
    let endpointArray = array.slice(0, endpoint.connections);
    console.log(endpointArray[0]);
    endpointArray.forEach((string) => {
        let cache = string.split(' ');
        endpoint.cashes[cache[0]] = cache[1];
    });
    let endpoints = [];
    for(let i = 0; i <= config.endpoints; i++){
        endpoints[i] = {
            dcLatency: array[2].split(' ')[0],
            connections: Number(array[2].split(' ')[1]),
            cashes: {}
        }
    }
    //console.log(endpoint);
    //await fs.writeFileSync('./data.out', array.join('\n'))
})();