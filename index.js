import express from "express";
import dotenv from "dotenv";
import "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { verify, jwt } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();
const app = express();
const port = process.env.PORT;

//Middleware
app.use(express.json());

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
