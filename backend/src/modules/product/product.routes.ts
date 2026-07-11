import { Router } from "express";

import productController from "./product.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createProductSchema } from "./product.validation";
import { UserRole } from "../auth/user.role.enum";

const router = Router();

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create Product
 *     description: Creates a new product.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: Product created successfully.
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
  validate(createProductSchema),
  productController.createProduct
);

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get Products
 *     description: Returns all products.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

router.get(
  "/",
  authenticate,
  productController.getProducts
);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get Product By Id
 *     description: Returns a product by id.
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
 *         description: Product fetched successfully.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

router.get(
  "/:id",
  authenticate,
  productController.getProductById
);

export default router;
