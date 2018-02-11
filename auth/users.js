const appConfig = require('../config');
const rp = require('request-promise');
const clients = require('./clients');
const kcRequest = rp.defaults({
    baseUrl: appConfig.authServerUrl,
    json: true,
    proxy: appConfig.PROXY
});



async function getUserById(userId, accessToken) {
    const options = {
        method: 'GET',
        uri: `/admin/realms/${appConfig.managementRealm}/users/${userId}`,
        headers: {
            Authorization: `bearer ${accessToken}`
        }
    }

    const response = await kcRequest(options);
    return response;
}

async function getUserRoles(userId, accessToken) {
    const options = {
        method: 'GET',
        uri: `/admin/realms/${appConfig.managementRealm}/users/${userId}/role-mappings`,
        headers: {
            Authorization: `bearer ${accessToken}`
        }
    }

    const response = await kcRequest(options);
    return response;
}

async function getUserRolesByClient(userId, clientId, accessToken) {
    const client = await clients.getById(clientId, accessToken);
    const options = {
        method: 'GET',
        uri: `/admin/realms/${appConfig.managementRealm}/users/${userId}/role-mappings/clients/${client.id}/composite`,
        headers: {
            Authorization: `bearer ${accessToken}`
        }
    };

    const response = await kcRequest(options);
    return response;
}

module.exports = {
    getById: getUserById,
    getUserRoles: getUserRoles,
    getUserRolesByClient: getUserRolesByClient
}
