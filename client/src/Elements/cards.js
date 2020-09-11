function vultureCard(value){
  return
  <div classname="card vulture-card">
    <div classname="value">{value}</div>
    <div classname="image">🦅</div>
  </div>;
}

function preyCard(value){
  return
  <div classname="card vulture-card">
    <div classname="value">{value}</div>
    <div classname="image">{value<=0 ? 💀 : 🐁}</div>
  </div>;
}
