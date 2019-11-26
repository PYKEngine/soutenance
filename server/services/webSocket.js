const io = require("socket.io");
let users = [];
let messages = [];
let index = 0;

io.on("connect", socket => {
  socket.emit("loggedIn", {
    users: users.map(s => s.username),
    messages: messages
  });
  // New user
  socket.on("newUser", username => {
    console.log(`${username} has join the chat`);
    socket.username = username;
    users.push(socket);

    io.on("userOnline", socket.username);
  });

  // Messages
  socket.on("msg", msg => {
    let message = {
      index: index,
      username: socket.username,
      msg: msg
    };

    massages.push(message);

    io.emit("msg", message);

    index++;
  });

  // Disconnect
  socket.on("disconnect", () => {
    io.emit("userLeft", socket.username);
    users.splice(users.indexOf(socket), 1);
    console.log(`${socket.username} has left the chat`);
  });
});
