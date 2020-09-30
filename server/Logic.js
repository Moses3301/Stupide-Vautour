var EventEmitter = require('./EventEmitter.js');

class Logic {
  constructor(){
  }

  startGame(numOfPlayers){
    this.em = EventEmitter();
    this.vultureCards = [];
    this.preyCards = [1,2,3,4,5,6,7,8,9,10,-1,-2,-3,-4,-5];
    this.shuffle(this.preyCards);
    this.preyCard = this.preyCards.pop();
    this.players = [];
    this.numOfVultureCards = 0;
    for(var i=0; i<numOfPlayers; i++){
      this.players[i] = { 'points':0 , 'cards':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]};
    }
    this.em.trigger('game-start');
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  playCard(playerIndex, cardValue){
    if (playerIndex >= this.players.length){ return {'error': 'invalid player index'}; }
    if (!(this.players[playerIndex].cards[cardValue - 1] == cardValue)){ return {'error': 'invalid card value'}; }
    if (this.vultureCards[playerIndex] != null){ return {'error': 'the player already placed a card'}; }
    this.numOfVultureCards++;
    this.players[playerIndex].cards[cardValue - 1] = null;
    this.vultureCards[playerIndex] = cardValue;
    this.em.trigger('card-played',{playerIndex , cardValue});
    if (this.numOfVultureCards == this.players.length ) { this.endTurn(); }
  }

  getWinner() {
    var sortedCards = [...this.vultureCards].sort((a,b)=>{
      return b-a;
    });
    var i = 0;
    var j = 0;
    while(j<sortedCards.length){
      i=j; j++;
      //the i,j elemets differnt
      if (sortedCards[i]!=sortedCards[j]) {break;}
      //skip blocks of the same elemet
      while (sortedCards[i]==sortedCards[j]){ j++; }
    }
    //all the elemets are identical
    if (j==sortedCards.length) { return -1; }
    return this.vultureCards.indexOf(sortedCards[i]);
    }

  endGame(){
    var winner = this.players.sort((a,b)=> {return b-a})[0];
    this.em.trigger('end-game', winner);
  }
0.
  endTurn(){
    var winner = this.getWinner();
    if (winner != -1){
      this.players[winner].points += this.preyCard;
    }
    this.em.trigger('end-turn',winner);
    this.vultureCards = [];
    this.numOfVultureCards = 0;
    this.preyCard = this.preyCards.pop();
    this.em.trigger('prey-card-changed',this.preyCard);
    if (this.preyCard==null){ this.endGame(); }
  }

}

module.exports = Logic;
