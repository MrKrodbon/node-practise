import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

initMongoDB();
startServer();
