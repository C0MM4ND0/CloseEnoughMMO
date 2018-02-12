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

io.on('connection', function(socket) {

	//RUNNING EACH INSTANCE FOR EVERY USER
	


});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);