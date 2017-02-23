const fs = require('fs');
(async function dfd() {
    let text = await fs.readFileSync('./data.in', 'utf8');
    let array = text.split('\n');
    array.push('111 3 2');
    await fs.writeFileSync('./data.out', array.join('\n'))
})();