class Cache {
    constructor(id, size, latency) {
        this.id = id;
        this.size = size;
        this.sizeFree = size;
        this.latency = latency;
        this.videos = {};
    }

    saveVideo(video) {
        if (this.videos[video.id]) {
            return true
        } else {
            let sizeWillBe = this.sizeFree - video.size;
            if (sizeWillBe < 0) {
                return false
            } else {
                this.videos[video.id] = video;
                this.sizeFree = sizeWillBe;
                return true
            }
        }
    }

    toString() {
        let string = `${this.id} ${this.latency} ${this.size} ${this.sizeFree}\n`;
        for (let i in videos) {
            string += `${videos[i]} `;
        }
        string += '\n';
        return string;
    }

    toSave() {
        let string = `${this.id}\n`;
        let videos = this.videos;
        for (let i in videos) {
            string += ` ${videos[i]}`;
        }
        return string;
    }
}

module.exports = Cache;