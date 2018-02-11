const ApiError = require('../error/api-error');
const clients = require('./clients');
const users = require('./users');
const groups = require('./groups');
const helpers = require('./_helpers');


module.exports = {
    resources: {
        clients: clients,
        users: users,
        groups: groups
    },
    helpers: helpers
}