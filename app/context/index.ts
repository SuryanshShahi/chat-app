import { createContext, Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { ChatMessage } from "../components/ClientLayoutWrapper";
interface IGlobalContext {
  [key: string]: unknown;
}

export const GlobalContext = createContext<{
  data: IGlobalContext;
  setData: Dispatch<SetStateAction<IGlobalContext>>;
}>({
  data: {},
  setData: () => {},
});


const AppContext = createContext<{
  socket: Socket | null;
  messages: Record<string, ChatMessage[]>;
  user: { id: string; createdAt: string; type: string; name: string }[] | null;
}>({
  socket: null,
  messages: {},
  user: null,
});

export default AppContext;
