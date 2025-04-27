import { useSocketContext } from '@contexts/socketContext';

export const useSocket = () => {
  const socket = useSocketContext();
  return socket;
};
