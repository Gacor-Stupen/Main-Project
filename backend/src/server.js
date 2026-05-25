import express from "express";
import env from "dotenv";
env.config();
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT;

// ekstrak json data from body
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",

    // Izinkan pengiriman cookie/headers kredensial
    credentials: true,

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
  connectDB();
});
