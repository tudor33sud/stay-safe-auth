const { check, validationResult } = require('express-validator/check');

const users = require('./users');
const groups = require('./groups');
module.exports = {
    groups: groups,
    users: users,
    result: validationResult
};