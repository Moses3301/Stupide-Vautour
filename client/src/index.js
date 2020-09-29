import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import io from 'socket.io-client';
var socket = io.connect();

class Card extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    socket.emit('card-selected', this.props.value);
  }

  render() {
    if (this.props.value == null) { return ''}
    return (
    <div className="card vulture-card" onClick = {this.handleClick}>
      <div className="value">{this.props.value}</div>
      <div className="image">🦅</div>
    </div>
  );}

}

class Player extends React.Component{
  constructor(props) {
    super(props);
  }

  renderCardSpot(){
    return ( <div className={(this.props.player.isPlayed ? 'spot-full' : 'spot-empty') + ' card'}></div>);
  }

  render() {
    return (
      <div className="box">
        <h1 className='name'>{this.props.player.name}</h1>
        {
          this.props.player.show ? <Card value={this.props.player.show}></Card> : this.renderCardSpot()
        }
        <h2 className='score'>Score: {this.props.player.score}</h2>
      </div>
  );}
}

class PreyCard extends React.Component{
  constructor(props) {
    super(props);
  }

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
    this.state = { cards:[], players:[], preycard: null};
    this.handleChange = this.handleChange.bind(this);
    socket.on('cards-changed', (data)=> {
      console.log("cards-changed: " + data);
      this.setState((state)=> {return {cards: data};});
    });
    socket.on('card-placed', (data)=> {
      this.setState((state)=> {
        var newPlayers = state.players.slice();
        newPlayers[data].isPlayed = true;
        return {players: newPlayers};
      });
    });
    socket.on('prey-card-changed', (data)=>{
      this.setState((state)=> {
        return {preycard: data};
      });
    });
    socket.on('end-turn', (data)=> {
      var name = null;

      var i = 0;
      var newPlayers = [...this.state.players];
      newPlayers.forEach(player =>{player.show = data.cards[i++]});
      console.log(data.winnerIndex);
      if (data.winnerIndex !== -1){
        name = newPlayers[data.winnerIndex].name;
        newPlayers.forEach(player => {console.log(player.name)});
        newPlayers[data.winnerIndex].name = name + ' winner';
        newPlayers[data.winnerIndex].score = data.updateScore;
      }
      this.setState((state)=> {return {players: newPlayers}})

      setTimeout(()=>{
        var newPlayers = [...this.state.players];
        if (data.winnerIndex !== -1) { newPlayers[data.winnerIndex].name = name; }
        newPlayers.forEach((player) => {player.isPlayed = false; player.show = null});
        this.setState((state)=> {return {players: newPlayers}});
      },1000)
    }
  );
 }

  handleChange(e){
    this.setState(state => (
      {
        cards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        players: [{name: 'momo', score: 0, isPlayed: false},{name: 'gogo', score: 0, isPlayed: false}],
        preycard: 3
      }));
  }

  render() {
    return (
      <div className="table-container">
        <div className="card-container">
          {this.state.cards.map(card => (
            <Card value={card}></Card>
          ))}
        </div>

        <div className="prey-container">
          <PreyCard value={this.state.preycard}></PreyCard>
        </div>

        <div className="players-info">
          {this.state.players.map(player => (
            <Player player={player} key={player.name}></Player>
          ))}
        </div>
        <button onClick={this.handleChange}>Click me</button>
        </div>
    );
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
