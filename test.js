var http = require('http');
var express = require('express');
var sockjs = require('sockjs');
var websocket_mutliplex = require('websocket-multiplex');

var sockjs_client = require("sockjs-client-node");
var multiplex_client = require("./index.js");

describe("Tests", function() {
        var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
        var service = sockjs.createServer(sockjs_opts);
        var multiplexer = new websocket_mutliplex.MultiplexServer(service);

        var app = express();
        var server = http.createServer(app);
        service.installHandlers(server, {prefix:'/multiplex'});
        server.listen(8088);

        it('Test mychannel', function(done){
          var mychannel = multiplexer.registerChannel('mychannel');
          mychannel.on('connection', function(conn) {
            conn.on('data', function(data) {
                conn.write('Hello: ' + data);
            });
          }); 
          
          var sockjsClient = new sockjs_client("http://127.0.0.1:8088/multiplex", null, { rtt: 201 });
          sockjsClient.onopen = function() {
            console.log("sockjsClient:Open");
            var client = new multiplex_client(sockjsClient);
            var mychannel_client = client.channel('mychannel');
            mychannel_client.onmessage = function(msg){
              console.log("Received message", msg);
              done();
            };
            setTimeout(function() {
              mychannel_client.send('Hi'); 
            }, 100);
          };
          sockjsClient.onclose = function() {
            console.log("sockjsClient:Close");
          };
    })

});
