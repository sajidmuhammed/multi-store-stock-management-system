import bcrypt from "bcrypt";
import { UserModel } from "../modules/auth/user.model";
import { config } from "../config/env";
import { UserRole } from "../modules/auth/user.role.enum";
import { logger } from "../shared/logger/logger";


export const seedAdmin = async () => {

    const adminExists = await UserModel.findOne({
        email: config.adminEmail,
    });

    if (adminExists) return;

    const password = await bcrypt.hash(
        config.adminPassword,
        config.saltRounds
    );

    await UserModel.create({

        name: config.adminName,
        email: config.adminEmail,
        password,
        role: UserRole.ADMIN,

    });

    logger.info("Default admin created.");

};
