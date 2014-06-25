# Websocket Multiplex Client

Its a NodeJs wrapper on client code for websocket-multiplex.  It helps you to do full end to end testing on websocket-multiplexing.
## How to use

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

## Tests

Run tests using mocha

```js
  mocha test.js

```
