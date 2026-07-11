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

/**
 * @openapi
 * /api/inventory/adjust:
 *   patch:
 *     tags:
 *       - Inventory
 *     summary: Adjust Inventory
 *     description: Increase or decrease stock.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdjustStockRequest'
 *     responses:
 *       200:
 *         description: Stock adjusted successfully.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

router.patch(
  "/adjust",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(adjustStockSchema),
  inventoryController.adjustStock
);

/**
 * @openapi
 * /api/inventory/transfer:
 *   post:
 *     tags:
 *       - Inventory
 *     summary: Transfer Stock
 *     description: Transfer stock between stores atomically.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferStockRequest'
 *     responses:
 *       200:
 *         description: Stock transferred successfully.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

router.post(
  "/transfer",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(transferStockSchema),
  inventoryController.transferStock
);


/**
 * @openapi
 * /api/inventory:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Get Inventory
 *     description: Returns inventory. Optional threshold filters low stock.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory fetched successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

router.get(
  "/",
  authenticate,
  inventoryController.getInventory
);

export default router;