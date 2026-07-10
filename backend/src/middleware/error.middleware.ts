import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../shared/errors/app_error";
import { sendError } from "../shared/response/api-response";
import { HTTP_STATUS } from "../shared/constants/http_status";
import { ERROR_CODES } from "../shared/constants/error_codes";
import { logger } from "../shared/logger/logger";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  logger.error(`Error: ${error.message}`);

  if (error instanceof AppError) {
    return sendError(
      res,
      error.statusCode,
      error.errorCode,
      error.message
    );
  }

  if (error instanceof ZodError) {
    return sendError(
      res,
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      error.issues[0].message
    );
  }

  return sendError(
    res,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ERROR_CODES.INTERNAL_SERVER_ERROR,
    "Internal server error."
  );
};

