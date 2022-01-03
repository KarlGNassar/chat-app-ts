import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

enum Events {
  connection = "connection",
}

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);

  io.on(Events.connection, (socket: Socket) => {
    logger.info(`user connected ${socket.id}`);
  });
}

export default socket;
