var htmlComunications = require('./comunications/client-html');
var mqttComunications = require('./comunications/client-mqtt');

//////////// Comunication with MQTT client (DeminANT controller: Arduino)
mqttComunications();

//////////// Comunication with HTML client (GUI) 
htmlComunications.Init();

//////////// Xbox control
var GameController = require('./controllers/gamecontroller');
var gc = new GameController('XboxOne');
gc.connect();

gc.on('ControlChange', (data) => {
    console.log(data.buttonActivated);
    htmlComunications.ControlStateUpdate(data.buttonActivated);
});