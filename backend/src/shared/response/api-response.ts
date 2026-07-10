import { Response } from "express";

export const sendSuccess = (
  res: Response,statusCode: number,
  message: string, data: unknown = null
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response, statusCode: number,
  errorCode: string,message: string
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
    },
  });
};

