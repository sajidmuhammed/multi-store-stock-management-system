import mongoose from "mongoose";
import { config } from "./env";
import { logger } from "../shared/logger/logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);

    logger.info("Mongo connected successfully");
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error}`);

    process.exit(1);
  }
};

