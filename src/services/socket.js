import { formatMessages } from "../utils/messages.js";
import { DBService } from '../services/DBServer';
import { Server } from "socket.io";

let tablaVinos = "products";
let messagesTable = "messages";

const productData = {
      nombre: undefined,
      descripcion:undefined,
      stock: undefined,
      precio: undefined,
};

let io;

export const initWsServer = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("NewConnection", async () => {
      socket.emit("welcome", "Bienvenido!");
    });

    //mensaje por un nuevo producto
    socket.on("addProduct", async (newProduct) => {
      productData.nombre = newProduct.nombre;
      productData.descripcion = newProduct.descripcion;
      productData.stock = newProduct.stock;
      productData.precio = newProduct.precio;
        
      const newId = await DBService.create(tablaVinos, productData);
      const productAdded = await DBService.getById(tablaVinos, newId);
      io.emit("lastProduct", productData);
    });

    //Escuchando los mensajes del Chat
    socket.on("sendMesssage", async (message) => {
      io.emit("lastMessage", formatMessages(message));

      try {
        const newId = await DBService.create(
          messagesTable,
          formatMessages(message)
        );
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
};

export const getWsServer = () => {
  return io;
};