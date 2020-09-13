import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component{
  render() {
    return (
    <div className="card vulture-card" onClick= {()=>{console.log(this.props.value)}}>
      <div className="value">{this.props.value}</div>
      <div className="image">🦅</div>
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
      <div className="box">
        <h1 className='name'>{this.props.player.name}</h1>
        <div className={(this.state.isPlayed ? 'spot-full' : 'spot-empty') + ' card' }></div>
        <h2 className='score'>Score: {this.state.score}</h2>
      </div>
  );
  }
}

class PreyCard extends React.Component{
  render() {
    return (
      <div className="card prey-card">
        <div className="value">{this.props.value}</div>
        <div className="image">{this.props.value <= 0 ? '💀' : '🐁'}</div>
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
      <div className="table-container">
        <div className="card-container">
          {this.listCards}
        </div>

        <div className="prey-container">
        <PreyCard value={this.state.preycard}></PreyCard>
        </div>

        <div className="players-info">
          {this.listPlayers}
        </div>
        </div>
    );
  }
}

var cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const praycard = 5;
var players = [{name: "momo",score:12,isPlayed:false},{name: "gogo",score:5,isPlayed:true}];

ReactDOM.render(
  <Board cards={cards} preycard={praycard} players={players}/>,
  document.getElementById('root')
);
