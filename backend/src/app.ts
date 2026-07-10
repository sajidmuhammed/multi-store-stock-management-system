import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { HTTP_STATUS } from "./shared/constants/http_status";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

//middleware - global

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded( { extended: true} ));

//health check api

app.get('/health', (_req, res) => {
    res.status(HTTP_STATUS.OK).json({ success: true,
         message: 'Server is healthy' });
})

app.use(errorHandler)


export default app;