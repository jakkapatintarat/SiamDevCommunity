const setupServer = require('./config/server');
const setupMiddleware = require('./config/middleware');
const setupSocket = require('./config/socket');
const connectDB = require('./config/database');
const routes = require('./index');

const startServer = async () => {
    try {
        // Setup server
        const { app, server, PORT } = setupServer();

        // Setup middleware
        setupMiddleware(app);

        // Connect to database
        await connectDB();

        // Setup socket
        setupSocket(server);

        // Setup routes
        app.use('/api', routes);

        // Start server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 