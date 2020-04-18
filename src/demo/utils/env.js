/**
 * Extract the `returnURL`
 *
 * @method getReturnURL
 * @return {string}
 */
export const getReturnURL = () => window.location.href;

/**
 * Extract the `clientID`
 *
 * @method getClientID
 * @return {string}
 */
export const getClientID = () => process.env.PEP_CLIENT_ID;

/**
 * Extract the `clientSecret`
 *
 * @method getClientSecret
 * @return {string}
 */
export const getClientSecret = () => process.env.PEP_CLIENT_SECRET;

/**
 * Extract the `baseURL`
 *
 * @method getBaseURL
 * @return {string}
 */
export const getBaseURL = () => process.env.PEP_BASE_URL;

/**
 * Extract the 'username'
 *
 * @method getUsername
 * @return {string}
 */
export const getUsername = () => process.env.PEP_USER;

/**
 * Extract the 'password'
 *
 * @method getPassword
 * @return {string}
 */
export const getPassword = () => process.env.PEP_PASS;
