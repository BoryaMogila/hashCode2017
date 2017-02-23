class Endpoint {
    constructor(id, size, requests) {
        this.id = id;
        this.size = size;
        this.requests = requests;
    }

    toString() {
        let string = `${this.id} ${this.size} ${this.requests}`;
        return string;
    }
}

module.exports = Endpoint;