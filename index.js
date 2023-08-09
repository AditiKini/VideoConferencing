const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");


const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (request, response) => {
	response.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("You", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("call is Ended")
	});

	socket.on("calluser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("calluser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("call is Accepted", data.signal)
	});
});


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//socket is used for real time data transmission.