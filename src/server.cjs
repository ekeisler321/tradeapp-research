
const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const trades = [];

io.on("connection", (socket) => {
  console.log("Browser connected:", socket.id);

  socket.emit("tradeHistory", trades);

  socket.on("addTrade", (trade) => {
    if (typeof trade !== "string" || !trade.trim()) return;

    trades.push(trade.trim());
    io.emit("tradeHistory", trades);
  });

  socket.on("disconnect", () => {
    console.log("Browser disconnected:", socket.id);
  });
});

console.log("Socket.IO server running on port 3001");
