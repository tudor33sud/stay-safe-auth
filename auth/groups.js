const appConfig = require('../config');
const rp = require('request-promise');
const ApiError = require('../error/api-error');
const kcRequest = rp.defaults({
    baseUrl: appConfig.authServerUrl,
    json: true
});

async function getGroupByName(name, accessToken) {
    const options = {
        method: 'GET',
        uri: `/admin/realms/${appConfig.managementRealm}/groups`,
        headers: {
            Authorization: `bearer ${accessToken}`
        },
        qs: {
            search: name
        }
    };

    const response = await kcRequest(options);
    return response;
}

async function getGroupMembers(groupName, accessToken) {
    const groups = await getGroupByName(groupName, accessToken);

    //check if no groups were found, or whether the first item 
    //matches exactly group name
    if (groups.length === 0 || groups[0].name !== groupName) {
        throw new ApiError(`Group not found`, 404);
    }
    const group = groups[0];
    const options = {
        method: `GET`,
        uri: `/admin/realms/${appConfig.managementRealm}/groups/${group.id}/members`,
        headers: {
            Authorization: `bearer ${accessToken}`
        }
    };
    const response = await kcRequest(options);
    return response;
}


module.exports = {
    getByName: getGroupByName,
    getGroupMembers: getGroupMembers
};
