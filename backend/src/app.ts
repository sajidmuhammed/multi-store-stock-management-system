import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

//middleware - global

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded( { extended: true} ));

//health check api

app.get('/health', (_req, res) => {
    res.status(200).json({ success: true,
         message: 'Server is healthy' });
})


export default app;