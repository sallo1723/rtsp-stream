var mqtt    = require('mqtt');
var urlMqtt = '192.168.0.18:1883';
var client  = mqtt.connect(`tcp://${urlMqtt}`);
var options = {qos: 2};

module.exports = function(){

    client.on('connect',() => {	
        console.log('MQTT connected through: ' + urlMqtt + '.');
        client.subscribe('Quosmio');
    });
      
    client.on('message', (topic, message) => {
        if(topic == 'Quosmio'){
          console.log(message.toString());
          client.publish('Lenovo', 'Client Lenovo connected!', options);
          //client.end();
        };
    });

};

// El otro cliente mqtt (arduino) es mqtt.js en esta misma carpeta