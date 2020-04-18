import _isEmpty from 'lodash/isEmpty';

/**
 * Validate a given oAuthToken
 *
 * @method validToken
 * @param  {Object}   oAuthToken The oAuth token
 * @return {boolean}
 */
export const validToken = oAuthToken =>
    Boolean(oAuthToken && !_isEmpty(oAuthToken) && oAuthToken.access_token);
