'use strict';

var scope = require('jsdom').jsdom().createWindow();
var websocket_multiplex = require('websocket-multiplex');
var fs = require('fs');
var path = require('path');

var library = path.join(__dirname, 'node_modules/websocket-multiplex/multiplex_client.js');

scope.eval(fs.readFileSync(library, 'utf-8'));
module.exports = scope.WebSocketMultiplex;
