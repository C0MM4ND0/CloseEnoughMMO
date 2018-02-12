//this is the client class

window.onload = function(){ //window load guard




//GLOBAL VARS
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const MAX_FPS = 60
var gameLoop


var users //client side




//SOCKET OBSERVERS
var socket = io()
socket.on('update', function(data) {
	update(data) //data = users
});

//SOCKET EMITTERS
//CLIENT PROMPTS
var name = prompt("Enter name ya");
if (name == null || name == "") {
	name = "Anon"+Math.floor(Math.random()*100);
	socket.emit('new user', {username: name, x: canvas.width/2, y: canvas.height/2, dimW: canvas.width, dimH: canvas.height})

}else{
	verbose(name)
	socket.emit('new user', {username: name, x: canvas.width/2, y: canvas.height/2, dimW: canvas.width, dimH: canvas.height})
}


//USER KEYS
window.addEventListener("keydown", function (event) {
	if (event.defaultPrevented) {
    //return; 
}
switch(event.key){
	case "a":
	socket.emit('moveX', {release: false, positive: false})
	break;
	case "d":
	socket.emit('moveX', {release: false, positive: true})
	break;
	case "w":
	socket.emit('moveY', {release: false, positive: false})
	break
	case "s":
	socket.emit('moveY', {release: false, positive: true})
	break
	default:
	break;
}


event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
	if (event.defaultPrevented) {
    //return; 
}
switch(event.key){
	case "a":
	socket.emit('moveX', {release: true, positive: false})
	break;
	case "d":
	socket.emit('moveX', {release: true, positive: true})
	break;
	case "w":
	socket.emit('moveY', {release: true, positive: false})
	break
	case "s":
	socket.emit('moveY', {release: true, positive: true})
	break
	default:
	break;
}


event.preventDefault();
}, true);




function gameLoop(){
	draw()
}


function update(data){ //update sprites client side
	users = data
}


function draw(){ //draw client

	context.fillStyle="#FFFFFF"; //prompting for a new paint over
	//coloring backgrounds
	context.fillRect(0,0,canvas.width,canvas.height)

	//drawing users
	for(index in users){
		var user = users[index]
		context.fillStyle="#000000"; 
		context.fillRect(user.x,user.y,canvas.width*.05,canvas.height*.05)
		context.font = "15px Comic Sans MS";
		context.fillText(user.name,user.x, user.y);
	}
}


function start(){
	gameLoop = setInterval(gameLoop, 1000/MAX_FPS)
}



//MISC function

function verbose(args){
	console.log(args)
}

//observer for managing the size of the canvas
// function resizeCanvas() {
// 	canvas.style.width = window.innerWidth + "px";
// 	setTimeout(function() {
// 		canvas.style.height = window.innerHeight + "px";
// 	}, 0);
// };
// window.onresize = resizeCanvas;
// //manual pack of canvas	
// resizeCanvas();

start()

}