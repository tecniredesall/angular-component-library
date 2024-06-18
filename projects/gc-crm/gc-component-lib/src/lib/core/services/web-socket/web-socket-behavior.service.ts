import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {
  SocketConfig,
  SocketConnection,
} from '../../models/web-socket/web-socket.model';
import { SocketConnectionClass } from '../../classes/web-socket/web-socket.class';
import { DefaultEventsMap } from '@socket.io/component-emitter';

@Injectable({
  providedIn: 'root',
})
export class WebSocketBehaviorService {
  private connections: Array<SocketConnectionClass> = [];

  constructor() {}

  public getConnection(config: SocketConfig) {
    const connection = this.fetchOrCreateConnection(config);
    connection.activeConnections++;

    return connection;
  }

  public closeConnection(connection: SocketConnectionClass) {
    connection.activeConnections--;

    if (connection.activeConnections > 0) {
      return;
    }

    this.closeSocket(connection.socket);
    const index = this.connections.findIndex(
      ({ key }) => key === connection.key
    );
    this.connections.splice(index, 1);
  }

  private fetchOrCreateConnection(config: SocketConfig): SocketConnectionClass {
    let connection = this.connections.find(({ key }) => key === config.key);

    if (!connection) {
      connection = this.createConnection(config);
    }

    return connection;
  }

  private createConnection(config: SocketConfig): SocketConnectionClass {
    const socket = this.connectSocket(config);

    const connectionData: SocketConnection = {
      ...config,
      socket,
      activeConnections: 0,
    };

    const connection = new SocketConnectionClass(connectionData);

    this.connections.push(connection);
    return connection;
  }

  private closeSocket(socket: any) {
    socket.disconnect();
  }

  private connectSocket(
    config: SocketConfig
  ): Socket<DefaultEventsMap, DefaultEventsMap> {
    return io(config.baseUrl, {
      path: config.path,
      query: config.query,
    });
  }
}
