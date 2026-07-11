import { Router } from "express";

import storeController from "./store.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";

import { createStoreSchema } from "./store.validation";
import { UserRole } from "../auth/user.role.enum";

const router = Router();

/**
 * @openapi
 * /api/stores:
 *   post:
 *     tags:
 *       - Stores
 *     summary: Create Store
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStoreRequest'
 *     responses:
 *       201:
 *         description: Store created successfully.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 */

router.post(
  "/",
  authenticate,
 authorize(UserRole.ADMIN),
  validate(createStoreSchema),
  storeController.createStore
);

/**
 * @openapi
 * /api/stores:
 *   get:
 *     tags:
 *       - Stores
 *     summary: Get Stores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stores fetched successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

router.get(
  "/",
  authenticate,
  storeController.getStores
);

/**
 * @openapi
 * /api/stores/{id}:
 *   get:
 *     tags:
 *       - Stores
 *     summary: Get Store By Id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store fetched successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

router.get(
  "/:id",
  authenticate,
  storeController.getStoreById
);

export default router;

