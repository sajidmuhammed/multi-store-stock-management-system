import { Router } from "express";

import productController from "./product.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createProductSchema } from "./product.validation";
import { UserRole } from "../auth/user.role.enum";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(createProductSchema),
  productController.createProduct
);

router.get(
  "/",
  authenticate,
  productController.getProducts
);

router.get(
  "/:id",
  authenticate,
  productController.getProductById
);

export default router;
