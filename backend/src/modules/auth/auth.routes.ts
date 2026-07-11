import { Router } from "express";

import authController from "./auth.controller";

import {
  loginSchema,registerSchema,
} from "./auth.validation";

import { validate } from "../../middleware/validate.middleware";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new shopper
 *     description: Creates a new shopper account.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 */

router.post(
        "/register",
         validate(registerSchema),
        authController.register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login User
 *     description: Authenticate a user and return a JWT.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

router.post(
        "/login",
         validate(loginSchema),
        authController.login
);

export default router;