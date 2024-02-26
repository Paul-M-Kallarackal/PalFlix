const Hapi = require('hapi');
const server = new Hapi.Server();
const Logger = require('./logConnection');
server.connection({
    host: 'localhost',
    port: 3000,
    routes: {
        cors: true
    }
});

function initializeServer() {
    server.start((err) => {
        if (err) {
            throw err;
        }
        Logger.info(`Server running at: ${server.info.uri}`);
    });
}

process.on('SIGTSTP', () => {
    server.stop({ timeout: 10000 }).then(() => {
        Logger.info('Server stopped');
        process.exit(0);
    }).catch((err) => {
        Logger.error('Error stopping server:', err);
        process.exit(1);
    });
});

module.exports = {
    server,
    initializeServer
}