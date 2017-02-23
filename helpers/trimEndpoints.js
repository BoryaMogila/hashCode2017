function trimEndpoints(endpoints) {
    for (let i = endpoints.length - 1; i--;) {
        let endpoint = endpoints[i];
        let caches = endpoints.cashes;
        let cachesArr = Object.values(caches);
        let cachesNum = cachesArr.length;
        if (!cachesNum) {
            endpoints.splice(i)
        } else {
            let dcLatency = endpoint.dcLatency;
            for (let cacheI = cachesNum - 1; cacheI--; ) {
                let cache = cachesArr[cacheI];
                if(cache.latency >= dcLatency) {
                    delete caches[cache.id]
                }
            }
        }
    }
}

module.exports = trimEndpoints;