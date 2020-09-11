import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component{
  render() {
    return (
    <div class="card vulture-card" onClick= {()=>{console.log(this.key)}}>
      <div class="value">{this.props.value}</div>
      <div class="image">🦅</div>
    </div>
  );
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {score: this.props.player.score, isPlayed: this.props.player.isPlayed};
  }

  render() {
    return (
      <div class="box">
        <h1 class='name'>{this.props.player.name}</h1>
        <div class="card-spot card {this.state.isPlayed ? .vulture-card-back : .card-spot-full }"></div>
        <h2 class='score'>Score: {this.state.score}</h2>
      </div>
  );
  }
}

class PreyCard extends React.Component{
  render() {
    return (
      <div class="card prey-card">
        <div class="value">{this.props.value}</div>
        <div class="image">{this.props.value <= 0 ? '💀' : '🐁'}</div>
      </div>
  );
  }
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cards: this.props.cards, preycard: this.props.preycard, players: this.props.players};
    this.listCards = this.state.cards.map((card) =>
      <Card value={card} key={card}></Card>
    );
    this.listPlayers = this.state.players.map((player) =>
      <Player player={player} key={player.name}></Player>
    );
  }

  render() {
    return (
      <div class="table-container">
        <div class="card-container">
          {this.listCards}
        </div>

        <div class="prey-container ">
        <PreyCard value={this.state.preycard}></PreyCard>
        </div>


        <div class="players-info">
        </div>
        {this.listPlayers}
        </div>
    );
  }
}

var cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const praycard = -2;
var players = [{name: "momo",score:12,isPlayed:false},{name: "gogo",score:5,isPlayed:true}];

ReactDOM.render(
  <Board cards={cards} preycard={praycard} players={players}/>,
  document.getElementById('root')
);
