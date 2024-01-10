import { create } from "zustand";
import { Socket } from "socket.io-client";

export type NetworkState = {
  socket: Socket | null;
  setSocket: (newSocket: Socket) => void;
  resetSocket: () => void;

  emit: (event: string, ...args: any[]) => void;

  connectionState: string;
  setConnectionState: (newConnectionState: string) => void;

  error: string | null;
  setError: (newError: string) => void;

  canvasIsDirty: boolean;
  setCanvasIsDirty: (newCanvasIsDirty: boolean) => void;
};

export const useNetworkState = create<NetworkState>((set, get) => ({
  socket: null,
  setSocket: (newSocket) => {
    set({ socket: newSocket });
  },
  resetSocket: () => set({ socket: null }),

  emit: (event, ...args) => {
    const { socket } = get();
    console.log("Emitting", event, ...args);
    if (socket != null && socket.connected) {
      console.log("Emitted", event, ...args);
      socket.emit(event, ...args);
    }
  },

  connectionState: "disconnected",
  setConnectionState: (newConnectionState) => {
    set({ connectionState: newConnectionState });
  },

  error: null,
  setError: (newError) => {
    set({ error: newError });
  },

  canvasIsDirty: false,
  setCanvasIsDirty: (newCanvasIsDirty) => {
    set({ canvasIsDirty: newCanvasIsDirty });
  },
}));
