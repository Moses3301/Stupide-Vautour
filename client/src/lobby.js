import React from 'react';
import ReactDOM from 'react-dom';
import SocketSingleton from './client-socket.js';
import './lobby.css'
var socket = SocketSingleton.getInstance();

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player">
        <h2 className="name">{this.props.name}</h2>
        <div className="isReady">
          {this.props.isReady? '🔳':'🔲'}
        </div>
      </div>
    );
  }
}

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playerList:[] };
    socket.on('player-list-changed', (data) => {
      this.setState((state) => {
        return {playerList: data};
      });
    });
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    socket.emit('ready');
  }

  render() {
    return (
      <div className="lobby">
        <div className="gamekey-container">
          <h1>Game Key: {this.props.gameKey}</h1>
        </div>
        <button className="ready" onClick={this.handleClick}>Ready!</button>
        <ul className="player-list">
          {this.state.playerList.map(player => (
            <li><Player name={player.name} key={player.name} isReady={player.isReady}></Player></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Lobby
