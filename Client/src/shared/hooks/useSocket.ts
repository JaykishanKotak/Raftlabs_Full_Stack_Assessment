import { useEffect, useCallback, useRef } from 'react';
import { useAppSelector } from '@/app/hooks';

export const useSocket = () => {
  const user = useAppSelector((state) => state.auth.userDetails);
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (!user?.id) return;

    // Use environment variable if available, otherwise default to localhost:5000
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';

    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('🔌 Connected to WebSocket server');
      ws.send(
        JSON.stringify({
          type: 'IDENTIFY',
          userId: user.id,
        }),
      );
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('📨 WebSocket message received:', message);

        // Dispatch a custom event so any component can listen
        window.dispatchEvent(
          new CustomEvent('socket-message', { detail: message }),
        );
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('❌ Disconnected from WebSocket server');
      // Reconnect after a delay
      setTimeout(connect, 5000);
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      ws.close();
    };

    socketRef.current = ws;
  }, [user?.id]);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  return socketRef.current;
};
