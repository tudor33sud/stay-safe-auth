const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve('./.env') });
const environment = process.env.NODE_ENV || 'localhost';
const express = require('express');

const app = express();
const appConfig = require('./config');
const reqUtils = require('./utils/requests');
const tracing = require('./utils/tracing');
const logger = require('./utils/log').logger;
//parse JSON payloads
app.use(express.json({ limit: '2mb' }));

//allow CORS
app.use(reqUtils.middleware.cors());

//append request id for tracing
app.use(tracing(appConfig.tracingHeaderKey));

app.use(reqUtils.middleware.injectReferrer());

app.use(reqUtils.middleware.customHeaders());

const groupsRoutes = require('./controller/groups');
const usersRoutes = require('./controller/users');

app.use(`/groups`, groupsRoutes);
app.use(`/users`,usersRoutes);

//error handling middleware
app.use(reqUtils.middleware.defaultErrorHandler(environment));

const server = app.listen(appConfig.port, () => {
    logger.debug(`Server started on port ${appConfig.port}`);
});

module.exports = server; 