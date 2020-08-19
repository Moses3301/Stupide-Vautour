class Logic{
  constructor(numOfPlayers){
    this.vultureCards = [];
    this.preyCards = [1,2,3,4,5,6,7,8,9,10,-1,-2,-3,-4,-5];
    shuffle(preyCards);
    this.preyCard = this.preyCards.pop();
    this.players = [];
    this.numOfVultureCards = 0;
    for(var i=0; i<numOfPlayers; i++){
      players[i] = { 'points':0 , 'cards':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]};
    }
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function playCard(playerIndex, cardValue){
    if (playerIndex >= this.players.length){ return {'error': 'invalid player index'}; }
    if (!(players[playerIndex].cards[cardValue - 1] == cardValue)){ return {'error': 'invalid card value'}; }
    if (vultureCards[playerIndex] != null){ return {'error': 'the player already placed a card'}; }

    this.players[playerIndex].cards[cardValue - 1] = null;
    this.vultureCards[playerIndex] = cardValue;
    this.numOfVultureCards++;
    if (this.numOfVultureCards == numOfPlayers - 1) { endTurn(); }
  }


  function getWinner() {
    var sortedCards = [...this.vultureCards].sort((a,b)=>{
      return b-a;
    });
    var i = j = 0;
    while(j<=sortedCards.length){
      i=j; j++;
      if (sortedCards[i]!=sortedCards[j]) {break;}
      while (sortedCards[i]==sortedCards[j]){ j++; }
    }
    return this.vultureCards.indexOf(sortedCards[i]);
    }

  function endGame(){
    var winner = this.players.sort((a,b)=> {return b-a})[0];
  }

  function endTurn(){
    var winner = getWinner();
    if (winner != -1){
      this.players[winner].points += preyCard;
    }
    this.vultureCards = [];
    this.preyCard = this.preyCards.pop();
    if (this.preyCard==null){ endGame(); }
  }

}
