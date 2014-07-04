'use strict';

var scope = require('jsdom').jsdom().createWindow();
var websocket_multiplex = require.resolve('websocket-multiplex');
var fs = require('fs');
var path = require('path');

var library = path.join(path.dirname(websocket_multiplex),'multiplex_client.js');

scope.eval(fs.readFileSync(library, 'utf-8'));
module.exports = scope.WebSocketMultiplex;
