const server = require("./app");
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const onlineUser = {};

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  //   socket.userId = userId;
  onlineUser[userId] = socket.id;
  next();
});

io.on("connection", (socket) => {
  console.log(onlineUser);

  socket.on("send_message", (data) => {
    console.log(data);
  });

  socket.emit("receive_message", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server run on ${process.env.PORT}`),
);
