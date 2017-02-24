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
   
    await fs.writeFileSync('./data.out', JSON.stringify(endpoints, null, '\t'));





    
    let cache = [];
    cache[0] = {videos: [2]};
    cache[1] = {videos: [18,3,4]};
    cache[2] = {videos: [6,2,3]};


   

    function saveData(cache) {
        let string = cache.length + '\n';

        for (let i in cache) {
            if(cache[i] && cache[i].videos){
                string += i + " " + cache[i].videos.join(" ") + '\n';
            }
        }
        return string;
    }
    
    var resStr = saveData(cache);
    console.log(resStr);

    await fs.writeFileSync('.results_kittens.out', resStr, 'utf8');




























    /* random */
    function randomizeValues(cache_count, videos_count, server_size, devider) {
        var cache = [];
        var max_videos_per_cache = Math.floor(server_size / devider);
        for(var c =0; c < cache_count; c++){

            var videos = [];
            for (var v =0; v < max_videos_per_cache; v++){
                var video_id = Math.floor(Math.random() * videos_count);
                if(videos.indexOf(video_id) == -1){
                    videos.push(video_id);
                }
            }
            cache[c] = {videos};
        }
        return cache;
    }

    var iter = 0;
    await fs.writeFileSync('./out/' + iter +'/kitten.out', saveData(randomizeValues(500, 10000, 6000, 800)), 'utf8');
    await fs.writeFileSync('./out/' + iter +'/zoo.out', saveData(randomizeValues(10, 100, 100, 50)), 'utf8');
    await fs.writeFileSync('./out/' + iter +'/trend.out', saveData(randomizeValues(100, 10000, 50000, 900)), 'utf8');
    await fs.writeFileSync('./out/' + iter +'/videos.out', saveData(randomizeValues(100, 10000, 10000, 700)), 'utf8');

})();