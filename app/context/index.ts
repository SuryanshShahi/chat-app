import { createContext, Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
interface IGlobalContext {
  [key: string]: any;
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
  messages: {
    [key: string]: {
      message: string;
      id: string;
      createdAt: string;
      type: string;
      targetUserId?: string;
    }[];
  };
  user: { id: string; createdAt: string; type: string; name: string }[] | null;
}>({
  socket: null,
  messages: {},
  user: null,
});

export default AppContext;
