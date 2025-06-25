import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/db";
import { PORT } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/auth-routes";
import jobRouter from "./routes/jobs-routes";
import userRouter from "./routes/users-routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use("/auth", authRouter);
app.use("/job", jobRouter);
app.use("/user", userRouter);

// handling error
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("application started in port:", PORT);
  dbConnection();
});
