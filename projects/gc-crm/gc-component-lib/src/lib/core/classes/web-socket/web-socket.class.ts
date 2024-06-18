import { BehaviorSubject, Observable } from 'rxjs';
import { SocketConnection } from '../../models/web-socket/web-socket.model';

export class SocketConnectionClass implements SocketConnection {
  public baseUrl = '';
  public path = '';
  public activeConnections = 0;
  public query;
  public socket;
  public key;

  constructor(private config: SocketConnection) {
    this.baseUrl = this.config.baseUrl;
    this.path = this.config.path;
    this.query = this.config.query;
    this.socket = this.config.socket;
    this.key = this.config.key;
    this.activeConnections = this.config.activeConnections;
  }

  public getEvent(event: string): Observable<any> {
    // Response for event
    const responses$: BehaviorSubject<any> = new BehaviorSubject('');

    this.socket.on(event, (message) => {
      responses$.next(message);
    });

    return responses$.asObservable();
  }

  public closeConnection(): void {
    this.activeConnections--;

    if (this.activeConnections === 0) {
      this.closeSocketConnection();
    }
  }

  private closeSocketConnection() {
    this.socket.close();
  }
}
