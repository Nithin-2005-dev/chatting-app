import express from "express";
import dotenv from "dotenv";
import { dbconfig } from "./database/dbConfig.js";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
dotenv.config();
//database connection
dbconfig();
const app = express();
//middlewares
app.use(express.json());
//routes
app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);
app.listen(process.env.PORT, () => {
  console.log("server is listening...");
});
