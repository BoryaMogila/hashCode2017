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
            videos: []
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
        let videoObj = {id: video[0], economy: []};
        let cachesIds = Object.keys(endpoints[endpointId].caches);
        cachesIds.forEach((cacheId) => {
            let cache = {
                id: cacheId,
                ms: (endpoints[endpointId].dcLatency - endpoints[endpointId].caches[cacheId]) * video[2]
            };
            videoObj.economy.push(cache);


        });
        endpoints[endpointId].videos.push(videoObj)
    });
    endpoints.sort((a,b) => {
        return a.requests - b.requests;
    });
    endpoints.forEach((endpoint) => {
        endpoint.videos.forEach((video) => {
            video.economy.sort((a,b) => {
                return b.ms - a.ms;
            })
        });
        endpoint.videos.sort((a, b) => {
            return (b.economy[0] || {}).ms - (a.economy[0] || {}).ms;

        })
    });
    let hasPlace = true;
    let index = 0;
    let videoIndex = 0;
    let minSize = Math.min(...videoSizes);
    do{
        endpoints.forEach((endpoint) => {
            if(!endpoint.videos[index]) return;
            // console.log((endpoint.videos[index] || {}).economy[0]);
            // if()
            let cacheId = ((endpoint.videos[index] || {}).economy[0] || {}).id;
            let videoId = (endpoint.videos[index] || {}).id;
            if(caches[cacheId].limit && caches[cacheId].limit - videoSizes[videoId] && !caches[cacheId].videos.includes(videoId)){
                caches[cacheId].videos.push(videoId);
                caches[cacheId].limit = caches[cacheId].limit - videoSizes[videoId];
            }
            let maxLimit = 0;
            caches.forEach((cache) => {
                if(cache.limit > maxLimit){
                    maxLimit = cache.limit;
                }
            });
            console.log(minSize,  maxLimit);
            if(minSize > maxLimit){
                hasPlace = false;
            }
             index++;
        })
    } while (hasPlace);
    console.log('end');
    await fs.writeFileSync('./data.out', JSON.stringify(endpoints, null, '\t'));

    function saveData(cache) {
        let string = cache.length + '\n';

        for (let i in cache) {
            if(cache[i] && cache[i].videos){
                string += i + " " + cache[i].videos.join(" ") + '\n';
            }
        }
        return string;
    }

    var resStr = saveData(caches);
    console.log(resStr);

    await fs.writeFileSync('./me_at_the_zoo.out', resStr, 'utf8');
})();