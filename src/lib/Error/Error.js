/**
 * A default 'custom' pep-comp Error
 *
 * @class
 * @extends Error
 */
class PepCompError extends Error {
    constructor(message = '', errorName = '') {
        super(message);
        // Re-define the `message` property on the default Error Class.
        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            value: message,
            writable: true,
        });
        // Update the name of the default Error Class,
        // based on the passed in name, or the current constructor's name.
        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            value: errorName || this.constructor.name,
            writable: true,
        });
        // If applicable, capture the stack trace.
        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor);
            return;
        }
        // Re-define the stack trace.
        Object.defineProperty(this, 'stack', {
            configurable: true,
            enumerable: false,
            value: new Error(message).stack,
            writable: true,
        });
    }
}

export default PepCompError;
