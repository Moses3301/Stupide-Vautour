var Logic = require('./Logic.js');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var numOfPlayers = 0;

app.get('/', (req, res) => {
  res.send('./client/');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  numOfPlayers++;
  console.log('a user #'+numOfPlayers+' connected');
});

/*
action: action_type,
data: data
*/


logic.em.on('game-start' , ()=>{
  //create jason and send to client
});

logic.em.on('card-played' , (cardPlayed)=>{
  //create jason and send to client
});

logic.em.on('end-turn' , (winner)=>{
  //create jason and send to client
});

logic.em.on('prey-card-changed' , (preyCard)=>{
  //create jason and send to client
});

logic.em.on('end-game' , (winner)=>{
  //create jason and send to client
});
