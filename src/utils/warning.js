import fbWarn from 'warning';

/**
 * A prefix for the warning statement.
 *
 * @type {String}
 */
export const WARNING_PREFIX = 'PepComp:';

/**
 * Soft wrapper over the `warning` module.
 * Accepts a list of warning messages, and adds a
 * simple prefix to the log.
 *
 * @method warning
 * @param  {boolean} condition     A shouldBeTrue condition
 * @param  {Array}   [messages=[]] List of messages to display to user
 * @return {Log}
 */
export const warning = (condition, messages = []) =>
    fbWarn(condition, `${WARNING_PREFIX} ${messages.join('\n') || 'unknown error.'}`);
