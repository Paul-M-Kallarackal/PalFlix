'use strict';
require('dotenv').config();
const routes = require('./routes/routes');
const ServerUtils = require('./utils/serverConnection');
const addJobs = require('./workers/movie');

ServerUtils.initializeServer();
ServerUtils.server.route(routes);

(async () => {
    await addJobs();   
    })();