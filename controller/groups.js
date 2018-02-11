const express = require('express');
const router = express.Router();
const ApiError = require('../error/api-error');
const _ = require('lodash');
const logger = require('../utils/log').logger;
const auth = require('../auth');
const validation = require('../validation');
const validationResult = validation.result;

router.get('/:groupName/members', [validation.groups.getGroupMembers()], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        const accessToken = await auth.helpers.getAccessToken();
        const members = await auth.resources.groups.getGroupMembers(req.params.groupName, accessToken);
        if (members.length === 0) {
            res.status(204).send();
        }
        res.json(members);
    } catch (err) {
        next(err);
    }
});

module.exports = router;