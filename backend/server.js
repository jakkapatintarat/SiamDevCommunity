const { connectDB, setupApp } = require('./config/app');
const routes = require('./index.route');

const startServer = async () => {
    try {
        // Setup app and get server instance
        const { app, server, PORT } = setupApp();

        // Connect to database
        await connectDB();

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