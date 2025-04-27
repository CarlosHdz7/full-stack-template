import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // O donde esté tu servidor

export default socket;
