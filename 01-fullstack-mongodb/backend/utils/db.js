import mongoose from "mongoose";
import "dotenv/config";

//export a function that connects to db

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`connected to MongoDB`);
    })
    .catch((err) => {
      console.log(`Error connecting to MongoDB`);
    });
};

export default db;
