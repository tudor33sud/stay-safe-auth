const { check, validationResult, body, query, header, param, allOf, oneOf } = require('express-validator/check');

function getGroupMembers() {
    return [
        param('groupName', 'Group name should be a string of 1-30 characters').isLength({ min: 1, max: 30 })
    ];
}


module.exports = {
    getGroupMembers: getGroupMembers
}