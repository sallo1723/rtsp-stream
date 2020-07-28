// Comunication by websocket with server
const wsClient = new WebSocket('ws://192.168.1.137:9898/');
// Styles of the positions of the cameras
var position = ['width: 622px; height: 551px;border: solid black;border-width: 1px 1px 0px 1px;margin-left: 0px;margin-top: 0px;position: absolute;',
                'width: 155px;height: 136px;border: solid black;border-width: 1px 0px 1px 1px;margin-left: 0px;margin-top: 552px;position: absolute;',
                'width: 155px;height: 136px;border: solid black;border-width: 1px 0px 1px 1px;margin-left: 156px;margin-top: 552px;position: absolute;',
                'width: 155px;height: 136px;border: solid black;border-width: 1px 0px 1px 1px;margin-left: 312px;margin-top: 552px;position: absolute;',
                'width: 154px;height: 136px;border: 1px solid black;margin-left: 468px;margin-top: 552px;position: absolute;'];
// Websocket links of the cameras
var websocketUrl = ['ws://192.168.1.137:9999', 
                    'ws://192.168.1.137:9998', 
                    'ws://192.168.1.137:9997',
                    'ws://192.168.1.137:9996',
                    'ws://192.168.1.137:9995'];
var player = [];
var canvas = [];
var i = 0;
var serverInfo;

//////////// Functions to change the camera selected
function Left(){
  if(i<1){ 
    i = 1;
    console.log('Top!');
  };
  window.alert('Left button activated!');
  canvas[i].setAttribute("style", position[i]);
  canvas[i-1].setAttribute("style", position[0]);
  i--;
}

function Right(){ 
  if(i>3){ 
    i = 3;
    console.log('Top!');
  };
  window.alert('Right button activated!');
  canvas[i].setAttribute("style", position[i+1]);
  canvas[i+1].setAttribute("style", position[0]);
  i++;
 
}

//////////// Initialization of video players for each camera depending of the websocket links 
websocketUrl.forEach((url, index) =>{
  canvas[index] = document.getElementById('canvas' + index);
  player[index]= new JSMpeg.Player(url, {
    canvas: canvas[index], autoplay: true, disableGl: true});
});


//////////// Message from html client to server to start the video players in server site
var controlOutput = document.getElementById('controlOutput');
var button = '';

wsClient.onopen = function() {      
  wsClient.send('start');
};

setInterval(() => {
  wsClient.send('DataRequest');
},500);

wsClient.onmessage = function(IncomingMessage) {
  serverInfo = JSON.parse(IncomingMessage.data);
  console.log(serverInfo);
  button = serverInfo.buttonActivated.split(':');
  controlOutput.innerHTML = '<p>Botón presionado del XboxOne: ' + button[1] + '</p>';
};

//////////// 3D model
// Create a scene and lights for three geometries with mesh,
// and the render that in a div (container)

var container, camera, renderer, scene, mesh = [], j = 0;
var X,Y,L=6;
var angle = 0;

function init() {
  container = document.getElementById('3dmodel_container');

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  createCamera();
  createLights();
  createGeometries('sphere', -5, 0.1, 0, 0x2700b4);
  createGeometries('platform', 0, -2, 0, 0x0400ff);
  createGeometries('arm', -11, 0.1, 0, 0x00ff0d);
  createRenderer();
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    50, // FOV
    container.clientWidth / container.clientHeight, // aspect
    1, // near clipping plane
    1000, // far clipping plane
  );
  camera.position.set( -2, 10, 25 );
  camera.rotation.x = -15/180*Math.PI;
  camera.rotation.y = 7/180*Math.PI;
}

function createLights() {
  const ambientLight = new THREE.AmbientLight( 0x404040, 10);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 8);
  directionalLight.position.set(0,1,0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

function createGeometries(type, x, y, z, color) {
  if(type === 'sphere'){
    var geometry = new THREE.SphereBufferGeometry(0.6,30,30);
    var material = new THREE.MeshStandardMaterial( {color: color} );
    mesh[j] = new THREE.Mesh( geometry, material );
    mesh[j].position.set( x, y, z );
    scene.add( mesh[j] );
  }

  if(type === 'arm'){
    var geometry = new THREE.BoxBufferGeometry( 12, 1, 1 );
    var material = new THREE.MeshStandardMaterial( { color: color } );
    mesh[j] = new THREE.Mesh( geometry, material );
    mesh[j].position.set( x, y, z );
    X = x;
    Y = y;
    scene.add( mesh[j] );
  }

  if(type === 'platform'){
    var geometry = new THREE.BoxBufferGeometry( 10, 3, 6 );
    var material = new THREE.MeshStandardMaterial( { color: color } );
    mesh[j] = new THREE.Mesh( geometry, material );
    mesh[j].position.set( x, y, z );
    scene.add( mesh[j] );
  }

  j++;

}

function createRenderer() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  container.appendChild( renderer.domElement );
}

function animate() {
  requestAnimationFrame( animate );

  mesh[2].rotation.z = angle;
  mesh[2].position.x = X;
  mesh[2].position.y = Y;
  
  renderer.render( scene, camera );
}

init();
animate();

window.addEventListener( 'keydown', ( e ) => {
  if ( e.key === 'ArrowUp' ) {
    if(angle > -Math.PI/3){
      angle = angle - 0.5/180*Math.PI;
      X = -11 + L - L*Math.cos(angle);
      Y = 0.1 - L*Math.sin(angle);
    }
  }
  
  if ( e.key === 'ArrowDown' ) {
    if(angle < 0){
      angle = angle + 0.5/180*Math.PI;
      X = -11 + L - L*Math.cos(angle);
      Y = 0.1 - L*Math.sin(angle);
    }
  }
});

//////////// 2d models for inclination of DeminANT
var roll = 0, pitch = 0;
var Front_view = document.getElementById('Front_view');
var Right_view = document.getElementById('Right_view');
var inclination_roll = document.getElementById('inclination_roll');
var inclination_pitch = document.getElementById('inclination_pitch');

function rotation(Image, angle){
  Image.setAttribute('style', 'transform: rotate(' + angle.toString() + 'deg);');
}

function update_incination_angle(div_element, angle){
  div_element.innerHTML = angle + '°';
}

window.addEventListener('keydown', ( e ) => {
  if ( e.key === 'w' ) {
    roll++;
    rotation(Front_view, roll);
    update_incination_angle(inclination_roll, roll);
  }
            
  if ( e.key === 's' ) {
    roll--;
    rotation(Front_view, roll);
    update_incination_angle(inclination_roll, roll);
  }

  if ( e.key === 'd' ) {
    pitch++;
    rotation(Right_view, pitch);
    update_incination_angle(inclination_pitch, pitch);
  }
  
  if ( e.key === 'a' ) {
    pitch--;
    rotation(Right_view, pitch);
    update_incination_angle(inclination_pitch, pitch);
  }
});

//////////// Battery indicator
var battery_level_container = document.getElementById('battery_level_container');
var battery_percentage = document.getElementById('battery_percentage');
var battery_level = 0;

function battery_level_update(battery_level){
  var battery_level_color;
  
  if(battery_level <= 20){
    battery_level_color = '#FF3333';
  }else{
    if(battery_level > 20 & battery_level < 60){
      battery_level_color = '#FCD116';
    } else{
      battery_level_color = '#66CD00';
    }
  }
  
  battery_percentage.innerHTML = battery_level+'%';
  battery_level_container.style.width = battery_level+'%';
  battery_level_container.style.backgroundColor = battery_level_color;
}

window.addEventListener('keydown', ( e ) => {
  if ( e.key === 'm' ) {
    if(battery_level < 100){
      battery_level++;
      battery_level_update(battery_level);
    }
 }
            
  if ( e.key === 'n' ) {
    if(battery_level > 0){
      battery_level--;
      battery_level_update(battery_level);
    }
  }
});