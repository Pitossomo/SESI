import { Logger } from '@nestjs/common'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class VehicleGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server
  private logger: Logger = new Logger('WebSocket-Vehicle-Gateway')

  afterInit(server: any) {
    this.logger.log('Websocket iniciado')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectou-se: ${client.id}`)
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliente desconectou-se: ${client.id}`)
  }

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() body, client: Socket, payload: any): void {
    console.log(body)
    // this.server.emit('msgToClient', payload)
  }
}
