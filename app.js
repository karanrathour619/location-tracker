const express = require("express");
const app = express();
const path = require("path")

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// let userCount = 0; // Track connected users
let users = {};

io.on("connection", function (socket) {
    console.log("User connected:", socket.id);

    socket.on("send-location", function (data) {
        users[socket.id] = data.username;  // Store username
        io.emit("recieve-location", { 
            id: socket.id, 
            username: data.username, 
            latitude: data.latitude, 
            longitude: data.longitude 
        });
        io.emit("update-user-count", Object.keys(users).length);
    });

    socket.on("disconnect", function () {
        delete users[socket.id];
        io.emit("user-disconnected", socket.id);
        io.emit("update-user-count", Object.keys(users).length);
    });
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000);