var mqtt = require('mqtt');
var url = '192.168.0.18:1883';
var client  = mqtt.connect('tcp://' + url);
var options = {qos: 2};

client.on('connect',() => { 
  console.log('Client Quosmio connected!');
  client.subscribe('Lenovo');
});

setInterval(() => {
  client.publish('Quosmio', 'Comunications stablished!', options);
}, 1500);

client.on('message', (topic, message) => {
  if(topic == 'Lenovo'){
    console.log('Message: ' + message.toString());
  };
});