import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import uploadRoutes from "./routes/upload.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();



app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/upload", uploadRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);


export default app;