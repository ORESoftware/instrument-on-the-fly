

const iotf = require('instrument-on-the-fly');
const fs = require('fs');

iotf.getStream(__filename).pipe(fs.createWriteStream(__dirname + '/results/foo.js'));