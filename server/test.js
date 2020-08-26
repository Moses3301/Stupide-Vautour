var Logic = require('./Logic.js');

var lo = new Logic(5);

lo.em.on('playcard' , (n)=>{
  console.log('playcard evet ' + n);
});

lo.playCard(1,2);
