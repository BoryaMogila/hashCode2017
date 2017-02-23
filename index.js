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
    let endpoints = [];
    for(let i = 0; i < config.endpoints; i++){
        endpoints[i] = {
            dcLatency: array[0].split(' ')[0],
            connections: Number(array[0].split(' ')[1]),
            cashes: {},
            videos: {1:3}
        };
        array.splice(0, 1);
        console.log(array[0]);
        let endpointArray = array.splice(0, endpoints[i].connections);
        console.log(endpointArray.length);
        endpointArray.forEach((string) => {
            let cache = string.split(' ');
            endpoints[i].cashes[cache[0]] = cache[1];
        });
    }
     console.log(array[0]);
    // console.log(endpoints.length);

    //console.log(endpoint);
    //await fs.writeFileSync('./data.out', array.join('\n'))
})();