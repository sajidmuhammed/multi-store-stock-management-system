import app from './app';
import { config } from './config/env';
import { connectDatabase } from './config/database';

const beginServer = async() => {
    try {
        await connectDatabase(); // make sure database 
        // connected for furtherc ases
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        })
    } catch(error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
}

beginServer();


