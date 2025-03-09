import express from "express";
import "dotenv/config";
import cors from "cors";
import conncetDb from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(
  cors({
    origin: process.env.BASE_URL, //allows request from specific frontend domain
    credentials: true, // Allows the browser to send cookies and authentication headers
    methods: ["GET", "POST", "DELETE", "OPTIONS"], // Specifies which HTTP methods are allowed
    allowedHeaders: ["Content-Type", "Authorization"], // Specifies which HTTP methods are allowed
    //allows sending JSON or Form data.allows sending authentication tokens (like JWT)
  })
);
app.use(express.json()); //Deserialization of json data
app.use(express.urlencoded({ extended: true })); //Deserialization of form data

//routes
app.use("/api/v1/user", userRoutes);

//Database connection
conncetDb();

//server start
app.listen(PORT, () => {
  console.log(`App is listning on port: ${PORT}`);
});
