var cameras = [];
var Framerate = 22,
    Bitrate = '1500k',
    Fwsport = 9999, 
    i = 0;

function Camera(name, rtspLink){
    this.Name = name;
    this.RtspLink = rtspLink;
    this.Framerate = Framerate;
    this.Bitrate = Bitrate;
    this.Wsport = Fwsport - i;
    i++;
};

cameras[i] = new Camera('First camera', 'rtsp://192.168.1.10/user=admin&password=&channel=1&stream=1.sdp?');
cameras[i] = new Camera('Second camera', 'rtsp://192.168.1.10/user=admin&password=&channel=1&stream=1.sdp?');
cameras[i] = new Camera('Third camera', 'rtsp://192.168.1.10/user=admin&password=&channel=1&stream=1.sdp?');
cameras[i] = new Camera('Fourth camera', 'rtsp://192.168.1.10/user=admin&password=&channel=1&stream=1.sdp?');
cameras[i] = new Camera('Fifth camera', 'rtsp://192.168.1.10/user=admin&password=&channel=1&stream=1.sdp?');

module.exports = cameras;