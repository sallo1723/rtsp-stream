// Comunication by websocket with server
const wsClientControl = new WebSocket('ws://192.168.1.137:9898/');

wsClientControl.onopen = function() {      
    console.log('Websocket connection from index-test.js')
  };