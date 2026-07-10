import app from './app';
import { config } from './config/env';
import { connectDatabase } from './config/database';
import { seedAdmin } from './scripts/seed-admin';
import { logger } from './shared/logger/logger';

const beginServer = async() => {
    try {
        await connectDatabase(); // make sure database 
        logger.info("MongoDB connected successfully.");
        // connected for furtherc ases

        await seedAdmin(); //used for adding an admin from env
        app.listen(config.port, () => {
            logger.info(`Server is running on port ${config.port}`);
        })
    } catch(error) {
        logger.error(`Failed to start server${error}`);
        process.exit(1);
    }
}

beginServer();


