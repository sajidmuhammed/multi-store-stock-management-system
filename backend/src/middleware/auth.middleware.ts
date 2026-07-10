import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../shared/utils/jwt";

import { AppError } from "../shared/constants/app_error";
import { HTTP_STATUS } from "../shared/constants/http_status";
import { ERROR_CODES } from "../shared/constants/error_codes";

export const authenticate = (
  req: Request, _res: Response,
    next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {

    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      "Authentication required.",
      ERROR_CODES.UNAUTHORIZED
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = verifyToken(token);

    next();
  } catch {
    throw new AppError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid or expired token.",
      ERROR_CODES.UNAUTHORIZED
    );
  }
};

