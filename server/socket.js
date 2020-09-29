const Logic = require('./Logic.js');
var numOfPlayers = 0;
const clients = [];
const logic = new Logic(2);

module.exports = function (io){
  io.on('connect', socket => {

    var id = socket.id;
    clients.push(id);
    console.log(`Client ${id} connected`);

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
    });

    //##function for the specific client###############################################
    socket.on('card-selected', (value) => {
      console.log(`client: ${id} select card ${value}`);
      var index = clients.findIndex((e)=>{return (e == id);});
      var response = logic.playCard(index, value);

      if (response){
        console.log(response.error);
      }
    });
    //################################################################################
  });

  //##function for all clients#######################################################
  logic.em.on('card-played',(data)=>{
    var index = data.playerIndex;
    io.to(clients[index]).emit('cards-changed', logic.players[index].cards);
    io.sockets.emit('card-placed', index);
    console.log(data.playerIndex + ' select card: '+ data.cardValue);
  });

  logic.em.on('end-game',(winner)=>{
    console.log('END GAME! '+winner+' is the winner');
    io.sockets.emit('game-ended', winner);
  });

  logic.em.on('end-turn',(winner)=>{
    console.log('end turn '+winner+' is the winner');
    var cards = logic.vultureCards;
    io.sockets.emit('end-turn', { cards: cards, winnerIndex: winner, updateScore: logic.players[winner].points});
  });

  logic.em.on('prey-card-changed',(preyCard)=>{
    console.log('prey card changed to  '+preyCard);
    io.sockets.emit('prey-card-changed', preyCard);
  });
  //################################################################################
}
