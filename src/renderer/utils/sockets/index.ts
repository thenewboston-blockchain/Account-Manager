import ReconnectingWebSocket from 'reconnecting-websocket';

const initializeSockets = (accountNumbers: string[], bankSocketAddress: string) => {
  const sockets: any = accountNumbers.map(
    (accountNumber) => new ReconnectingWebSocket(`${bankSocketAddress}/ws/confirmation_blocks/${accountNumber}`),
  );
  return sockets;
};

export default initializeSockets;
