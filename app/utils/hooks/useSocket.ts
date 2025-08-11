import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { decodeToken } from "../constants";
import { getCookie } from "../cookies";
import { localStorageKeys } from "../enum";

export default function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const token = getCookie(localStorageKeys.AUTH_TOKEN);
    const decodedToken = decodeToken(token?.accessToken);

    const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
      auth: { token: token?.accessToken },
      transports: ["websocket"], // ensure websocket-only
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setIsConnected(true);
      socket.emit("register", {
        userId: decodedToken?.userId,
        name: decodedToken?.name,
      });
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Socket disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
      setIsConnected(false);
    });

    const interval = setInterval(() => {
      if (socket.connected) {
        socket.emit("ping-alive");
      }
    }, 30000); // every 30 sec

    return () => {
      clearInterval(interval);
      socket.disconnect();
      setIsConnected(false);
    };
  }, []);

  const result = isConnected ? socketRef.current : null;

  return result;
}
