import socket from '@sockets/socket';
import { createContext, useContext } from 'react';

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);
