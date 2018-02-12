//this is the client class

window.onload = function(){ //window load guard


//SOCKET OBSERVERS
var socket = io()
socket.on('message', function(data) {
  console.log(data);
});

//GLOBAL VARS
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")





//observer for managing the size of the canvas
function resizeCanvas() {
	canvas.style.width = window.innerWidth + "px";
	setTimeout(function() {
		canvas.style.height = window.innerHeight + "px";
	}, 0);
};
window.onresize = resizeCanvas;
//manual pack of canvas	
resizeCanvas();

}