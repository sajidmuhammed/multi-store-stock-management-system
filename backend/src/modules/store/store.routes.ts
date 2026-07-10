import { Router } from "express";

import storeController from "./store.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";

import { createStoreSchema } from "./store.validation";
import { UserRole } from "../auth/user.role.enum";

const router = Router();

router.post(
  "/",
  authenticate,
 authorize(UserRole.ADMIN),
  validate(createStoreSchema),
  storeController.createStore
);

router.get(
  "/",
  authenticate,
  storeController.getStores
);

router.get(
  "/:id",
  authenticate,
  storeController.getStoreById
);

export default router;

