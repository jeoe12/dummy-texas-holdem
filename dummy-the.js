/**
 * Created by dummy team
 * 2017-09-08
 */

// initialize RUNTIME env
require('./configuration/constants');
var systemConfig = require('./configuration/system_configs');
systemConfig.setupEnvironment();

var express = require('express');

var app = module.exports = express();

var httpServer = require('http').createServer(app);
var httpPort = normalizePort(process.argv[2] || LISTEN_PORT);
httpServer.listen(httpPort);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

app.use('/', express.static(__dirname + '/web/'));
console.log('dummy texas holdem client is running, listening on port ' + httpPort);
