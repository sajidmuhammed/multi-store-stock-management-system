import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { JwtPayload } from "../../modules/auth/type";

export const generateToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, config.jwtSecret, {expiresIn: "1d"});
};

export const verifyToken = (
  token: string
): JwtPayload => {

  return jwt.verify(
    token,
    config.jwtSecret
  ) as JwtPayload;
};
