import { Router } from "express";

import inventoryController from "./inventory.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";

import {
  adjustStockSchema,
  transferStockSchema,
} from "./inventory.validation";

import { UserRole } from "../auth/user.role.enum";

const router = Router();

router.patch(
  "/adjust",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(adjustStockSchema),
  inventoryController.adjustStock
);

router.post(
  "/transfer",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(transferStockSchema),
  inventoryController.transferStock
);

router.get(
  "/",
  authenticate,
  inventoryController.getInventory
);

export default router;