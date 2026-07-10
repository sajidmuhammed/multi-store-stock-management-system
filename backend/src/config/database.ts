import mongoose from "mongoose";
import { config } from "./env";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);

    console.log("Mongo connected successfully");
  } catch (error) {
    console.error(error, "MongoDB connection failed");

    process.exit(1);
  }
};

