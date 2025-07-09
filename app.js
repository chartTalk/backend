import express from "express";
import cors from "cors";
import uploadRouter from "./routes/upload.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api", uploadRouter);

export default app;
