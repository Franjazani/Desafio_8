import express from 'express';
import morgan from 'morgan';
import server from "./services/server.js";
import { initWsServer, getWsServer } from "./services/socket.js";
import { DBService } from '../services/DBServer';
const PORT = 8080;

const app = express();

const init = async () => {
  await DBService.init();
  initWsServer(server);
  server.listen(PORT, () => console.log(`Server en el puertp ${PORT}`));
  server.on("error", (error) => {
    console.log("Server catch!", error);
  });
};

init();