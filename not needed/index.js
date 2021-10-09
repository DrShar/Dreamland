let http = require('http').createServer(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected' + (socket.id));
     socket.on('disconnect', () => {
       console.log('user disconnected');
     }); //socket functionality -> will tell us when a user connects and disconnects
     setInterval(()=>{
         socket.emit('number', parseInt(Math.random()*10));
     }, 1000);

    });