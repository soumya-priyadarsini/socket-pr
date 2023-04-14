const application = require('express')();
const server = require('http').createServer(application)
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000
 
application.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});
 
server.listen(PORT, () => {
   console.log('Server is running on port: ' + PORT);
});
 
//setting the conenction
io.on('connection', (socket) => {
 console.log('socket io start:-',socket.id)
   socket.on('disconnect', () => {
       console.log('User disconnected - Username: ' + socket.username);
   });
 
   //received the message
   socket.on('new message', (msg) => {
       io.emit('send message', {message: msg, user: socket.username});
       console.log('msg received..',socket.username)
   });
 
   socket.on('new user', (usr) => {
       socket.username = usr;
       console.log('User connected - Username: ' + socket.username);
   });
});
