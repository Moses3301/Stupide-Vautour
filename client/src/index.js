import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board.js'
import Lobby from './lobby.js'
import './index.css';

import SocketSingleton from './client-socket.js';

var socket = SocketSingleton.getInstance();

class PageMenager extends React.Component{
  constructor(props){
    super(props);
    this.state = {state: 'PRESTART'};
    socket.on('startGame',()=>{
      console.log('PageMenager > startGame')
      this.setState(state => ({state: 'START'}));
    })
  }
  renderSwitch(param){
    switch(param){
      case 'PRESTART': return (<Lobby gameKey='123'/>);
      case 'START': return (<Board/>);
    //  case 'EndGame': return (<Board/>);
      default: return '';
    }
  }
  render(){
    return (
      <div>
        {
          this.renderSwitch(this.state.state)
        }
      </div>
    )
  }
}

ReactDOM.render(
  <PageMenager gameKey = '123456'/>,
  document.getElementById('root')
);
