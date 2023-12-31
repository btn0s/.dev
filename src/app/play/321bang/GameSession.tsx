'use client';

import { ReactNode, useEffect, useRef } from 'react';

import { io, Socket } from 'socket.io-client';

import { FullScreenMobileView } from '@/app/components/FullScreenMobileView';

const LoadingScreen = () => {
  return (
    <FullScreenMobileView>
      <div className="flex h-full flex-col items-center justify-center">
        Loading session...
      </div>
    </FullScreenMobileView>
  );
};

export function GameSession({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only instantiate the socket if it doesn't exist.
    if (!socketRef.current) {
      socketRef.current = io(`${process.env.NEXT_PUBILC_API_URL}/socket.io`, {
        transports: ['websocket'],
      });
    }

    socketRef.current.emit('join', id);

    return () => {
      // Disconnect the socket when the component is unmounted.
      socketRef.current?.disconnect();
    };
  }, [id]);

  return <div>{children}</div>;
}
