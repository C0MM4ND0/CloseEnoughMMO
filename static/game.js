//this is the client class

window.onload = function(){ //window load guard


//GLOBAL VARS
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")




context.fillStyle="#000000";
//coloring backgrounds
context.fillRect(0,0,canvas.width,canvas.height)

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