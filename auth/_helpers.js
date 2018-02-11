const appConfig = require('../config');
const rp = require('request-promise');
const _ = require('lodash');

const kcRequest = rp.defaults({
    baseUrl: appConfig.authServerUrl,
    json: true
});


/**
 * Retrieve confidential client access token for Admin interface operations.
 */
async function getAccessToken() {
    const options = {
        method: 'POST',
        uri: `/realms/${appConfig.managementRealm}/protocol/openid-connect/token`,
        form: {
            grant_type: 'client_credentials',
            client_secret: appConfig.managementClientSecret,
            client_id: appConfig.managementClientId
        }
    };

    const response = await kcRequest(options);
    return response.access_token;
}

/**
 * 
 * @param {String} token Management realm access token
 * @param {String} count Token availability count(how many clients can the token create). Defaults to 1
 */
async function getClientInitialAccessToken(token, count = 1) {
    const options = {
        method: `POST`,
        uri: `/admin/realms/${appConfig.managementRealm}/clients-initial-access`,
        headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: {
            count: count
        }
    };
    const response = await kcRequest(options);
    return response.token;
}

module.exports = {
    getAccessToken: getAccessToken,
    getClientInitialAccessToken: getClientInitialAccessToken
}
