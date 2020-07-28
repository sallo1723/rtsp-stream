var streamController = require('../controllers/streaming');
var http = require('http');
var WebSocketServer = require('websocket').server;
var server = http.createServer();
var urlHtml ='192.168.1.137';
var OutgoingMessage = { buttonActivated: '', roll: 0, pitch: 0 };
var OutgoingJSON = JSON.stringify(OutgoingMessage);

server.listen(9898, urlHtml,() => {
    console.log('HTML connected through: ' + urlHtml + '.');
});

var wsServer = new WebSocketServer({
    httpServer: server
});

var Init = function(){

  wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(IncomingMessage) {
      if (IncomingMessage.type === 'utf8') {
        console.log(IncomingMessage);

        if(IncomingMessage.utf8Data === 'start'){
          connection.send('OutgoingMessage');
          //streamController(IncomingMessage.utf8Data);
        }

        if(IncomingMessage.utf8Data === 'DataRequest'){
          connection.sendUTF(OutgoingJSON);//send(OutgoingMessage);
        }
     }
    });
    
    connection.on('close', function(reasonCode, description) {
      //console.log('Client has disconnected.');
      wsServer.closeAllConnections();
    });

  });

};

var ControlStateUpdate = function(data){
  OutgoingMessage.buttonActivated = data;
  OutgoingJSON = JSON.stringify(OutgoingMessage);
};

var DeminantStateUpdate = function(data){
  
};

module.exports = {
  Init: Init,
  ControlStateUpdate: ControlStateUpdate,
  DeminantStateUpdate: DeminantStateUpdate
}