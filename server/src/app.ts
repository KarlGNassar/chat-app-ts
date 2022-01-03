import express, { Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import { version } from "../package.json";

import socket from "./socket";

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res: Response) => {
  res.send(`server is running.. 🏃‍♂️ version: ${version}`);
});

httpServer.listen(port, host, () => {
  logger.info(`listening on http://${host}:${port} version: ${version}`);

  socket({ io });
});
