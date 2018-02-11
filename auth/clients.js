const appConfig = require('../config');
const rp = require('request-promise');
const _ = require('lodash');
const ApiError = require('../error/api-error');

const kcRequest = rp.defaults({
    baseUrl: appConfig.authServerUrl,
    json: true
});


async function getClientById(clientId, accessToken) {
    const options = {
        method: 'GET',
        uri: `/admin/realms/${appConfig.managementRealm}/clients?clientId=${clientId}`,
        headers: {
            Authorization: `bearer ${accessToken}`
        }
    };

    const clients = await kcRequest(options);
    if (clients.length === 0) {
        throw new ApiError(`Client not found`, 404);
    }
    return clients[0];
}


module.exports = {
    getById: getClientById
}