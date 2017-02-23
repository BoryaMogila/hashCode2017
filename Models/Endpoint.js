class Endpoint {
    constructor(id, dcLatency, requests, caches) {
        this.id = id;
        this.dcLatency = dcLatency;
        this.requests = requests;

        for (let i in caches) {
            let cache = caches[i];
            cache.save = dcLatency - cache.latency;
        }

        this.caches = caches;
    }

    toString() {
        let string = `${this.id} ${this.DClatency}`;
        return string;
    }
}

module.exports = Endpoint;