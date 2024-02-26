const Hapi = require('hapi');
const server = new Hapi.Server();

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
        console.log(`Server running at: ${server.info.uri}`);
    });
}

process.on('SIGTSTP', () => {
    server.stop({ timeout: 10000 }).then(() => {
        console.log('Server stopped');
        process.exit(0);
    }).catch((err) => {
        console.error('Error stopping server:', err);
        process.exit(1);
    });
});

module.exports = {
    server,
    initializeServer
}