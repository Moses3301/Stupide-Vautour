var Logic = require('./Logic.js');

var lo = new Logic(5);

/*
action: action_type,
data: data
*/


lo.em.on('game-start' , ()=>{
  //create jason and send to client
});

lo.em.on('card-played' , (cardPlayed)=>{
  //create jason and send to client
});

lo.em.on('end-turn' , (winner)=>{
  //create jason and send to client
});

lo.em.on('prey-card-changed' , (preyCard)=>{
  //create jason and send to client
});

lo.em.on('end-game' , (winner)=>{
  //create jason and send to client
});
