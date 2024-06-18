import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export interface SocketConfig {
  key: string;
  baseUrl: string;
  path: string;
  query?: { [key: string]: any };
  socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export interface SocketConnection extends SocketConfig {
  activeConnections: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
