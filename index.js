const fs = require('fs');
const trimEndpoints = require('./helpers/trimEndpoints');

(async function optimaseTraffic() {
    console.time('optimase');
    let text = await fs.readFileSync('./input/trending_today.in', 'utf8');
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
        caches.push({limit: Number(config.size), videos: []})
    }
    //console.log(caches);return
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
    let relations = {};
    let connectedCaches = [];
    array.forEach((string, index) => {
        if(array.length - 1  == index) return;
        let video = string.split(' ');
        let endpointId = video[1];
        //endpoints[endpointId].requests += Number(video[2]);
        //let videoObj = {id: video[0], economy: []};
        let cachesIds = Object.keys(endpoints[endpointId].caches);
        cachesIds.forEach((cacheId) => {
            let economy = (endpoints[endpointId].dcLatency - endpoints[endpointId].caches[cacheId]) * video[2];
            if(economy){
                let relationId = `${video[0]}${cacheId}`;
                if(!relations[relationId]){
                    relations[relationId] = {videoId: video[0], cacheId, economy};
                    if(!connectedCaches.includes(cacheId)) connectedCaches.push(cacheId);
                } else {
                    relations[relationId].economy += economy;
                }
            }
            // let cache = {
            //     id: cacheId,
            //     ms: (endpoints[endpointId].dcLatency - endpoints[endpointId].caches[cacheId]) * video[2]
            // };
            // videoObj.economy.push(cache);


        });
        //endpoints[endpointId].videos.push(videoObj)
    });
    let relationsArray = Object.values(relations);
    relationsArray.sort((a, b) => b.economy - a.economy);

    let videosFromRelations = [];
    relationsArray.forEach((relation) => {
        if(!videosFromRelations.includes(relation.videoId)) videosFromRelations.push(relation.videoId);
    });
    let hasPlace = true;
    let minSize = Math.min(...videoSizes);
    console.log('sort', videosFromRelations.length);
    do{
        let relationsArray = Object.values(relations);
        console.log(relationsArray.length);
        relationsArray.sort((a, b) => b.economy - a.economy);
        console.log('time');
        let checkedVideos = [];
        videosFromRelations.forEach(videoId => {
            let videoRelations = relationsArray.filter(relation => relation.videoId == videoId);
            //console.log('ffff');
            if(videoRelations.length){
                let {cacheId, videoId} = videoRelations[0];
                let size = Number(videoSizes[videoId]);
                if(caches[cacheId].limit > 0 && (caches[cacheId].limit - size) > 0 && !caches[cacheId].videos.includes(videoId)){
                    caches[cacheId].videos.push(videoId);
                    caches[cacheId].limit = caches[cacheId].limit - size;
                    checkedVideos.push(delete relations[`${videoId}${cacheId}`]);
                }
            }
        });
        console.log('ok');
        let maxLimit = 0;
        connectedCaches.forEach((cacheId) => {
            if(caches[cacheId].limit > maxLimit){
                maxLimit = caches[cacheId].limit;
            }
        });console.log(checkedVideos.length);
        if(!checkedVideos.length || !relationsArray.length || (minSize > maxLimit)){
            hasPlace = false;
        }
    }while (hasPlace);

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

    await fs.writeFileSync('./trending_today.out', resStr, 'utf8');
    console.timeEnd('optimase');
})();