// Get dependencies to start server.
var express = require('express');
// Create express app.
var app = express();
// Start server.
var server = require('http').createServer(app);
// Set socket.io to listen on server.
var io = require('socket.io').listen(server);
// Set up favicon and other resources.
var favicon = require("serve-favicon");
app.use(favicon(__dirname + '/resources/favicon.ico'));
// Set up CSS + HTML resources
app.use(express.static(__dirname + '/resources'));
// Set up javascript resources
app.use(express.static(__dirname + '/javascript'));

// Custom modules
// Call scriptify for module names
var scriptify = require(__dirname + "/resources/scriptify.js");

// Listen on port 3000 add diff address with listen(port, ip-address)
server.listen(process.env.PORT || 3000);

// Routes starts here.
// TODO(reycano or will96): set routes in different javascript file.
app.get('/', function(req,res){
  res.sendFile(__dirname+'/index.html')
});
app.get('/index', function(req,res){
  res.sendFile(__dirname+'/index.html')
});
app.get('/index.html', function(req,res){
  res.sendFile(__dirname+'/index.html')
});
app.get('/about', function(req,res){
  res.sendFile(__dirname+'/about.html')
});
app.get('/alumni', function(req,res){
  res.sendFile(__dirname+'/alumni.html')
});
app.get('/members', function(req,res){
  res.sendFile(__dirname+'/members.html')
});
app.get('/schedule', function(req,res){
  res.sendFile(__dirname+'/schedules.html')
});
