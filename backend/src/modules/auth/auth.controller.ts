import { Request, Response } from "express";

import authService from "./auth.service";

import { asyncHandler } from "../../shared/utils/async-handler";

import { sendSuccess } from "../../shared/response/api-response";
import { HTTP_STATUS } from "../../shared/constants/http_status";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);

    return sendSuccess(
      res,
      HTTP_STATUS.CREATED,
      "User registered successfully.",
      user
    );
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    return sendSuccess(
      res,
      HTTP_STATUS.OK,
      "Login successful.",
      result
    );
  });
}

export default new AuthController();

