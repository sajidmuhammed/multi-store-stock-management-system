import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/constants/app_error";
import { sendError } from "../shared/response/api-response";
import { HTTP_STATUS } from "../shared/constants/http_status";
import { ERROR_CODES } from "../shared/constants/error_codes";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (error instanceof AppError) {

    return sendError(
      res,
      error.statusCode,
      error.errorCode,
      error.message
    );

  }

  console.error(error);

  return sendError(
    res,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ERROR_CODES.INTERNAL_SERVER_ERROR,
    "Something went wrong."
  );
                      

};

