const environment = process.env.NODE_ENV || 'localhost';
module.exports = {
    port: process.env.PORT || 3006,
    tracingHeaderKey: process.env.TRACING_HEADER_KEY || 'x-ss-request-id',
    jwtHeaderKey: process.env.JWT_HEADER_KEY || 'x-ss-jwt',
    serviceName: 'stay-safe-auth',
    managementClientId: process.env.MANAGEMENT_CLIENT_ID,
    managementClientSecret: process.env.MANAGEMENT_CLIENT_SECRET,
    managementRealm: process.env.MANAGEMENT_REALM,
    authServerUrl: process.env.AUTH_SERVER_URL || 'http://localhost:8080/auth'
};