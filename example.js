"use strict"

var DHTSpider = require('./p2pspider/dhtspider');
var BTClient = require('./p2pspider/btclient');
var fs = require('fs');

var btclient = new BTClient({timeout: 1000 * 10});
btclient.on('complete', (metadata, infohash, rinfo) => {

    // metadata.info 含有资源名字, 资源大小, 资源文件列表等信息.

    var name = metadata.info.name || metadata.info['utf-8.name'];
    if (name) {
        var data = '\n\nname: ' + name.toString();
        data += '\nfrom: ' + rinfo.address + rinfo.port;
        data += '\nlink: magnet:?xt=urn:btih:' + infohash.toString('hex');
        console.log(data);
        fs.appendFile('./file/file', data, 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

});

DHTSpider.start({
    btclient: btclient,
    address: '0.0.0.0',
    port: 6219,
    nodesMaxSize: 4000
});