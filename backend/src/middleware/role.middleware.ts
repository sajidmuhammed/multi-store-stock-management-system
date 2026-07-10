import { NextFunction, Request, Response } from "express";

import { UserRole } from "../modules/auth/user.role.enum";
import { HTTP_STATUS } from "../shared/constants/http_status";
import { ERROR_CODES } from "../shared/constants/error_codes";
import { AppError } from "../shared/constants/app_error";

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication required.",
        ERROR_CODES.UNAUTHORIZED
      );
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        "Access denied.",
        ERROR_CODES.FORBIDDEN
      );
    }

    next();
};

