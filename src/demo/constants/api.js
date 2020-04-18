import _find from 'lodash/find';

/**
 * Basic API mapping until we have the `bootstrap.json` pre-loaded into app memory.
 *
 * @type {Object}
 */
export const API_URLS = {
    BASE: '',
};

/**
 * Determine the current `location` for the app, based on the window's location origin.
 * For local development we have a fallback to the `API_URLS.BASE` for now.
 * TODO: Update this logic when `bootstrap.json` is in place.
 *
 * @type {string}
 */
export const LOCATION =
    window.location && window.location.origin.includes('localhost')
        ? API_URLS.BASE
        : window.location.origin;

/**
 * Determine whether or not the current location exists in our list of API URLs for the app.
 *
 * @type {string|undefined}
 */
const _FOUND_LOCATION = _find(API_URLS, url => url.includes(LOCATION));

/**
 * The main API origin for the application.
 *
 * @type {string}
 */
export const API_ORIGIN = _FOUND_LOCATION || API_URLS.BASE;

/**
 * DEV URL mapping.
 *
 * @type {Object}
 */
export const BASE_DEV_URL = '';
