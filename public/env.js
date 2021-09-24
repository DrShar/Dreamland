let socket = io();
//This is back end code for sockets



socket.on('number', (msg) => {
    console.log('random number: ' + msg)
})