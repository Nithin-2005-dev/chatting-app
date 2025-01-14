import express from "express";
import dotenv from "dotenv";
import { dbconfig } from "./database/dbConfig.js";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { messageRouter } from "./routes/message.routes.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
dotenv.config();
//database connection
dbconfig();
const app = express();
export const server = createServer(app);
export const io=new Server(server,{
  cors:{
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }
})
io.on("connection",(socket)=>{
  console.log("user connected",socket.id);
  socket.on("newMessage",(message)=>{
    io.emit("messageFound",message)
  })
})
//middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST","PUT"],
  credentials: true,
}));
//routes
app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/message", messageRouter);
server.listen(process.env.PORT, () => {
  console.log("server is listening...");
});
