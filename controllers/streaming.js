var Stream = require('node-rtsp-stream');
var cameras = require('../cameras/cameras.js');
var stream = [];

function streamInit() {

  cameras.forEach((camera, index) => {
    stream[index] = new Stream({
          name: camera.Name,
          streamUrl: camera.RtspLink,
          wsPort: camera.Wsport,
          ffmpegOptions: { 
            '-stats': '', 
            '-r': camera.Framerate,
            '-b:v': camera.Bitrate
          }
    });
  });   

};

module.exports = function(command){

  if (command == 'start'){
    streamInit();
  };

};