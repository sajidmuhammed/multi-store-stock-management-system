import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { HTTP_STATUS } from "./shared/constants/http_status";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import productRoutes from "./modules/product/product.routes";
import storeRoutes from "./modules/store/store.routes";
import inventoryRoutes from "./modules/inventory/inventory.routes";
import { setupSwagger } from "./config/swagger";

const app = express();

//middleware - global

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded( { extended: true} ));

setupSwagger(app);

//health check api

app.get('/health', (_req, res) => {
    res.status(HTTP_STATUS.OK).json({ success: true,
         message: 'Server is healthy' });
})

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/inventory", inventoryRoutes);

app.use(errorHandler)


export default app;

