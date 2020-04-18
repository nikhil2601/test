import RavenError from 'lib/Error';

import { get } from './lodash';

/**
 * Extract the error message from a given Error.
 *
 * @method extractErrorMessage
 * @param  {Error}             error The given Error
 * @return {string}
 */
export function extractErrorMessage(error) {
    // Extract the data from the response object.
    // (if it is an API call)
    const data = get(error, 'data') || get(error, 'response.data');
    // Create an error message, defaulting to the error.message.
    let message = error.message || 'error occurred';
    // If the data is not present, then just return the error's message;
    if (!data) {
        return message;
    }
    // If the data has an `error_description` then let's build the message
    if (data.error_description) {
        // Extract the name from the error.
        const name = data.error || 'Error';
        // Extract the description from the error.
        const description = data.error_description;
        // Build the error message with the name and description.
        message = `${name} : ${description}`;
    } else {
        // Otherwise, build the error message from the given `data.message`.
        message = data.message;
    }
    // If there are extra error details present, then let's update the message.
    if (data.errorDetails && Array.isArray(data.errorDetails) && data.errorDetails.length > 0) {
        // We'll just append the extra details based on their `field` and `message`.
        message = data.errorDetails.reduce((res, { field = '', message = '' }) => {
            const fieldMsg = `${field}: ${message}`;
            // Check if `res` is valid, only then add line-breaks to the final message.
            return res ? `${res}<br />${fieldMsg}` : fieldMsg;
        }, ``);
    }
    // Finally, return the message.
    return message || error.message;
}

/**
 * Catch an error and throw its `error.message` if relevant.
 *
 * @method catchError
 * @param {Error}     error The error to catch
 * @param {string}    name  Optional name for the Error
 */
export function catchError(error, name = 'Error') {
    if (error instanceof Error) {
        // Extract the error message.
        const message = extractErrorMessage(error);
        // Throw a new Custom Error with the passed in name.
        throw new RavenError(message, name);
    }
}
