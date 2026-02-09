import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

class SocketService {
  private wss: WebSocketServer | null = null;
  private clients: Map<string, WebSocket[]> = new Map();

  init(server: Server) {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('🔌 WebSocket client connected');

      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          if (message.type === 'IDENTIFY' && message.userId) {
            const userClients = this.clients.get(message.userId) || [];
            userClients.push(ws);
            this.clients.set(message.userId, userClients);
            console.log(
              `👤 User ${message.userId} identified on WebSocket (Tabs: ${userClients.length})`,
            );
          }
        } catch (error) {
          console.error('❌ Error processing WS message:', error);
        }
      });

      ws.on('close', () => {
        // Remove from clients map
        for (const [userId, userClients] of this.clients.entries()) {
          const index = userClients.indexOf(ws);
          if (index !== -1) {
            userClients.splice(index, 1);
            if (userClients.length === 0) {
              this.clients.delete(userId);
            }
            console.log(`❌ User ${userId} disconnected a tab`);
            break;
          }
        }
      });
    });
  }

  sendToUser(userId: string, data: any) {
    const userClients = this.clients.get(userId);
    if (userClients && userClients.length > 0) {
      userClients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
      return true;
    }
    return false;
  }

  broadcast(data: any) {
    if (!this.wss) return;
    const message = JSON.stringify(data);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

export const socketService = new SocketService();
