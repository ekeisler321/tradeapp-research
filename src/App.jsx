
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001");


function App() {
  const [trade, setTrade] = useState("");
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    socket.on("tradeHistory", (history) => {
      setTrades(history);
    });

    return () => {
      socket.off("tradeHistory");
    };

  }, []);

  
  function addTrade() {
    if (trade.trim() === "") return;

    socket.emit("addTrade", trade);
    setTrade("");
  }

  return (
    <div style={{ padding: "45px" }}>
      <h1>TradeApp - Research Prototype</h1>
      <h2>Trading Journal</h2>

      <input
        type="text"
        placeholder="Enter trade value..."
        value={trade}
        onChange={(e) => setTrade(e.target.value)}
      />

      <button onClick={addTrade}>Add Trade</button>

      <h3>Trade History</h3>
      {trades.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
    
  );
}


export default App;
