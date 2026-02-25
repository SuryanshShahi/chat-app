"use client";
import { useCallback, useEffect, useState } from "react";
import AppContext from "../context";
import useSocket from "../utils/hooks/useSocket";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}
export type ChatMessage = {
  message: string;
  createdAt: string;
  type: "private_message" | "message" | "user_joined";
  senderUserId?: string;
  targetUserId?: string;
  userId?: string; // for broadcast/user_joined payloads
  name?: string;
};
export default function ClientLayoutWrapper({
  children,
}: ClientLayoutWrapperProps) {
  const socket = useSocket();

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [user, setUser] = useState<
    { id: string; name: string; createdAt: string; type: string }[] | null
  >(null);

  const onMessageReceived = useCallback((payload: any) => {
    const data = typeof payload === "string" ? JSON.parse(payload) : payload;
    console.log("🚀 ~ ClientLayoutWrapper ~ data:", data)

    if (data.type === "private_message") {
      const ids = [data.senderUserId, data.targetUserId].sort();
      const conversationKey = `${ids[0]}-${ids[1]}`;

      setMessages((prev) => ({
        ...prev,
        [conversationKey]: [...(prev[conversationKey] || []), data],
      }));
      return;
    }

    if (data.type === "message") {
      const conversationKey = data.userId; // public/global stream bucket
      setMessages((prev) => ({
        ...prev,
        [conversationKey]: [...(prev[conversationKey] || []), data],
      }));
      return;
    }

    if (data.type === "user_joined") {
      setUser((prev) => [...(prev || []), data]);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("private:message", onMessageReceived);
    socket.on("event:message", onMessageReceived);

    return () => {
      socket.off("private:message", onMessageReceived);
      socket.off("event:message", onMessageReceived);
    };
  }, [socket, onMessageReceived]);

  return (
    <AppContext.Provider value={{ socket, messages, user }}>
      {children}
    </AppContext.Provider>
  );
}
