function player(player){
  return
  (<div classname="box">
    <h2 classname="name">{player.name}</h1>
    <div classname="card-spot card {player.isPlayed}"></div>
    <h2 classname="score">Score: {player.score}</h2>
  </div>);
}
