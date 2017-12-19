"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var istanbul = require("istanbul");
var instrumenter = new istanbul.Instrumenter();
var stream_1 = require("stream");
exports.getStream = function (file) {
    var filename = path.basename(file);
    var t = new stream_1.Transform({
        writableObjectMode: true,
        transform: function (chunk, encoding, callback) {
            callback(null, chunk);
        }
    });
    var data = '';
    fs.createReadStream(file)
        .once('error', function (e) {
        this.removeAllListeners();
        t.emit('error', e);
    })
        .on('data', function (d) {
        data += String(d);
    })
        .once('end', function () {
        instrumenter.instrument(data, filename, function (err, generatedCode) {
            if (err) {
                return t.emit('error', err);
            }
            t.write(String(generatedCode));
        });
    });
    return t;
};
exports.default = exports.getStream;
