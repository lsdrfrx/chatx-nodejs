import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger: Logger = new Logger();

  @SubscribeMessage('newMessage')
  handleNewMessage(client: any, payload: any) {
    this.server.emit(
      'fetchMessage',
      JSON.stringify({
        user: client.id,
        message: payload,
      }),
    );
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.server.emit('userConnected', `Client connected: ${client.id}`);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.server.emit('userDisconnected', `Client connected: ${client.id}`);
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
