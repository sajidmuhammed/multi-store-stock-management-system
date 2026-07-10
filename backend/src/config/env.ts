import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET"
] as const;

requiredEnvVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
})

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
};