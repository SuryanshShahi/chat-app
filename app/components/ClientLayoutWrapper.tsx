"use client";
import { useCallback, useEffect, useState } from "react";
import AppContext from "../context";
import useSocket from "../utils/hooks/useSocket";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({
  children,
}: ClientLayoutWrapperProps) {
  const socket = useSocket();

  const [messages, setMessages] = useState<{
    [key: string]: {
      message: string;
      id: string;
      createdAt: string;
      type: string;
      targetUserId?: string;
    }[];
  }>({});
  const [user, setUser] = useState<
    { id: string; name: string; createdAt: string; type: string }[] | null
  >(null);

  const onMessageReceived = useCallback((data: any) => {
    if (data.type === "private_message") {
      let conversationKey;
      if (data.targetUserId) {
        const ids = [data.id, data.targetUserId].sort();
        conversationKey = `${ids[0]}-${ids[1]}`;
        console.log("🚀 ~ ClientLayoutWrapper ~ received data:", conversationKey);
      } else {
        conversationKey = data.id;
      }

      setMessages((prev) => ({
        ...prev,
        [conversationKey]: [...(prev[conversationKey] || []), data],
      }));
    } else if (data.type === "user_joined") {
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
