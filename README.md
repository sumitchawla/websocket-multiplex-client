[![Build Status](https://travis-ci.org/sumitchawla/websocket-multiplex-client.svg?branch=master)](https://travis-ci.org/sumitchawla/websocket-multiplex-client)
[![Dependency Status](https://david-dm.org/sumitchawla/websocket-multiplex-client.png)](https://david-dm.org/sumitchawla/websocket-multiplex-client) [![devDependency Status](https://david-dm.org/sumitchawla/websocket-multiplex-client/dev-status.png)](https://david-dm.org/sumitchawla/websocket-multiplex-client#info=devDependencies)

# Websocket Multiplex Client

Its a NodeJs wrapper on client code for websocket-multiplex.  It helps you to do full end to end testing on websocket-multiplexing.
## How to use

Below is an sample on how to connect to a sockjs server from code, establish a channel connection and send data.

```js

var sockjsClient = new sockjs_client("http://127.0.0.1:8088/multiplex", 
                                      null, 
                                       { rtt: 201 });
sockjsClient.onopen = function() {
  //Create youre multiplex client
  var client = new multiplex_client(sockjsClient);
  
  //Register the channel
  var mychannel_client = client.channel('mychannel');
  mychannel_client.onmessage = function(msg){
    console.log("Received message", msg);
    done();
  };
  
  //Send message to server on the channel
  setTimeout(function() {
    mychannel_client.send('Hi'); 
  }, 100);
};
sockjsClient.onclose = function() {

```

View test.js for complete example on how to use the code. 

## Tests

Run tests using mocha

```js
  mocha test.js

```
