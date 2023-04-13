import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Map<string, Socket> = new Map()

  @WebSocketServer()
  server: Server

  handleConnection(socket: Socket) {
    this.clients.set(socket.id, socket)
  }

  handleDisconnect(socket: Socket) {
    this.clients.delete(socket.id)
  }

  sendToClient(clientId: string, event: string, message: any) {
    const socket = this.clients.get(clientId)
    if (socket) {
      socket.emit(event, message)
    }
  }
}
