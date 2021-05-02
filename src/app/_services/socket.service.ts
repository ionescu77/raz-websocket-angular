import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  connection$: WebSocketSubject<any>;

  constructor() { }

  connect(): Observable<any> {
    this.connection$ = webSocket({
                                url: `${env.socket_endpoint}`,
                                deserializer: (data) => data,
                                serializer: (data) => data,
                                });
    console.log("Successfully connected: " + env.socket_endpoint);
    return this.connection$;
  }

  send(data: any): void {
    if (this.connection$) {
      this.connection$.next(data);
      console.log("Sending: " + data);
    } else {
      console.log('Did not send data, unable to open connection');
    }
  }

  closeConnection(): void {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$= null;
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }

}
