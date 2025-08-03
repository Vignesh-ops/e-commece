import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
dbconnect();