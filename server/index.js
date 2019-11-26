const express = require("express");
const { registerRoutes } = require("./routes");
const setEnvironment = require("./config/env");
const connectToDB = require("./config/db");
const path = require("path");
const socketio = require("socket.io");

const app = express();

setEnvironment(app);
connectToDB();
registerRoutes(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.VUE_APP_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let users = [];
let messages = [];
let index = 0;

const PORT = process.env.PORT || 5000;

// Init Maddleware
app.use(
  express.json({
    extended: false
  })
);

// app.get('*', (req, res) => {
//   if (!process.env.NODE_ENV || process.env.NODE_ENV.toString().trim() !== 'production') {
//     return res.send(
//       `Running server in ${process.env.NODE_ENV} mode!`
//     );
//   } else {
//     // Returns the main index file in production environment
//     return res.sendFile('index.html', { root: __dirname + '/public/' });
//   }
// })

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) =>
    res.sendFile(path.resolve(__dirname + "/public/index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Awaiting orders on port ${PORT}!`);
});

const expressServer = app.listen(5555, () => {
  console.log(`socket.io is connected on port 5555`);
});

const io = socketio(expressServer);

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
