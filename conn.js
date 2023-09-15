import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionParam = process.env.MONGO_CONNECTION;

mongoose.connect(connectionParam, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectionPool = mongoose.connection;

connectionPool.on("connected", () => {
  console.log("Connected to the database");
});

connectionPool.on("error", (err) => {
  console.error("Failed to connect to the database", err);
  process.exit(1);
});

export { connectionPool };
