// import logo from './logo.svg';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect, useState } from 'react';

const client = new W3CWebSocket('ws://127.0.0.1:4000');
window.client = client;

function App() {
  const [products, setProducts] = useState(['Initial state']);

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      // console.log(message.data);
      setProducts((products) => [...products, message.data]);
    };
  }, []);

  function sendMessage() {
    client.send('message')
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {
          products && products.map((product) => (
            <div key={product}>
              { product }
            </div>
          ))
        }
        <button onClick={sendMessage}>Send Message</button>
      </header>
    </div>
  );
}

export default App;
