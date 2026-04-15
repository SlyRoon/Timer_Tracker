import 'dotenv/config';
import { app } from './app.js';
import { connectToMongoDB } from './shared/database/mongo-connection.js';

const port = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectToMongoDB();

    app.listen(port, () => {
      console.log(`Time Tracker API is running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup failed', error);
    process.exit(1);
  }
};

void startServer();
