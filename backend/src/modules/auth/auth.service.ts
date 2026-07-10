import { UserModel } from "./user.model";
import { RegisterInput, LoginInput } from "./auth.validation";
import { hashPassword, comparePassword } from "../../shared/utils/password";
import { generateToken } from "../../shared/utils/jwt";
import { AppError } from "../../shared/errors/app_error";
import { HTTP_STATUS } from "../../shared/constants/http_status";
import { ERROR_CODES } from "../../shared/constants/error_codes";
import { UserRole } from "./user.role.enum";

class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await UserModel.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        "Email already exists.",
        ERROR_CODES.EMAIL_ALREADY_EXISTS
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: UserRole.SHOPPER,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(data: LoginInput) {
    const user = await UserModel.findOne({
      email: data.email,
    });

    if (!user) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid email or password.",
        ERROR_CODES.INVALID_CREDENTIALS
      );
    }

    const passwordMatched = await comparePassword(
      data.password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid email or password.",
        ERROR_CODES.INVALID_CREDENTIALS
      );
    }

    const token = generateToken({
      userId: user.id,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

export default new AuthService();