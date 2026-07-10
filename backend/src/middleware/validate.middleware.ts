import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

import { AppError } from "../shared/errors/app_error";
import { HTTP_STATUS } from "../shared/constants/http_status";
import { ERROR_CODES } from "../shared/constants/error_codes";

export const validate =
  (schema: ZodObject) =>
     (req: Request, _res: Response, next: NextFunction) => {
    try {

      req.body = schema.parse(req.body);

      next();
    } catch (error) {

      if (error instanceof ZodError) {
        throw new AppError(
          HTTP_STATUS.BAD_REQUEST,
          error.issues[0].message,
          ERROR_CODES.VALIDATION_ERROR
        );
      }

      next(error);
    }
  };

  