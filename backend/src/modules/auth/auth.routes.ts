import { Router } from "express";

import authController from "./auth.controller";

import {
  loginSchema,registerSchema,
} from "./auth.validation";

import { validate } from "../../middleware/validate.middleware";

const router = Router();

router.post(
        "/register",
         validate(registerSchema),
        authController.register
);

router.post(
        "/login",
         validate(loginSchema),
        authController.login
);

export default router;