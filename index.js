const fs = require('fs');
const trimEndpoints = require('./helpers/trimEndpoints');

(async function dfd() {
    let text = await fs.readFileSync('./input/me_at_the_zoo.in', 'utf8');
    let array = text.split('\n');
    let input = array[0];
    let config = {};
    const configArray = array[0].split(' ');
    config.videos = configArray[0];
    config.endpoints = configArray[1];
    config.descriptions = configArray[2];
    config.caches = configArray[3];
    config.size = configArray[4];
    let caches = [];
    for(let i = 0; i < config.caches; i++){
        caches.push({limit: config.size, videos: []})
    }
    const videoSizes = array[1].split(' ');
    let endpoints = [];
    array.splice(0, 2);
    for(let i = 0; i < config.endpoints; i++){
        endpoints[i] = {
            dcLatency: array[0].split(' ')[0],
            connections: Number(array[0].split(' ')[1]),
            requests: 0,
            caches: {},
            videos: {}
        };
        array.splice(0, 1);
        let endpointArray = array.splice(0, endpoints[i].connections);
        endpointArray.forEach((string) => {
            let cache = string.split(' ');
            endpoints[i].caches[cache[0]] = cache[1];
        });
    }
    array.forEach((string, index) => {
        if(array.length - 1  == index) return;
        let video = string.split(' ');
        let endpointId = video[1];
        endpoints[endpointId].requests += Number(video[2]);
        endpoints[endpointId].videos[video[0]] = {};
        endpoints[endpointId].videos[video[0]].economy = {};
        let cachesIds = Object.keys(endpoints[endpointId].caches);
        cachesIds.forEach((cacheId) => {
            endpoints[endpointId].videos[video[0]].economy[cacheId] = (endpoints[endpointId].dcLatency - endpoints[endpointId].caches[cacheId]) * video[2];
        });
    });
    endpoints.sort((a,b) => {
        return a.requests - b.requests;
    });
    endpoints.forEach((endpoint) => {
        endpoint.videos.sort((a, b) => {

        })
    });
    await fs.writeFileSync('./data.out', JSON.stringify(endpoints, null, '\t'));

    let cache = [];
    cache[0] = [2];
    cache[1] = [18,3,4];
    cache[2] = [6,2,3];

    /* output:

     //servers count
     // server_id - videos

    * 3
    * 0 2
    * 1 18 3 4
    * 2 6 23
    * */


    //console.log(endpoint);
    //await fs.writeFileSync('./data.out', array.join('\n'))
})();