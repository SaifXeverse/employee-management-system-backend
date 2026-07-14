import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/authRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { initSocket } from "./socket.js";

dotenv.config();

const PORT = 5000;
const app = express();
const server = createServer(app);
initSocket(server);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoute);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
