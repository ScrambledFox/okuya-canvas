import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Container from "../../ui/container";
import { useNetworkState } from "@/state/network/networkState";

let socket;

const SocketHandler = () => {
  const [error, setError] = useState("");
  const [connectionState, setConnectionState] = useState("disconnected");

  // useEffect(() => {
  //   const newSocket = io(
  //     // `https://joris-lodewijks-okuya-connect-staging.glb.edgio.link/`
  //     "http://dev.connect.okuya.jorislodewijks.nl/"
  //   );

  useEffect(() => {
    socketInit();
  }, []);

  const socketInit = async () => {
    await fetch("api/socket");
    socket = io();

    socket.on("connect_error", (err) => {
      console.log(err);
      setError(err.message);
      setConnectionState("disconnected");
    });

    socket.on("connect", () => {
      console.log("connected");
      setError("");
      setConnectionState("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setConnectionState("disconnected");
    });
  };

  return (
    <Container className="left-0 bottom-0">
      <div className="justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">Connection</h1>
      </div>

      <div className="flex flex-col items-center">
        {connectionState === "connected" && (
          <div className="flex flex-row items-center">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <p className="ml-2">Connected</p>
          </div>
        )}

        {connectionState === "disconnected" && (
          <div className="flex flex-row items-center">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <p className="ml-2">Disconnected</p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex flex-col items-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </Container>
  );
};

export default SocketHandler;
