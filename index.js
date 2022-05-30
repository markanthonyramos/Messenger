const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
	socket.on("user", (user) => {
		io.emit("user", user);
		io.emit("user connected", user);
	});

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});