//this class is the server class


const serverJS = require('engine.io/lib/server.js')
const PORT = process.env.PORT || 5000
// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', PORT);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(PORT, function() {
	console.log('Starting server on port ' +  PORT);
});





//SERVER SIDE CODE
class User{
	constructor(id, x, y, dx, dy, name){
		this.id = id
		this.x = x
		this.y = y
		this.dx = dx
		this.dy = dy
		this.name = name
	}

	move(){

		if(!(this.x < 0 && this.dx < 0 || this.x + dimW*.1 > dimW && this.dx > 0)){
			this.x += this.dx
		}

		if(!(this.y < 0 && this.dy < 0 || this.y + dimH*.1 > dimH && this.dy > 0)){
			this.y += this.dy
		}


	}

}

//GLOBAL VARS

//List of current users
var users = []
var serverLoop
var serverBroadcast 

var dimW
var dimH


const MAX_FPS = 60

//RUNNING EACH INSTANCE FOR EVERY USER
io.on('connection', function(socket) {
	
	socket.on('new user', function(package){
		verbose(socket.id + ' has joined ')
		addUser(socket.id, package.username, package.x, package.y)

		if(dimW == null){ dimW = package.dimW}
		if(dimH == null){ dimH = package.dimH}

			verbose(dimW + ' ' + dimH)

	})


	socket.on('disconnect', function() {
		verbose(socket.id + ' disconnected ')
		removeUser(socket.id)
	})

	socket.on('moveX', function(package){
		if(users.length == 0){ return }
		var user  = users[getUserIndex(socket.id)]
		if(!package.release){ //go
			user.dx = (package.positive) ? 5 : -5
		}else{//stop
			user.dx = 0
		}
	})

	socket.on('moveY', function(package){
		if(users.length == 0){ return }
		var user  = users[getUserIndex(socket.id)]
		if(!package.release){ //go
			user.dy = (package.positive) ? 5 : -5
		}else{//stop
			user.dy = 0
		}
	})

});


function updateClients(){
	 io.sockets.emit('update', users);
}


function manageClients(){ //this is where all the server stuff is done
	moveUsers()
}




function moveUsers(){
	for(var i = 0; i < users.length; i++){
		var user = users[i]
		user.move()
	}
}



function start(){
	serverLoop = setInterval(manageClients, 1000/ MAX_FPS)
	serverBroadcast = setInterval(updateClients, 1000 / MAX_FPS);
}


function addUser(id, name, x, y){
	users.push(new User(id, x , y, 0, 0, name))
}

function getUserIndex(id){
	for(var i = 0; i < users.length; i++){
		if(users[i].id == id){
			return i;
		}
	}
}


function removeUser(id){
	for(var i = 0; i < users.length; i++){
		if(users[i].id == id){
			users.splice(i,1)
			return;
		}
	}
}

function printUsers(){
	for(var i = 0; i < users.length; i++){
		var u = users[i]
		verbose(u.name)
	}
}

//MISC FUNCTIONS
function verbose(args){ //simple verbose
	console.log(args)
}


start()

