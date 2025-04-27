import { useSocket } from '@hooks/useSocket';
import { useEffect, useState } from 'react';

const Chat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit('message', 'Hola desde el cliente!');
  };

  return (
    <div>
      <button onClick={sendMessage}>Enviar Mensaje</button>
      {messages.map((m, idx) => (
        <p key={idx}>{m}</p>
      ))}
    </div>
  );
};

export default Chat;
