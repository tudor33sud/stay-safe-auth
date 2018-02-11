const express = require('express');
const router = express.Router();
const ApiError = require('../error/api-error');
const _ = require('lodash');
const logger = require('../utils/log').logger;
const auth = require('../auth');
const validation = require('../validation');
const validationResult = validation.result;

router.get('/:userId', [validation.users.getUserById()], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        const accessToken = await auth.helpers.getAccessToken();
        const user = await auth.resources.users.getById(req.params.userId, accessToken);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.get('/:userId/role-mappings', async (req, res, next) => {
    try {
        const accessToken = await auth.helpers.getAccessToken();
        const userRoles = await auth.resources.users.getUserRoles(req.params.userId, accessToken);
        res.json(userRoles);
    } catch (err) {
        next(err);
    }
});


router.get('/:userId/role-mappings/clients/:clientId/check', [validation.users.checkUserRoleMappings()], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        const accessToken = await auth.helpers.getAccessToken();
        const userRoles = await auth.resources.users.getUserRolesByClient(req.params.userId, req.params.clientId, accessToken);
        if (userRoles.length === 0) {
            return res.status(401).send();
        }
        const hasRoles = req.query.roles.toLowerCase().split(',').every(role => {
            return userRoles.some(userRole => {
                return role === userRole.name;
            });
        });
        if (!hasRoles) {
            return res.status(401).send();
        }
        res.status(200).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;