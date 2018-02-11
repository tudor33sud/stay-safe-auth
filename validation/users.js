const { check, validationResult, body, query, header, param, allOf, oneOf } = require('express-validator/check');

function getUserById() {
    return [
        param('userId', 'User id should be a non empty string').isLength({ min: 1, max: 50 })
    ];
}

function checkUserRoleMappings() {
    return [
        query('roles', 'Roles should be in CSV format').exists().isLength({ min: 2 })
    ]
}


module.exports = {
    getUserById: getUserById,
    checkUserRoleMappings: checkUserRoleMappings
}