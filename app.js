import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { connectionPool } from "./conn.js";
import DocumentRouter from "./routes/DocumentRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const DOCKER_PORT = process.env.DOCKER_PORT;
const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectionPool.once("open", () => {
  app.use("/api", DocumentRouter);

  app.listen(DOCKER_PORT, () => {
    console.log("Server Running on port " + DOCKER_PORT);
  });
});

connectionPool.on("error", (err) => {
  console.error("Failed to connect to the database", err);
  process.exit(1);
});
